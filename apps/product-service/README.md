# Product-Service
Product Service for TradeCoin

## Setup
### DB:
Inmemory sqlite DB already configured
### Install: 
Run everytime you run product-service:
go build
### Start: 
./product-service --config local.yaml

## Supported API
 - /product POST
 - /product/{productid} PUT
 - /product GET
 - /product/{productid} GET
 - /product/{productid} DEL
 
### /product POST

Example URL: http://localhost:8081/aproduct

Request: JSON body
          ```
          {
                "commodity":"Coffee",
                "amount":"100",
                "unit":"kgs",
                "documents":[
                    {
                        "dochash":"0x71fb09a7e9dc4fd2a85797bc92080d49ead60ebaa2b562d817bdfb31bc258134"
                    }
                ]
            }
          ```
          
Expected response: Status 200