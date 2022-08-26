// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package newJourney

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// NewJourneyMetaData contains all meta data concerning the NewJourney contract.
var NewJourneyMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"notaryAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"typ\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"AssetLinked\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"}],\"name\":\"DocumentTypeDeleted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"}],\"name\":\"DocumentTypeRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"typ\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"initiator\",\"type\":\"address\"}],\"name\":\"JourneyStart\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedOn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"name\":\"documentDescriptionMapping\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"name\":\"documents\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"kill\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"}],\"name\":\"addUser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"}],\"name\":\"delUser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"}],\"name\":\"RegisterDocument\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"}],\"name\":\"RemoveDocument\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"Start\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"signer\",\"type\":\"address\"}],\"name\":\"StartOnBehalf\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"Link\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"signer\",\"type\":\"address\"}],\"name\":\"LinkOnBehalf\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"onBehalfOfHashStart\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"onBehalfOfHashLink\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"messageHash\",\"type\":\"bytes32\"}],\"name\":\"getEthSignedMessageHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}]",
	Bin: "0x608060405234801561001057600080fd5b50604051612a0f380380612a0f8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550436004819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550506128db806101346000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063999fd060116100a2578063d63a8e1111610071578063d63a8e11146106ed578063e445604914610747578063f849f37914610819578063fa5408011461085d578063fda1fc771461089f5761010b565b8063999fd060146104a2578063ba201be014610592578063ba377a26146105c3578063d16e024e146106535761010b565b80636f569c89116100de5780636f569c89146102e457806373fc84201461036a57806380c0ea9d146103885780638da5cb5b1461046e5761010b565b80633cb812561461011057806341c0e1b5146101ba578063421b2d8b146101c45780634631b2ec14610208575b600080fd5b61013f6004803603602081101561012657600080fd5b81019080803560ff169060200190929190505050610970565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561017f578082015181840152602081019050610164565b50505050905090810190601f1680156101ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c2610a20565b005b610206600480360360208110156101da57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610add565b005b6102e2600480360361010081101561021f57600080fd5b81019080803560ff16906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803560ff1690602001909291908035906020019064010000000081111561027e57600080fd5b82018360208201111561029057600080fd5b803590602001918460018302840111640100000000831117156102b257600080fd5b9091929391929390803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bf7565b005b610368600480360360408110156102fa57600080fd5b81019080803560ff1690602001909291908035906020019064010000000081111561032457600080fd5b82018360208201111561033657600080fd5b8035906020019184600183028401116401000000008311171561035857600080fd5b9091929391929390505050611104565b005b61037261133b565b6040518082815260200191505060405180910390f35b6104586004803603606081101561039e57600080fd5b8101908080359060200190929190803560ff169060200190929190803590602001906401000000008111156103d257600080fd5b8201836020820111156103e457600080fd5b8035906020019184600183028401116401000000008311171561040657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611341565b6040518082815260200191505060405180910390f35b610476611409565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61057c600480360360808110156104b857600080fd5b810190808035906020019092919080359060200190929190803560ff169060200190929190803590602001906401000000008111156104f657600080fd5b82018360208201111561050857600080fd5b8035906020019184600183028401116401000000008311171561052a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061142d565b6040518082815260200191505060405180910390f35b6105c1600480360360208110156105a857600080fd5b81019080803560ff1690602001909291905050506114fe565b005b610651600480360360608110156105d957600080fd5b8101908080359060200190929190803560ff1690602001909291908035906020019064010000000081111561060d57600080fd5b82018360208201111561061f57600080fd5b8035906020019184600183028401116401000000008311171561064157600080fd5b909192939192939050505061185f565b005b6106eb6004803603608081101561066957600080fd5b810190808035906020019092919080359060200190929190803560ff169060200190929190803590602001906401000000008111156106a757600080fd5b8201836020820111156106b957600080fd5b803590602001918460018302840111640100000000831117156106db57600080fd5b9091929391929390505050611c56565b005b61072f6004803603602081101561070357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612037565b60405180821515815260200191505060405180910390f35b6108006004803603602081101561075d57600080fd5b810190808035906020019064010000000081111561077a57600080fd5b82018360208201111561078c57600080fd5b803590602001918460018302840111640100000000831117156107ae57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050612057565b604051808260ff16815260200191505060405180910390f35b61085b6004803603602081101561082f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061208d565b005b6108896004803603602081101561087357600080fd5b810190808035906020019092919050505061219e565b6040518082815260200191505060405180910390f35b61096e600480360360e08110156108b557600080fd5b81019080803560ff169060200190929190803590602001909291908035906020019092919080359060200190929190803560ff1690602001909291908035906020019064010000000081111561090a57600080fd5b82018360208201111561091c57600080fd5b8035906020019184600183028401116401000000008311171561093e57600080fd5b9091929391929390803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506121f6565b005b60056020528060005260406000206000915090508054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a185780601f106109ed57610100808354040283529160200191610a18565b820191906000526020600020905b8154815290600101906020018083116109fb57829003601f168201915b505050505081565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610ac4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602881526020018061287e6028913960400191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16ff5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610b9c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b84816000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b815260040180828152602001915050604080518083038186803b158015610c6d57600080fd5b505afa158015610c81573d6000803e3d6000fd5b505050506040513d6040811015610c9757600080fd5b81019080805190602001909291908051906020019092919050505050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610d58576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b866000600560008360ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905011610dfc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b60006001610e58610e538d8d8d8d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061142d565b61219e565b8f8f8f60405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610eaf573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610f5e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f45434453413a20696e76616c6964207369676e6174757265000000000000000081525060200191505060405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610fe2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603281526020018061284c6032913960400191505060405180910390fd5b600360008c815260200190815260200160002060009054906101000a900460ff16611058576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260298152602001806128236029913960400191505060405180910390fd5b6001600360008c815260200190815260200160002060006101000a81548160ff021916908315150217905550898b7f6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c8b8b8b604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a35050505050505050505050505050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166111c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000600560008560ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905014611266576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f646f63756d656e7420616c72656164792072656769737465726564000000000081525060200191505060405180910390fd5b8181600560008660ff1660ff168152602001908152602001600020919061128e929190612718565b508260068383604051808383808284378083019250505092505050908152602001604051809103902060006101000a81548160ff021916908360ff1602179055508260ff167f897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8838360405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a2505050565b60045481565b600030848484604051602001808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018360ff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156113b557808201518184015260208101905061139a565b50505050905090810190601f1680156113e25780820380516001836020036101000a031916815260200191505b50955050505050506040516020818303038152906040528051906020012090509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60003085858585604051602001808673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020018360ff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156114a857808201518184015260208101905061148d565b50505050905090810190601f1680156114d55780820380516001836020036101000a031916815260200191505b509650505050505050604051602081830303815290604052805190602001209050949350505050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166115bd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000600560008360ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905011611660576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f646f63756d656e7420646f6573206e6f7420657869737400000000000000000081525060200191505060405180910390fd5b6060600560008360ff1660ff1681526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561170f5780601f106116e45761010080835404028352916020019161170f565b820191906000526020600020905b8154815290600101906020018083116116f257829003601f168201915b50505050509050600560008360ff1660ff168152602001908152602001600020600061173b9190612798565b6006816040518082805190602001908083835b60208310611771578051825260208201915060208101905060208303925061174e565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060006101000a81549060ff02191690557f27611a55020e9b533f98e6d92e86bb2715b63fea3fdf7653ddb8c9cc6a457db38282604051808360ff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611820578082015181840152602081019050611805565b50505050905090810190601f16801561184d5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a15050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661191e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b83336000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b815260040180828152602001915050604080518083038186803b15801561199457600080fd5b505afa1580156119a8573d6000803e3d6000fd5b505050506040513d60408110156119be57600080fd5b81019080805190602001909291908051906020019092919050505050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611a7f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b856000600560008360ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905011611b23576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b6003600089815260200190815260200160002060009054906101000a900460ff1615611b9a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806127fe6025913960400191505060405180910390fd5b6001600360008a815260200190815260200160002060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff16887f955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db898989604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a35050505050505050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611d15576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b83336000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b815260040180828152602001915050604080518083038186803b158015611d8b57600080fd5b505afa158015611d9f573d6000803e3d6000fd5b505050506040513d6040811015611db557600080fd5b81019080805190602001909291908051906020019092919050505050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611e76576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b856000600560008360ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905011611f1a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b600360008a815260200190815260200160002060009054906101000a900460ff16611f90576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260298152602001806128236029913960400191505060405180910390fd5b6001600360008a815260200190815260200160002060006101000a81548160ff02191690831515021790555087897f6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c898989604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a3505050505050505050565b60026020528060005260406000206000915054906101000a900460ff1681565b6006818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661214c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff021916905550565b60008160405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c01828152602001915050604051602081830303815290604052805190602001209050919050565b84816000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b815260040180828152602001915050604080518083038186803b15801561226c57600080fd5b505afa158015612280573d6000803e3d6000fd5b505050506040513d604081101561229657600080fd5b81019080805190602001909291908051906020019092919050505050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612357576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b866000600560008360ff1660ff168152602001908152602001600020805460018160011615610100020316600290049050116123fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b600060016124566124518c8c8c8c8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611341565b61219e565b8e8e8e60405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156124ad573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561255c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f45434453413a20696e76616c6964207369676e6174757265000000000000000081525060200191505060405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146125e0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603281526020018061284c6032913960400191505060405180910390fd5b600360008b815260200190815260200160002060009054906101000a900460ff1615612657576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806127fe6025913960400191505060405180910390fd5b6001600360008c815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff168a7f955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db8b8b8b604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a350505050505050505050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061275957803560ff1916838001178555612787565b82800160010185558215612787579182015b8281111561278657823582559160200191906001019061276b565b5b50905061279491906127e0565b5090565b50805460018160011615610100020316600290046000825580601f106127be57506127dd565b601f0160209004906000526020600020908101906127dc91906127e0565b5b50565b5b808211156127f95760008160009055506001016127e1565b509056fe617373657420616c72656164792070617274206f6620616e6f74686572206a6f75726e6579706172656e7420646f63756d656e7420686173206e6f7420737461727465642061206a6f75726e65797369676e6572206f66206d65737361676520616e64207265636f7665726564206f776e657220646f206e6f74206d61746368636f6e74726163742063616e206f6e6c792062652064656c65746520627920746865206f776e6572a26469706673582212204830c01c2a64216e151a3aa9ab92f4be94932277530374f7094b30e4c84941fe64736f6c634300060c0033",
}

// NewJourneyABI is the input ABI used to generate the binding from.
// Deprecated: Use NewJourneyMetaData.ABI instead.
var NewJourneyABI = NewJourneyMetaData.ABI

// NewJourneyBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use NewJourneyMetaData.Bin instead.
var NewJourneyBin = NewJourneyMetaData.Bin

// DeployNewJourney deploys a new Ethereum contract, binding an instance of NewJourney to it.
func DeployNewJourney(auth *bind.TransactOpts, backend bind.ContractBackend, notaryAddress common.Address) (common.Address, *types.Transaction, *NewJourney, error) {
	parsed, err := NewJourneyMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(NewJourneyBin), backend, notaryAddress)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &NewJourney{NewJourneyCaller: NewJourneyCaller{contract: contract}, NewJourneyTransactor: NewJourneyTransactor{contract: contract}, NewJourneyFilterer: NewJourneyFilterer{contract: contract}}, nil
}

// NewJourney is an auto generated Go binding around an Ethereum contract.
type NewJourney struct {
	NewJourneyCaller     // Read-only binding to the contract
	NewJourneyTransactor // Write-only binding to the contract
	NewJourneyFilterer   // Log filterer for contract events
}

// NewJourneyCaller is an auto generated read-only Go binding around an Ethereum contract.
type NewJourneyCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewJourneyTransactor is an auto generated write-only Go binding around an Ethereum contract.
type NewJourneyTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewJourneyFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type NewJourneyFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewJourneySession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type NewJourneySession struct {
	Contract     *NewJourney       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// NewJourneyCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type NewJourneyCallerSession struct {
	Contract *NewJourneyCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// NewJourneyTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type NewJourneyTransactorSession struct {
	Contract     *NewJourneyTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// NewJourneyRaw is an auto generated low-level Go binding around an Ethereum contract.
type NewJourneyRaw struct {
	Contract *NewJourney // Generic contract binding to access the raw methods on
}

// NewJourneyCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type NewJourneyCallerRaw struct {
	Contract *NewJourneyCaller // Generic read-only contract binding to access the raw methods on
}

// NewJourneyTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type NewJourneyTransactorRaw struct {
	Contract *NewJourneyTransactor // Generic write-only contract binding to access the raw methods on
}

// NewNewJourney creates a new instance of NewJourney, bound to a specific deployed contract.
func NewNewJourney(address common.Address, backend bind.ContractBackend) (*NewJourney, error) {
	contract, err := bindNewJourney(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &NewJourney{NewJourneyCaller: NewJourneyCaller{contract: contract}, NewJourneyTransactor: NewJourneyTransactor{contract: contract}, NewJourneyFilterer: NewJourneyFilterer{contract: contract}}, nil
}

// NewNewJourneyCaller creates a new read-only instance of NewJourney, bound to a specific deployed contract.
func NewNewJourneyCaller(address common.Address, caller bind.ContractCaller) (*NewJourneyCaller, error) {
	contract, err := bindNewJourney(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &NewJourneyCaller{contract: contract}, nil
}

// NewNewJourneyTransactor creates a new write-only instance of NewJourney, bound to a specific deployed contract.
func NewNewJourneyTransactor(address common.Address, transactor bind.ContractTransactor) (*NewJourneyTransactor, error) {
	contract, err := bindNewJourney(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &NewJourneyTransactor{contract: contract}, nil
}

// NewNewJourneyFilterer creates a new log filterer instance of NewJourney, bound to a specific deployed contract.
func NewNewJourneyFilterer(address common.Address, filterer bind.ContractFilterer) (*NewJourneyFilterer, error) {
	contract, err := bindNewJourney(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &NewJourneyFilterer{contract: contract}, nil
}

// bindNewJourney binds a generic wrapper to an already deployed contract.
func bindNewJourney(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(NewJourneyABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_NewJourney *NewJourneyRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _NewJourney.Contract.NewJourneyCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_NewJourney *NewJourneyRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewJourney.Contract.NewJourneyTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_NewJourney *NewJourneyRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _NewJourney.Contract.NewJourneyTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_NewJourney *NewJourneyCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _NewJourney.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_NewJourney *NewJourneyTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewJourney.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_NewJourney *NewJourneyTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _NewJourney.Contract.contract.Transact(opts, method, params...)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_NewJourney *NewJourneyCaller) Allowed(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "allowed", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_NewJourney *NewJourneySession) Allowed(arg0 common.Address) (bool, error) {
	return _NewJourney.Contract.Allowed(&_NewJourney.CallOpts, arg0)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_NewJourney *NewJourneyCallerSession) Allowed(arg0 common.Address) (bool, error) {
	return _NewJourney.Contract.Allowed(&_NewJourney.CallOpts, arg0)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewJourney *NewJourneyCaller) DeployedOn(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "deployedOn")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewJourney *NewJourneySession) DeployedOn() (*big.Int, error) {
	return _NewJourney.Contract.DeployedOn(&_NewJourney.CallOpts)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewJourney *NewJourneyCallerSession) DeployedOn() (*big.Int, error) {
	return _NewJourney.Contract.DeployedOn(&_NewJourney.CallOpts)
}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_NewJourney *NewJourneyCaller) DocumentDescriptionMapping(opts *bind.CallOpts, arg0 string) (uint8, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "documentDescriptionMapping", arg0)

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_NewJourney *NewJourneySession) DocumentDescriptionMapping(arg0 string) (uint8, error) {
	return _NewJourney.Contract.DocumentDescriptionMapping(&_NewJourney.CallOpts, arg0)
}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_NewJourney *NewJourneyCallerSession) DocumentDescriptionMapping(arg0 string) (uint8, error) {
	return _NewJourney.Contract.DocumentDescriptionMapping(&_NewJourney.CallOpts, arg0)
}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_NewJourney *NewJourneyCaller) Documents(opts *bind.CallOpts, arg0 uint8) (string, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "documents", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_NewJourney *NewJourneySession) Documents(arg0 uint8) (string, error) {
	return _NewJourney.Contract.Documents(&_NewJourney.CallOpts, arg0)
}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_NewJourney *NewJourneyCallerSession) Documents(arg0 uint8) (string, error) {
	return _NewJourney.Contract.Documents(&_NewJourney.CallOpts, arg0)
}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewJourney *NewJourneyCaller) GetEthSignedMessageHash(opts *bind.CallOpts, messageHash [32]byte) ([32]byte, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "getEthSignedMessageHash", messageHash)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewJourney *NewJourneySession) GetEthSignedMessageHash(messageHash [32]byte) ([32]byte, error) {
	return _NewJourney.Contract.GetEthSignedMessageHash(&_NewJourney.CallOpts, messageHash)
}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewJourney *NewJourneyCallerSession) GetEthSignedMessageHash(messageHash [32]byte) ([32]byte, error) {
	return _NewJourney.Contract.GetEthSignedMessageHash(&_NewJourney.CallOpts, messageHash)
}

// OnBehalfOfHashLink is a free data retrieval call binding the contract method 0x999fd060.
//
// Solidity: function onBehalfOfHashLink(bytes32 parent, bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneyCaller) OnBehalfOfHashLink(opts *bind.CallOpts, parent [32]byte, docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "onBehalfOfHashLink", parent, docHash, docType, key)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// OnBehalfOfHashLink is a free data retrieval call binding the contract method 0x999fd060.
//
// Solidity: function onBehalfOfHashLink(bytes32 parent, bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneySession) OnBehalfOfHashLink(parent [32]byte, docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	return _NewJourney.Contract.OnBehalfOfHashLink(&_NewJourney.CallOpts, parent, docHash, docType, key)
}

// OnBehalfOfHashLink is a free data retrieval call binding the contract method 0x999fd060.
//
// Solidity: function onBehalfOfHashLink(bytes32 parent, bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneyCallerSession) OnBehalfOfHashLink(parent [32]byte, docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	return _NewJourney.Contract.OnBehalfOfHashLink(&_NewJourney.CallOpts, parent, docHash, docType, key)
}

// OnBehalfOfHashStart is a free data retrieval call binding the contract method 0x80c0ea9d.
//
// Solidity: function onBehalfOfHashStart(bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneyCaller) OnBehalfOfHashStart(opts *bind.CallOpts, docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "onBehalfOfHashStart", docHash, docType, key)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// OnBehalfOfHashStart is a free data retrieval call binding the contract method 0x80c0ea9d.
//
// Solidity: function onBehalfOfHashStart(bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneySession) OnBehalfOfHashStart(docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	return _NewJourney.Contract.OnBehalfOfHashStart(&_NewJourney.CallOpts, docHash, docType, key)
}

// OnBehalfOfHashStart is a free data retrieval call binding the contract method 0x80c0ea9d.
//
// Solidity: function onBehalfOfHashStart(bytes32 docHash, uint8 docType, string key) view returns(bytes32)
func (_NewJourney *NewJourneyCallerSession) OnBehalfOfHashStart(docHash [32]byte, docType uint8, key string) ([32]byte, error) {
	return _NewJourney.Contract.OnBehalfOfHashStart(&_NewJourney.CallOpts, docHash, docType, key)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewJourney *NewJourneyCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _NewJourney.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewJourney *NewJourneySession) Owner() (common.Address, error) {
	return _NewJourney.Contract.Owner(&_NewJourney.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewJourney *NewJourneyCallerSession) Owner() (common.Address, error) {
	return _NewJourney.Contract.Owner(&_NewJourney.CallOpts)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneyTransactor) Link(opts *bind.TransactOpts, parent [32]byte, docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "Link", parent, docHash, docType, key)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneySession) Link(parent [32]byte, docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.Contract.Link(&_NewJourney.TransactOpts, parent, docHash, docType, key)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneyTransactorSession) Link(parent [32]byte, docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.Contract.Link(&_NewJourney.TransactOpts, parent, docHash, docType, key)
}

// LinkOnBehalf is a paid mutator transaction binding the contract method 0x4631b2ec.
//
// Solidity: function LinkOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 parent, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneyTransactor) LinkOnBehalf(opts *bind.TransactOpts, v uint8, r [32]byte, s [32]byte, parent [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "LinkOnBehalf", v, r, s, parent, docHash, docType, key, signer)
}

// LinkOnBehalf is a paid mutator transaction binding the contract method 0x4631b2ec.
//
// Solidity: function LinkOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 parent, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneySession) LinkOnBehalf(v uint8, r [32]byte, s [32]byte, parent [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.LinkOnBehalf(&_NewJourney.TransactOpts, v, r, s, parent, docHash, docType, key, signer)
}

// LinkOnBehalf is a paid mutator transaction binding the contract method 0x4631b2ec.
//
// Solidity: function LinkOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 parent, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneyTransactorSession) LinkOnBehalf(v uint8, r [32]byte, s [32]byte, parent [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.LinkOnBehalf(&_NewJourney.TransactOpts, v, r, s, parent, docHash, docType, key, signer)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_NewJourney *NewJourneyTransactor) RegisterDocument(opts *bind.TransactOpts, docType uint8, description string) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "RegisterDocument", docType, description)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_NewJourney *NewJourneySession) RegisterDocument(docType uint8, description string) (*types.Transaction, error) {
	return _NewJourney.Contract.RegisterDocument(&_NewJourney.TransactOpts, docType, description)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_NewJourney *NewJourneyTransactorSession) RegisterDocument(docType uint8, description string) (*types.Transaction, error) {
	return _NewJourney.Contract.RegisterDocument(&_NewJourney.TransactOpts, docType, description)
}

// RemoveDocument is a paid mutator transaction binding the contract method 0xba201be0.
//
// Solidity: function RemoveDocument(uint8 docType) returns()
func (_NewJourney *NewJourneyTransactor) RemoveDocument(opts *bind.TransactOpts, docType uint8) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "RemoveDocument", docType)
}

// RemoveDocument is a paid mutator transaction binding the contract method 0xba201be0.
//
// Solidity: function RemoveDocument(uint8 docType) returns()
func (_NewJourney *NewJourneySession) RemoveDocument(docType uint8) (*types.Transaction, error) {
	return _NewJourney.Contract.RemoveDocument(&_NewJourney.TransactOpts, docType)
}

// RemoveDocument is a paid mutator transaction binding the contract method 0xba201be0.
//
// Solidity: function RemoveDocument(uint8 docType) returns()
func (_NewJourney *NewJourneyTransactorSession) RemoveDocument(docType uint8) (*types.Transaction, error) {
	return _NewJourney.Contract.RemoveDocument(&_NewJourney.TransactOpts, docType)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneyTransactor) Start(opts *bind.TransactOpts, docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "Start", docHash, docType, key)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneySession) Start(docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.Contract.Start(&_NewJourney.TransactOpts, docHash, docType, key)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 docHash, uint8 docType, string key) returns()
func (_NewJourney *NewJourneyTransactorSession) Start(docHash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _NewJourney.Contract.Start(&_NewJourney.TransactOpts, docHash, docType, key)
}

// StartOnBehalf is a paid mutator transaction binding the contract method 0xfda1fc77.
//
// Solidity: function StartOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneyTransactor) StartOnBehalf(opts *bind.TransactOpts, v uint8, r [32]byte, s [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "StartOnBehalf", v, r, s, docHash, docType, key, signer)
}

// StartOnBehalf is a paid mutator transaction binding the contract method 0xfda1fc77.
//
// Solidity: function StartOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneySession) StartOnBehalf(v uint8, r [32]byte, s [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.StartOnBehalf(&_NewJourney.TransactOpts, v, r, s, docHash, docType, key, signer)
}

// StartOnBehalf is a paid mutator transaction binding the contract method 0xfda1fc77.
//
// Solidity: function StartOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 docHash, uint8 docType, string key, address signer) returns()
func (_NewJourney *NewJourneyTransactorSession) StartOnBehalf(v uint8, r [32]byte, s [32]byte, docHash [32]byte, docType uint8, key string, signer common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.StartOnBehalf(&_NewJourney.TransactOpts, v, r, s, docHash, docType, key, signer)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_NewJourney *NewJourneyTransactor) AddUser(opts *bind.TransactOpts, user common.Address) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "addUser", user)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_NewJourney *NewJourneySession) AddUser(user common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.AddUser(&_NewJourney.TransactOpts, user)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_NewJourney *NewJourneyTransactorSession) AddUser(user common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.AddUser(&_NewJourney.TransactOpts, user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_NewJourney *NewJourneyTransactor) DelUser(opts *bind.TransactOpts, user common.Address) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "delUser", user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_NewJourney *NewJourneySession) DelUser(user common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.DelUser(&_NewJourney.TransactOpts, user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_NewJourney *NewJourneyTransactorSession) DelUser(user common.Address) (*types.Transaction, error) {
	return _NewJourney.Contract.DelUser(&_NewJourney.TransactOpts, user)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewJourney *NewJourneyTransactor) Kill(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewJourney.contract.Transact(opts, "kill")
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewJourney *NewJourneySession) Kill() (*types.Transaction, error) {
	return _NewJourney.Contract.Kill(&_NewJourney.TransactOpts)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewJourney *NewJourneyTransactorSession) Kill() (*types.Transaction, error) {
	return _NewJourney.Contract.Kill(&_NewJourney.TransactOpts)
}

// NewJourneyAssetLinkedIterator is returned from FilterAssetLinked and is used to iterate over the raw logs and unpacked data for AssetLinked events raised by the NewJourney contract.
type NewJourneyAssetLinkedIterator struct {
	Event *NewJourneyAssetLinked // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *NewJourneyAssetLinkedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewJourneyAssetLinked)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(NewJourneyAssetLinked)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *NewJourneyAssetLinkedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewJourneyAssetLinkedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewJourneyAssetLinked represents a AssetLinked event raised by the NewJourney contract.
type NewJourneyAssetLinked struct {
	Parent [32]byte
	Hash   [32]byte
	Typ    uint8
	Key    string
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterAssetLinked is a free log retrieval operation binding the contract event 0x6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c.
//
// Solidity: event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key)
func (_NewJourney *NewJourneyFilterer) FilterAssetLinked(opts *bind.FilterOpts, parent [][32]byte, hash [][32]byte) (*NewJourneyAssetLinkedIterator, error) {

	var parentRule []interface{}
	for _, parentItem := range parent {
		parentRule = append(parentRule, parentItem)
	}
	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewJourney.contract.FilterLogs(opts, "AssetLinked", parentRule, hashRule)
	if err != nil {
		return nil, err
	}
	return &NewJourneyAssetLinkedIterator{contract: _NewJourney.contract, event: "AssetLinked", logs: logs, sub: sub}, nil
}

// WatchAssetLinked is a free log subscription operation binding the contract event 0x6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c.
//
// Solidity: event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key)
func (_NewJourney *NewJourneyFilterer) WatchAssetLinked(opts *bind.WatchOpts, sink chan<- *NewJourneyAssetLinked, parent [][32]byte, hash [][32]byte) (event.Subscription, error) {

	var parentRule []interface{}
	for _, parentItem := range parent {
		parentRule = append(parentRule, parentItem)
	}
	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewJourney.contract.WatchLogs(opts, "AssetLinked", parentRule, hashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewJourneyAssetLinked)
				if err := _NewJourney.contract.UnpackLog(event, "AssetLinked", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAssetLinked is a log parse operation binding the contract event 0x6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c.
//
// Solidity: event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key)
func (_NewJourney *NewJourneyFilterer) ParseAssetLinked(log types.Log) (*NewJourneyAssetLinked, error) {
	event := new(NewJourneyAssetLinked)
	if err := _NewJourney.contract.UnpackLog(event, "AssetLinked", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// NewJourneyDocumentTypeDeletedIterator is returned from FilterDocumentTypeDeleted and is used to iterate over the raw logs and unpacked data for DocumentTypeDeleted events raised by the NewJourney contract.
type NewJourneyDocumentTypeDeletedIterator struct {
	Event *NewJourneyDocumentTypeDeleted // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *NewJourneyDocumentTypeDeletedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewJourneyDocumentTypeDeleted)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(NewJourneyDocumentTypeDeleted)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *NewJourneyDocumentTypeDeletedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewJourneyDocumentTypeDeletedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewJourneyDocumentTypeDeleted represents a DocumentTypeDeleted event raised by the NewJourney contract.
type NewJourneyDocumentTypeDeleted struct {
	DocType     uint8
	Description string
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterDocumentTypeDeleted is a free log retrieval operation binding the contract event 0x27611a55020e9b533f98e6d92e86bb2715b63fea3fdf7653ddb8c9cc6a457db3.
//
// Solidity: event DocumentTypeDeleted(uint8 docType, string description)
func (_NewJourney *NewJourneyFilterer) FilterDocumentTypeDeleted(opts *bind.FilterOpts) (*NewJourneyDocumentTypeDeletedIterator, error) {

	logs, sub, err := _NewJourney.contract.FilterLogs(opts, "DocumentTypeDeleted")
	if err != nil {
		return nil, err
	}
	return &NewJourneyDocumentTypeDeletedIterator{contract: _NewJourney.contract, event: "DocumentTypeDeleted", logs: logs, sub: sub}, nil
}

// WatchDocumentTypeDeleted is a free log subscription operation binding the contract event 0x27611a55020e9b533f98e6d92e86bb2715b63fea3fdf7653ddb8c9cc6a457db3.
//
// Solidity: event DocumentTypeDeleted(uint8 docType, string description)
func (_NewJourney *NewJourneyFilterer) WatchDocumentTypeDeleted(opts *bind.WatchOpts, sink chan<- *NewJourneyDocumentTypeDeleted) (event.Subscription, error) {

	logs, sub, err := _NewJourney.contract.WatchLogs(opts, "DocumentTypeDeleted")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewJourneyDocumentTypeDeleted)
				if err := _NewJourney.contract.UnpackLog(event, "DocumentTypeDeleted", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseDocumentTypeDeleted is a log parse operation binding the contract event 0x27611a55020e9b533f98e6d92e86bb2715b63fea3fdf7653ddb8c9cc6a457db3.
//
// Solidity: event DocumentTypeDeleted(uint8 docType, string description)
func (_NewJourney *NewJourneyFilterer) ParseDocumentTypeDeleted(log types.Log) (*NewJourneyDocumentTypeDeleted, error) {
	event := new(NewJourneyDocumentTypeDeleted)
	if err := _NewJourney.contract.UnpackLog(event, "DocumentTypeDeleted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// NewJourneyDocumentTypeRegisteredIterator is returned from FilterDocumentTypeRegistered and is used to iterate over the raw logs and unpacked data for DocumentTypeRegistered events raised by the NewJourney contract.
type NewJourneyDocumentTypeRegisteredIterator struct {
	Event *NewJourneyDocumentTypeRegistered // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *NewJourneyDocumentTypeRegisteredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewJourneyDocumentTypeRegistered)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(NewJourneyDocumentTypeRegistered)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *NewJourneyDocumentTypeRegisteredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewJourneyDocumentTypeRegisteredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewJourneyDocumentTypeRegistered represents a DocumentTypeRegistered event raised by the NewJourney contract.
type NewJourneyDocumentTypeRegistered struct {
	DocType     uint8
	Description string
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterDocumentTypeRegistered is a free log retrieval operation binding the contract event 0x897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8.
//
// Solidity: event DocumentTypeRegistered(uint8 indexed docType, string description)
func (_NewJourney *NewJourneyFilterer) FilterDocumentTypeRegistered(opts *bind.FilterOpts, docType []uint8) (*NewJourneyDocumentTypeRegisteredIterator, error) {

	var docTypeRule []interface{}
	for _, docTypeItem := range docType {
		docTypeRule = append(docTypeRule, docTypeItem)
	}

	logs, sub, err := _NewJourney.contract.FilterLogs(opts, "DocumentTypeRegistered", docTypeRule)
	if err != nil {
		return nil, err
	}
	return &NewJourneyDocumentTypeRegisteredIterator{contract: _NewJourney.contract, event: "DocumentTypeRegistered", logs: logs, sub: sub}, nil
}

// WatchDocumentTypeRegistered is a free log subscription operation binding the contract event 0x897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8.
//
// Solidity: event DocumentTypeRegistered(uint8 indexed docType, string description)
func (_NewJourney *NewJourneyFilterer) WatchDocumentTypeRegistered(opts *bind.WatchOpts, sink chan<- *NewJourneyDocumentTypeRegistered, docType []uint8) (event.Subscription, error) {

	var docTypeRule []interface{}
	for _, docTypeItem := range docType {
		docTypeRule = append(docTypeRule, docTypeItem)
	}

	logs, sub, err := _NewJourney.contract.WatchLogs(opts, "DocumentTypeRegistered", docTypeRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewJourneyDocumentTypeRegistered)
				if err := _NewJourney.contract.UnpackLog(event, "DocumentTypeRegistered", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseDocumentTypeRegistered is a log parse operation binding the contract event 0x897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8.
//
// Solidity: event DocumentTypeRegistered(uint8 indexed docType, string description)
func (_NewJourney *NewJourneyFilterer) ParseDocumentTypeRegistered(log types.Log) (*NewJourneyDocumentTypeRegistered, error) {
	event := new(NewJourneyDocumentTypeRegistered)
	if err := _NewJourney.contract.UnpackLog(event, "DocumentTypeRegistered", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// NewJourneyJourneyStartIterator is returned from FilterJourneyStart and is used to iterate over the raw logs and unpacked data for JourneyStart events raised by the NewJourney contract.
type NewJourneyJourneyStartIterator struct {
	Event *NewJourneyJourneyStart // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *NewJourneyJourneyStartIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewJourneyJourneyStart)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(NewJourneyJourneyStart)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *NewJourneyJourneyStartIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewJourneyJourneyStartIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewJourneyJourneyStart represents a JourneyStart event raised by the NewJourney contract.
type NewJourneyJourneyStart struct {
	Hash      [32]byte
	Typ       uint8
	Key       string
	Initiator common.Address
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterJourneyStart is a free log retrieval operation binding the contract event 0x955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db.
//
// Solidity: event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator)
func (_NewJourney *NewJourneyFilterer) FilterJourneyStart(opts *bind.FilterOpts, hash [][32]byte, initiator []common.Address) (*NewJourneyJourneyStartIterator, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	var initiatorRule []interface{}
	for _, initiatorItem := range initiator {
		initiatorRule = append(initiatorRule, initiatorItem)
	}

	logs, sub, err := _NewJourney.contract.FilterLogs(opts, "JourneyStart", hashRule, initiatorRule)
	if err != nil {
		return nil, err
	}
	return &NewJourneyJourneyStartIterator{contract: _NewJourney.contract, event: "JourneyStart", logs: logs, sub: sub}, nil
}

// WatchJourneyStart is a free log subscription operation binding the contract event 0x955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db.
//
// Solidity: event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator)
func (_NewJourney *NewJourneyFilterer) WatchJourneyStart(opts *bind.WatchOpts, sink chan<- *NewJourneyJourneyStart, hash [][32]byte, initiator []common.Address) (event.Subscription, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	var initiatorRule []interface{}
	for _, initiatorItem := range initiator {
		initiatorRule = append(initiatorRule, initiatorItem)
	}

	logs, sub, err := _NewJourney.contract.WatchLogs(opts, "JourneyStart", hashRule, initiatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewJourneyJourneyStart)
				if err := _NewJourney.contract.UnpackLog(event, "JourneyStart", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseJourneyStart is a log parse operation binding the contract event 0x955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db.
//
// Solidity: event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator)
func (_NewJourney *NewJourneyFilterer) ParseJourneyStart(log types.Log) (*NewJourneyJourneyStart, error) {
	event := new(NewJourneyJourneyStart)
	if err := _NewJourney.contract.UnpackLog(event, "JourneyStart", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
