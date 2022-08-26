FROM golang:1.16-alpine
WORKDIR /build
RUN apk --no-cache add git libc-dev gcc linux-headers

COPY . .

RUN go mod download
RUN go mod verify

WORKDIR /build/apps/product-service

RUN go version
RUN go env
RUN GOOS=linux go build -a -o /product-service -ldflags "-X main.buildOn=`date -u +%Y-%m-%d.%H:%M:%S.%Z` -X main.gitHash=`git rev-parse HEAD`"

FROM alpine:3.10
RUN apk --no-cache add ca-certificates
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

COPY --from=0 /product-service ./

ENTRYPOINT ["./product-service"]

