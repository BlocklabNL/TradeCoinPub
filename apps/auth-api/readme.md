# General info

- Currently this PoC can access a local database and write or read data. 
- This PoC can also connect to API endpoints using GET, POST and DELETE
    - Current API Endpoints are: 
        - /login
        - /logout
        - /auth
        - /currentuser
        - /templates
        - /templates/<'uid'>
    - Other endpoints are the error catchers
        - 401 (Unauthorised)
        - 404 (Not Found)
        - 406 (Not Acceptable)
        - 409 (Conflict)
        - 500 (Internal Server Error)

- This PoC is setting a session through session cookies

## Api call examples

### /login POST
Example URL:        http://localhost:8000/api/auth/login

Method:             POST

Description:        Checking if user exists in the database => setting session-id if true; else unauthorised,

                    The login endpoint expects a JSON body with the format of:
                    ```
                    {
                        "email": "email@blocklab.nl",
                        "password": "password",
                    }
                    ```
                    Without this body it will always return 401 unauthorised.

Expected response:  Status 200 with a cookie (This returns no response body)

Example cURL request: 
```curl
curl --location --request POST 'localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: session-id=WQq75zz3TMm0sXmURbZdZ8oENlqivXr8C0sLlkJx3d5H5fU%2FmsVSxA67ivbM9sduvUdVvpiPuW1LdzB5h1R90X%2FEvCNkMNA7aTWcxLFzmd3fQBpfwND6p3MpE2mhpg%3D%3D' \
--data-raw '{
    "email": "admin@admin.nl",
    "password": "pw"
}'
```

### /logout POST
Example URL:        http://localhost:8000/api/auth/logout

Method:             POST

Description:        Deletes the cookie called "session-id"
                    Logout can always be called whether you have a session-id or not, it won't change anything if session-id does not exists

Expected response:  Status 200 if cookie exists removes it; else status 200.

Example cURL request: 
```curl
curl --location --request POST 'localhost:8000/api/auth/logout'
```

### /auth GET
Example URL:        http://localhost:8000/api/auth/auth

Method:             GET

Description:        Checking if user has an existing and valid cookie => resetting session-id if true; else unauthorised
                    The auth endpoint expects a set cookie called "session-id" that the Rust Auth api can retrieve.
                    Without this set cookie it will always return 401 unauthorised.

Expected response:  Status 200 with a cookie and a new Header X-Auth-User which stores the user information (This returns no response body)

Example cURL request:
```curl
curl --location --request GET 'http://localhost:8000/api/auth/auth' \
--header 'Cookie: session-id=WwlSpjNUyzJ40nDMLyuR6YTPAexOV21GlGcR6+fTB65SPe3BCgxDPj6lJwHI1kSFyMt4ySAznOAwWgQGyg3w+47OgzXkPrn5nUbNngQrdELTRJJ8IFVFqWIbALZIGQ%3D%3D' \
--data-raw ''
```

### /currentuser GET
Example URL:        http://localhost:8000/api/auth/currentuser

Method:             GET

Description:        Retrieves the current user's session-id data
                    The endpoint /currentuser expects a set cookie called "session-id" that the Rust Auth api can retrieve.
                    This then returns a response with a string with the data of the session-id.

Expected response:  Status 200 if cookie exists returning as response a string; else status 200.

Example cURL request:
```curl
curl --location --request GET 'http://localhost:8000/api/auth/currentuser' \
--header 'Cookie: session-id=WwlSpjNUyzJ40nDMLyuR6YTPAexOV21GlGcR6+fTB65SPe3BCgxDPj6lJwHI1kSFyMt4ySAznOAwWgQGyg3w+47OgzXkPrn5nUbNngQrdELTRJJ8IFVFqWIbALZIGQ%3D%3D'
```

### /templates GET
Example URL:        http://localhost:8000/api/auth/templates

Method:             GET

Description:        Retrieves existing templates, which are the four different pilots: MTI, Planet, eBL and Vatblock. 
                    This returns a list of templates

Expected response:  Status 200 if templates exists return a list of templates.

Example cURL request: 
```curl
curl --location --request GET 'http://localhost:8000/api/auth/templates'
```

### /templates/uid GET
Example URL:        http://localhost:8000/api/auth/templates/<'uid'>

Method:             GET

Description:        Retrieves existing template based on the uid of the actual template, which are one of the four different pilots: MTI, Planet, eBL and Vatblock. 
                    This returns a JSON formatted object as response.

Expected response:  Status 200 if uid matches the one in the database, returning a JSON object of the temaplate; else return 404 not found.

Example cURL request:
```curl
curl --location --request GET 'http://localhost:8000/api/auth/templates/b097a380-8e15-4f63-a166-ff3579a1eb8' \
--header 'Cookie: session-id=WwlSpjNUyzJ40nDMLyuR6YTPAexOV21GlGcR6+fTB65SPe3BCgxDPj6lJwHI1kSFyMt4ySAznOAwWgQGyg3w+47OgzXkPrn5nUbNngQrdELTRJJ8IFVFqWIbALZIGQ%3D%3D'
```

## Database Set up:
Create a database (postgres/cockroach) through docker 
https://www.cockroachlabs.com/docs/stable/start-a-local-cluster-in-docker-mac.html
To connect to the database edit the environmental files in Rocket.toml to the url your database is located at.

If doing deployment create the clusters on kube using these instructions (insecure version) https://www.cockroachlabs.com/docs/v20.2/orchestrate-a-local-cluster-with-kubernetes-insecure
    After accessing the sql using:
```
    kubectl run cockroachdb -it \
    --image=cockroachdb/cockroach:v20.2.10 \
    --rm \
    --restart=Never \
    -- sql \
    --insecure \
    --host=auth-api-release-cockroachdb-public
```

Create database
```
CREATE DATABASE users;
```

Database table 
```
CREATE TABLE users.accounts (id UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, company TEXT NOT NULL);
```
* Can always be altered later

Inserting data
```
INSERT INTO users.accounts (email, password, role, company) VALUES ('admin@admin.nl', 'pw', 'admin', 'blocklab');
```

## Usage
Starting development use cargo build in root folder of auth-api, this will create a target/debug folder where the application will be build. To run the application use:
```
./target/debug/auth --config <config> (i.e local.toml)
```
```diff
- NOTE: WHEN SUPPLYING A NON-EXISTING CONFIG, THE DEFAULT VALUES 'localhost' and '26257' FOR 'HOST' AND 'PORT' WILL BE USED
```


# Auth-CLI for the service Auth Api

## Database setup
The auth cli should be connected with the deployed database. To connect to this deployed database you will need Kuberenetes.
First switch to the correct context of kubernetes and get the svc in that context using:
```
kubectl get svc
```

Search for the database svc and port-forward the svc to the corresponding address for example:
```
kubectl port-forward svc/auth-api-release-cockroachdb-public 26257
```

# Build cli
Now that the database is port-forwarded, navigate to the auth folder and build a local version using:
```
cargo build
```
The auth cli is now ready to use.

## Commands
There are four subcommands in this Cli which are
1. add-user
2. delete
3. get
4. set-password

These commands are all optional, what isn't optional is the config. To add a config simply add the argument `--config` to the command `./auth`. If supplied with a config.toml file it will use those values in the config file otherwise the default value of localhost and port 26257 will be used. 
Example:
```
./auth --config local.toml
```

## Usage of commands
For all these commands you should navigate to the base folder and then to the target file where the build will create the project at, for example: `./apps/auth/target/debug`

### add-user
```
./auth add-user <email> <password> (optional values) --role <role i.e. user> <company>
```
This should return `Created account with email: <email>`

### delete
```
./auth delete <email>
```
This should return `<email>, has been deleted.`


### get
```
./auth get 
```
This should return a list of all accounts in the database or when giving an account:

```
./auth get --email <email>
```
This should return only the requested data with the given email

### set-password
```
./auth set-password <email> <password> 
```
This should return `<email>, has been updated.`

