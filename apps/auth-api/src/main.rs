#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
pub extern crate postgres;
pub extern crate r2d2;
pub extern crate time;
pub extern crate confy;

use argh::FromArgs;
use confy::ConfyError;

use rocket::{get, routes};
use rocket::http::{Status, Method, Cookie, Cookies};
use rocket::request::Request;
use rocket::Response;

use rocket_cors::{AllowedHeaders, AllowedOrigins};

use rocket_contrib::databases::{DbError, DatabaseConfig, Poolable};
use rocket_contrib::{json, json::{Json, JsonValue}};

use uuid::Uuid;

use postgres::NoTls;
use postgres::Client as PgClient;

use serde::{self, Serialize, Deserialize};

use std::ops::{Deref, DerefMut};

use time::Duration;

// Database connection, Pooling and r2d2 needed for connection syntax
// users comes from the Rocket.toml
#[database("users")]
pub struct DbConn(PgClientWrapper);

pub struct PgClientWrapper(PgClient);

impl Deref for PgClientWrapper {
    type Target = PgClient;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
impl DerefMut for PgClientWrapper {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

pub struct PgConnectionManagerWrapper(r2d2_postgres::PostgresConnectionManager<NoTls>);

impl r2d2::ManageConnection for PgConnectionManagerWrapper {
    type Connection = PgClientWrapper;
    type Error = <r2d2_postgres::PostgresConnectionManager<postgres::NoTls> as r2d2::ManageConnection>::Error;

    fn connect(&self) -> Result<PgClientWrapper, Self::Error> {
        self.0.connect().map(|p| PgClientWrapper(p))
    }

    fn is_valid(&self, conn: &mut Self::Connection) -> Result<(), Self::Error> {
        self.0.is_valid(conn)
    }

    fn has_broken(&self, conn: &mut Self::Connection) -> bool {
        self.0.has_broken(conn)
    }
}

impl Poolable for PgClientWrapper {
    type Manager = PgConnectionManagerWrapper;
    type Error = DbError<postgres::Error>;

    fn pool(config: DatabaseConfig) -> Result<r2d2::Pool<Self::Manager>, Self::Error> {
        let manager =
            r2d2_postgres::PostgresConnectionManager::new(config.url.parse().unwrap(), NoTls);
        let manager = PgConnectionManagerWrapper(manager);

        r2d2::Pool::builder()
            .max_size(config.pool_size)
            .build(manager)
            .map_err(DbError::PoolError)
    }
}

// Config file
#[derive(Debug, Serialize, Deserialize)]
struct Config {
    host: String,
    port: u32,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            host: "localhost".to_string(),
            port: 26257,
        }
    }
}

// CLI Tool
#[derive(FromArgs, PartialEq, Debug)]
/// Functions
struct TopLevel {
    /// subcommands from Enum
    #[argh(subcommand)]
    nested: Option<AuthCliCommandEnum>,
    /// role for adding user defaults on user
    #[argh(option)]
    config: String,
}

#[derive(FromArgs, PartialEq, Debug)]
#[argh(subcommand)]
enum AuthCliCommandEnum {
    AddUser(AddUserCli),
    DelUser(DelUserCli),
    GetUser(GetAllCli),
    SetPassword(SetPasswordCli),
}

#[derive(FromArgs, PartialEq, Debug)]
#[argh(subcommand, name = "add-user")]
/// Add a user through CLI
struct AddUserCli {
    /// email for adding user
    #[argh(positional)]
    email: String,

    /// password for adding user
    #[argh(positional)]
    password: String,

    /// role for adding user defaults on user
    #[argh(option, default = "default_role()")]
    role: String,

    /// company which the user belongs to
    #[argh(positional, default = "default_company()")]
    company: String,
}

#[derive(FromArgs, PartialEq, Debug)]
#[argh(subcommand, name = "delete")]
/// Delete a user through CLI
struct DelUserCli {
    /// email to delete account
    #[argh(positional)]
    email: String,
}

#[derive(FromArgs, PartialEq, Debug)]
#[argh(subcommand, name = "get")]
/// Get all users through CLI
struct GetAllCli {
    /// optional email to receive data corresponding to the email
    #[argh(option)]
    email: Option<String>,
    /// optional company to receive data corresponding to the company
    #[argh(option)]
    company: Option<String>
}

#[derive(FromArgs, PartialEq, Debug)]
#[argh(subcommand, name = "set-password")]
/// Update the password field for given email
struct SetPasswordCli {
    /// email for the new password change
    #[argh(positional)]
    email: String,
    /// new password for set email
    #[argh(positional)]
    new_password: String,
}

fn default_role() -> String {
    "user".to_string()
}

fn default_company() -> String {
    "ebl".to_string()
}

#[derive(Clone, Serialize, Deserialize)]
pub struct User {
    uid: Uuid,
    email: String,
    password: String,
    role: String,
    company: String,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct Shipment {
    uid: Uuid,
    template: String,
    doctype: serde_json::Value
}

// Rocket Rust Api
#[post("/login", data="<login_data>")]
fn login(mut conn: DbConn, login_data: Json<LoginRequest>, mut cookies: Cookies) -> Result<(), Status> {
    let query = conn.query("SELECT id, email, role, company FROM users.accounts WHERE email = $1 AND password = $2", &[&login_data.email, &login_data.password]);
    let user_rows = match query{
        Ok(ref rows) => rows,
        Err(_) => return Err(Status::Unauthorized),
    };

    let user_row = match user_rows.get(0) {
        Some(row) => row,
        None => return Err(Status::Unauthorized),
    };

    let uid: Uuid = user_row.get(0);
    let email: String = user_row.get(1);
    let role: String = user_row.get(2);
    let company: String = user_row.get(3);

    // increasing cookie setting for development uses shorten this for actual deployment
    // format: minutues, hours or days
    let expires = time::now() + Duration::hours(12);
    
    let cookie = Cookie::build("session-id", email + " " + &role + " " + &uid.to_string() + " " + &company)
        .expires(expires)
        // default values
        // Path "/"
        // SameSite: Strict
        // HttpOnly: true
        // Expires: 1 week from now
        .finish();
    cookies.add_private(cookie);
    
    Ok(())
}

#[post("/logout")]
fn logout(mut cookies: Cookies) -> Result<JsonValue, Status>{
    cookies.remove_private(Cookie::named("session-id"));
    let cookie = cookies.get_private("session-id");
    if let Some(ref _cookie) = cookie{
        Ok(json!({
            "status": "failed to delete cookie"
        }))
    } else {
        Ok(json!({
            "status": "succes deleted cookie"
        }))
    }
}

#[get("/auth")]
fn auth(mut cookies: Cookies) -> Result<Response, Status>{
    let cookie = cookies.get_private("session-id");

    let cookie_data: Result<String, _> = match cookie {
        Some(cookie) => cookie.value().parse(),
        None => return Err(Status::Unauthorized),
    };

    let cookie_data = match cookie_data {
        Ok(cookie_data) => cookie_data,
        Err(_) => return Err(Status::Unauthorized),
    };

    // increasing cookie setting for development uses shorten this for actual deployment
    // format: minutues, hours or days
    let expires = time::now() + Duration::hours(12);
    
    let new_cookie = Cookie::build("session-id", cookie_data.clone())
        .expires(expires)
        // default values
        // Path "/"
        // SameSite: Strict
        // HttpOnly: true
        // Expires: 1 week from now
        .finish();
    cookies.add_private(new_cookie);
    
    let response = Response::build()
        .raw_header("X-Auth-User", cookie_data)
        .finalize();

    Ok(response)
}

#[get("/currentuser")]
fn get_current_user(mut cookies: Cookies) -> Result<JsonValue, Status>{
    let cookie = cookies.get_private("session-id");

    let cookie_data: Result<String, _> = match cookie {
        Some(cookie) => cookie.value().parse(),
        None => return Err(Status::Unauthorized),
    };

    let cookie_data = match cookie_data {
        Ok(cookie_data) => cookie_data,
        Err(_) => return Err(Status::Unauthorized),
    };
    
    Ok(json!(cookie_data))
}

#[get("/templates")]
fn get_templates(mut conn: DbConn) -> Result<JsonValue, Status> {
    let mut templates = vec![];
    let query = &conn.query("SELECT * FROM templates.shipment", &[]).unwrap();
    for row in query {
        let uid: Uuid = row.get(0);
        let template: String = row.get(1);
        let doctype: serde_json::Value = row.get(2);
        templates.push(Shipment{uid, template, doctype});
    }
    Ok(json!(templates))
}

#[get("/templates/<uid>")]
fn get_specific_template(mut conn: DbConn, uid: String) -> Result<JsonValue, Status> {
    let to_uuid = match Uuid::parse_str(&uid) {
        Ok(value) => value,
        Err(_) => return Err(Status::NotFound),
    };

    let query = &conn.query("SELECT doctypes FROM templates.shipment WHERE id = $1", &[&to_uuid]);
    println!("{:?}", query);
    let request = match query {
        Ok(ref rows) => rows,
        Err(_) => return Err(Status::NotFound),
    };
    let result = match request.get(0) {
        Some(row) => row,
        None => return Err(Status::NotFound),
    };
    let doctype: serde_json::Value = result.get(0);
    Ok(json!(doctype))
}

// Error catching
#[catch(401)]
fn not_authorized() -> JsonValue {
    json!({
        "error": format!("{}", Status::Unauthorized),
        "reason": "Not authorized try logging in a different account or contact an admin.",
    })
}

#[catch(404)]
fn not_found(req: &Request) -> JsonValue {
    json!({
        "error": format!("{}", Status::NotFound),
        "reason": format!("{} not found.", req.uri()),
    })
}

#[catch(406)]
fn not_acceptable() -> JsonValue {
    json!({
        "status": format!("{}", Status::NotAcceptable),
        "reason": "No content found.",
    })
}

#[catch(409)]
fn conflict() -> JsonValue {
    json!({
        "error": format!("{}", Status::Conflict),
        "reason": "Conflicting data.",
    })
}

#[catch(500)]
fn internal_server_error() -> JsonValue {
    json!({
        "error": format!("{}", Status::InternalServerError),
        "reason": "Internal server error.",
    })
}

#[tokio::main]
async fn main() {
    // CLI
    let auth_cli: TopLevel = argh::from_env();
    
    // Load Config
    let cfg: Result<Config, ConfyError> = confy::load_path(auth_cli.config);
    
    let config = match cfg {
        Ok(config) => config,
        Err(_error) => {println!("Config not found, using default config"); Config::default()}
    };
    // DbConn
    let database_string = format!("postgres://root@{}:{}/?sslmode=disable", config.host, config.port).to_string();
    println!("{:?}", database_string);
    let mut conn = PgClient::connect(&database_string, NoTls).unwrap();
    
    //// Cors Settings
    // Allowing all origins for future multi pilot use
    let allowed_origins = AllowedOrigins::all();

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Delete].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }.to_cors().expect("error creating CORS fairing");
    // Launching API using rocket
    rocket::ignite()
        .attach(DbConn::fairing())
        .mount("/api/auth", routes![
            login,
            logout, 
            auth,
            get_templates,
            get_specific_template,
            get_current_user,
            ])
        .attach(cors)
        .manage(
            match dbg!(auth_cli.nested){
                Some(AuthCliCommandEnum::AddUser(value)) => {
                    match conn.query("INSERT INTO users.accounts (email, password, role, company) VALUES ($1, $2, $3, $4)", &[&value.email, &value.password, &value.role, &value.company])
                    {
                        Ok(_) => {
                            let row = conn.query("SELECT email FROM users.accounts WHERE email = $1 AND password = $2", &[&value.email, &value.password]).unwrap();
                            let user_row = match row.get(0) {
                                Some(row) => row,
                                None => return println!("Error, something went wrong with creating the new account"),
                            };
                            let email: String = user_row.get(0);
                            println!("Created account with email: {:?}", email);
                        },
                        Err(_error) => println!("User with email {} already exists", value.email)
                    }
                }
                Some(AuthCliCommandEnum::DelUser(value)) => {
                    let _query = conn.query("SELECT email FROM users.accounts WHERE email = $1", &[&value.email]).unwrap();
                    if _query.is_empty() {
                        println!("Email not found.");
                    } else {
                        let _query = match conn.query("SELECT email FROM users.accounts WHERE email = $1", &[&value.email])
                        {
                            Ok(_query) => {
                                let _del_query = conn.query("DELETE FROM users.accounts WHERE email = $1", &[&value.email]);
                                println!("{}, has been deleted.", value.email);
                            },
                            Err(_error) => println!("Email not found!")
                        };
                    }
                }
                Some(AuthCliCommandEnum::GetUser(value)) => {
                    let mut users = vec![];
                    if value.email.is_some(){
                        let query = conn.query("SELECT id, email, company FROM users.accounts WHERE email = $1", &[&value.email]).unwrap();
                        if query.is_empty(){
                            println!("Email not found.")
                        } else {
                            for row in query{
                                let uid: Uuid = row.get(0);
                                let email: String = row.get(1);
                                let company: String = row.get(2);
                                println!("uid: {:?}", uid);
                                println!("email: {:?}", email);
                                println!("company: {:?}", company);
                                println!("------------")
                            }
                        }
                    } else if value.company.is_some(){
                        let query = conn.query("SELECT id, email, company FROM users.accounts WHERE company = $1", &[&value.company]).unwrap();
                        if query.is_empty(){
                            println!("Company not found.")
                        } else {
                            for row in query{
                                let uid: Uuid = row.get(0);
                                let email: String = row.get(1);
                                let company: String = row.get(2);
                                println!("uid: {:?}", uid);
                                println!("email: {:?}", email);
                                println!("company: {:?}", company);
                                println!("------------")
                            }
                        }
                    } else {
                        for row in &conn.query("SELECT * FROM users.accounts", &[]).unwrap()
                        {
                            let uid: Uuid = row.get(0);
                            let email: String = row.get(1);
                            let password: String = row.get(2);
                            let role: String = row.get(3);
                            let company: String = row.get(4);
                            users.push(User{uid, email, password, role, company});
                        }
                        for i in 0..users.len(){
                            println!("Id: {}", i);
                            println!("uid: {:?}", users[i].uid);
                            println!("email: {:?}", users[i].email);
                            println!("company: {:?}", users[i].company);
                            println!("------------")
                        } 
                    }
                }
                Some(AuthCliCommandEnum::SetPassword(value)) => {
                    let _query = conn.query("SELECT email FROM users.accounts WHERE email = $1", &[&value.email]).unwrap();
                    if _query.is_empty() {
                        println!("Email not found.");
                    } else {
                        let _query = match conn.query("SELECT email FROM users.accounts WHERE email = $1", &[&value.email])
                        {
                            Ok(_query) => {
                                let _update_query = conn.query("UPDATE users.accounts SET password = $2 WHERE email = $1", &[&value.email, &value.new_password]);
                                println!("{}, has been updated.", value.email);
                            },
                            Err(_error) => println!("Email not found!")
                        };
                    }
                }
                None => {
                    println!("Cli not used");
                } 
            }
        )
        .register(catchers![
            not_authorized, 
            not_found,
            not_acceptable, 
            conflict, 
            internal_server_error,
            ])
        .launch();
}