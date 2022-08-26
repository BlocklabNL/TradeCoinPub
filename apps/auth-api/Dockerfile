#
## Stage one
#
FROM rust:1.53 as builder

RUN rustup default nightly
RUN USER=root cargo new --bin auth

WORKDIR ./auth

COPY ./Cargo.toml ./Cargo.toml

COPY . ./

RUN cargo build --release

#
## Stage two
#
FROM debian:buster-slim

ARG APP=/usr/src/app

EXPOSE 8000

ENV TZ=Etc/UTC \
    APP_USER=appuser

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

COPY --from=builder /auth/target/release/auth ${APP}/auth

RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER

WORKDIR ${APP}

ENV ROCKET_ENV production

CMD ["./auth"]
