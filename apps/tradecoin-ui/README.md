# Front-end test for TradeCoin

## Build
First install all packages 

## Smart contract
When using the smart contracts for this project you will have to deploy the contract first.
When deploying this contract you need to navigate to `/build/contracts/<TokenContractName.json>`(When using truffle)
Or when using HardHat `/build/artifcats/contracts/<TokenContractName>/<TokenContractName.json>` 
Copy the values from these files to `./tradecoin-ui/src/contracts/<TokenContractName.json>`

When deploying the smart contract a public address will be created, copy this in the env file to make use of the newest smart contract.

## Starting the application
Now that the packages are built and the smart contract deployed we can use `npm run start:dev` to make use of the development variables.