// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package newNotary

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

// NewNotaryMetaData contains all meta data concerning the NewNotary contract.
var NewNotaryMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"}],\"name\":\"AssetDeleted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"AssetRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"newHash\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"previousHash\",\"type\":\"bytes32\"}],\"name\":\"AssetUpdated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"}],\"name\":\"addToWhitelist\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"assets\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"}],\"name\":\"deleteFromWhitelist\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedOn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"fileHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"},{\"internalType\":\"bytes16\",\"name\":\"nonce\",\"type\":\"bytes16\"}],\"name\":\"generateAssetHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"messageHash\",\"type\":\"bytes32\"}],\"name\":\"getEthSignedMessageHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"docHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"}],\"name\":\"hashDocData\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"kill\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"dataHash\",\"type\":\"bytes32\"},{\"internalType\":\"bytes16\",\"name\":\"nonce\",\"type\":\"bytes16\"}],\"name\":\"onBehalfOfSignHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"whitelist\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"}],\"name\":\"registerAsset\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"},{\"internalType\":\"bytes16\",\"name\":\"nonce\",\"type\":\"bytes16\"},{\"internalType\":\"bytes32\",\"name\":\"fileHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"},{\"internalType\":\"address\",\"name\":\"signer\",\"type\":\"address\"}],\"name\":\"registerAssetOnBehalf\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"currentHash\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"newHash\",\"type\":\"bytes32\"},{\"internalType\":\"uint32\",\"name\":\"expiresAt\",\"type\":\"uint32\"}],\"name\":\"updateAsset\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"}],\"name\":\"deleteAsset\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550436003819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611818806100bf6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063acab07ac11610066578063acab07ac14610447578063e43252d714610485578063ecfb5d17146104c9578063fa5408011461050d576100f5565b80638da5cb5b1461030257806399f3a496146103365780639b19251a146103885780639fda5b66146103e2576100f5565b806372296742116100d357806372296742146101ab57806373fc84201461024757806377e6b6a6146102655780637a9d765714610293576100f5565b806341c0e1b5146100fa578063424aaec2146101045780634daf306b14610163575b600080fd5b61010261054f565b005b61014d6004803603604081101561011a57600080fd5b810190808035906020019092919080356fffffffffffffffffffffffffffffffff1916906020019092919050505061060c565b6040518082815260200191505060405180910390f35b6101a96004803603606081101561017957600080fd5b810190808035906020019092919080359060200190929190803563ffffffff169060200190929190505050610676565b005b610245600480360360e08110156101c157600080fd5b81019080803560ff169060200190929190803590602001909291908035906020019092919080356fffffffffffffffffffffffffffffffff1916906020019092919080359060200190929190803563ffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a82565b005b61024f610efa565b6040518082815260200191505060405180910390f35b6102916004803603602081101561027b57600080fd5b8101908080359060200190929190505050610f00565b005b6102ec600480360360608110156102a957600080fd5b8101908080359060200190929190803563ffffffff16906020019092919080356fffffffffffffffffffffffffffffffff1916906020019092919050505061105f565b6040518082815260200191505060405180910390f35b61030a61114c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103726004803603604081101561034c57600080fd5b8101908080359060200190929190803563ffffffff169060200190929190505050611170565b6040518082815260200191505060405180910390f35b6103ca6004803603602081101561039e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506111af565b60405180821515815260200191505060405180910390f35b61040e600480360360208110156103f857600080fd5b81019080803590602001909291905050506111cf565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018263ffffffff1681526020019250505060405180910390f35b6104836004803603604081101561045d57600080fd5b8101908080359060200190929190803563ffffffff169060200190929190505050611223565b005b6104c76004803603602081101561049b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114fc565b005b61050b600480360360208110156104df57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611616565b005b6105396004803603602081101561052357600080fd5b8101908080359060200190929190505050611730565b6040518082815260200191505060405180910390f35b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001806117bb6028913960400191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16ff5b6000308383604051602001808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001826fffffffffffffffffffffffffffffffff19168152602001935050505060405160208183030381529060405280519060200120905092915050565b82338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461074f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b828063ffffffff1642106107cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f657870697265734174206d75737420626520696e20746865206675747572650081525060200191505060405180910390fd5b84600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146108a4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f617373657420616c72656164792072656769737465726564000000000000000081525060200191505060405180910390fd5b6000801b87141561091d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f696e76616c69642063757272656e74206861736800000000000000000000000081525060200191505060405180910390fd5b6000801b861415610996576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f696e76616c6964206e657720686173680000000000000000000000000000000081525060200191505060405180910390fd5b60405180604001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018663ffffffff168152506001600088815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548163ffffffff021916908363ffffffff16021790555090505086867ff51dcf05b8f9de99294b634d435bbe59d587f06262eda8637027473b9055717b60405160405180910390a350505050505050565b826000801b811415610afc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f7420612076616c696420686173682075736564000000000000000000000081525060200191505060405180910390fd5b83600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610bd5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f617373657420616c72656164792072656769737465726564000000000000000081525060200191505060405180910390fd5b838063ffffffff164210610c51576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f657870697265734174206d75737420626520696e20746865206675747572650081525060200191505060405180910390fd5b60006001610c6088888b61105f565b8c8c8c60405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610cb7573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d66576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f45434453413a20696e76616c6964207369676e6174757265000000000000000081525060200191505060405180910390fd5b8473ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610dea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260328152602001806117896032913960400191505060405180910390fd5b60405180604001604052808273ffffffffffffffffffffffffffffffffffffffff1681526020018763ffffffff168152506001600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548163ffffffff021916908363ffffffff160217905550905050867f7b8c7b505365aa1b7f9ce04295e6da7c743d877f121b9debcf6a8a9d1806ce4682604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25050505050505050505050565b60035481565b80338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610fd9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b60016000848152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556000820160146101000a81549063ffffffff02191690555050827f22ced05e2a8c120ab8dbb2d8bff75c90683795bba4268b3e549ed50542cc78c160405160405180910390a2505050565b6000308484604051602001808381526020018263ffffffff168152602001925050506040516020818303038152906040528051906020012083604051602001808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001826fffffffffffffffffffffffffffffffff1916815260200193505050506040516020818303038152906040528051906020012060405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018281526020019150506040516020818303038152906040528051906020012090509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008282604051602001808381526020018263ffffffff1681526020019250505060405160208183030381529060405280519060200120905092915050565b60026020528060005260406000206000915054906101000a900460ff1681565b60016020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900463ffffffff16905082565b816000801b81141561129d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f7420612076616c696420686173682075736564000000000000000000000081525060200191505060405180910390fd5b82600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611376576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f617373657420616c72656164792072656769737465726564000000000000000081525060200191505060405180910390fd5b828063ffffffff1642106113f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f657870697265734174206d75737420626520696e20746865206675747572650081525060200191505060405180910390fd5b60405180604001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018563ffffffff168152506001600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548163ffffffff021916908363ffffffff160217905550905050847f7b8c7b505365aa1b7f9ce04295e6da7c743d877f121b9debcf6a8a9d1806ce4633604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25050505050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166115bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f63616c6c6572206e6f74206f6e2077686974656c69737400000000000000000081525060200191505060405180910390fd5b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166116d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f63616c6c6572206e6f74206f6e2077686974656c69737400000000000000000081525060200191505060405180910390fd5b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60008160405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c0182815260200191505060405160208183030381529060405280519060200120905091905056fe7369676e6572206f66206d65737361676520616e64207265636f7665726564206f776e657220646f206e6f74206d61746368636f6e74726163742063616e206f6e6c792062652064656c65746520627920746865206f776e6572a26469706673582212205119df08e5a99b68eda2699a0be9a9a715b87b4c3cadcd3022466081909c225264736f6c634300060c0033",
}

// NewNotaryABI is the input ABI used to generate the binding from.
// Deprecated: Use NewNotaryMetaData.ABI instead.
var NewNotaryABI = NewNotaryMetaData.ABI

// NewNotaryBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use NewNotaryMetaData.Bin instead.
var NewNotaryBin = NewNotaryMetaData.Bin

// DeployNewNotary deploys a new Ethereum contract, binding an instance of NewNotary to it.
func DeployNewNotary(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *NewNotary, error) {
	parsed, err := NewNotaryMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(NewNotaryBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &NewNotary{NewNotaryCaller: NewNotaryCaller{contract: contract}, NewNotaryTransactor: NewNotaryTransactor{contract: contract}, NewNotaryFilterer: NewNotaryFilterer{contract: contract}}, nil
}

// NewNotary is an auto generated Go binding around an Ethereum contract.
type NewNotary struct {
	NewNotaryCaller     // Read-only binding to the contract
	NewNotaryTransactor // Write-only binding to the contract
	NewNotaryFilterer   // Log filterer for contract events
}

// NewNotaryCaller is an auto generated read-only Go binding around an Ethereum contract.
type NewNotaryCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewNotaryTransactor is an auto generated write-only Go binding around an Ethereum contract.
type NewNotaryTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewNotaryFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type NewNotaryFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// NewNotarySession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type NewNotarySession struct {
	Contract     *NewNotary        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// NewNotaryCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type NewNotaryCallerSession struct {
	Contract *NewNotaryCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// NewNotaryTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type NewNotaryTransactorSession struct {
	Contract     *NewNotaryTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// NewNotaryRaw is an auto generated low-level Go binding around an Ethereum contract.
type NewNotaryRaw struct {
	Contract *NewNotary // Generic contract binding to access the raw methods on
}

// NewNotaryCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type NewNotaryCallerRaw struct {
	Contract *NewNotaryCaller // Generic read-only contract binding to access the raw methods on
}

// NewNotaryTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type NewNotaryTransactorRaw struct {
	Contract *NewNotaryTransactor // Generic write-only contract binding to access the raw methods on
}

// NewNewNotary creates a new instance of NewNotary, bound to a specific deployed contract.
func NewNewNotary(address common.Address, backend bind.ContractBackend) (*NewNotary, error) {
	contract, err := bindNewNotary(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &NewNotary{NewNotaryCaller: NewNotaryCaller{contract: contract}, NewNotaryTransactor: NewNotaryTransactor{contract: contract}, NewNotaryFilterer: NewNotaryFilterer{contract: contract}}, nil
}

// NewNewNotaryCaller creates a new read-only instance of NewNotary, bound to a specific deployed contract.
func NewNewNotaryCaller(address common.Address, caller bind.ContractCaller) (*NewNotaryCaller, error) {
	contract, err := bindNewNotary(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &NewNotaryCaller{contract: contract}, nil
}

// NewNewNotaryTransactor creates a new write-only instance of NewNotary, bound to a specific deployed contract.
func NewNewNotaryTransactor(address common.Address, transactor bind.ContractTransactor) (*NewNotaryTransactor, error) {
	contract, err := bindNewNotary(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &NewNotaryTransactor{contract: contract}, nil
}

// NewNewNotaryFilterer creates a new log filterer instance of NewNotary, bound to a specific deployed contract.
func NewNewNotaryFilterer(address common.Address, filterer bind.ContractFilterer) (*NewNotaryFilterer, error) {
	contract, err := bindNewNotary(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &NewNotaryFilterer{contract: contract}, nil
}

// bindNewNotary binds a generic wrapper to an already deployed contract.
func bindNewNotary(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(NewNotaryABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_NewNotary *NewNotaryRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _NewNotary.Contract.NewNotaryCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_NewNotary *NewNotaryRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewNotary.Contract.NewNotaryTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_NewNotary *NewNotaryRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _NewNotary.Contract.NewNotaryTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_NewNotary *NewNotaryCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _NewNotary.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_NewNotary *NewNotaryTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewNotary.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_NewNotary *NewNotaryTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _NewNotary.Contract.contract.Transact(opts, method, params...)
}

// Assets is a free data retrieval call binding the contract method 0x9fda5b66.
//
// Solidity: function assets(bytes32 ) view returns(address owner, uint32 expiresAt)
func (_NewNotary *NewNotaryCaller) Assets(opts *bind.CallOpts, arg0 [32]byte) (struct {
	Owner     common.Address
	ExpiresAt uint32
}, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "assets", arg0)

	outstruct := new(struct {
		Owner     common.Address
		ExpiresAt uint32
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Owner = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.ExpiresAt = *abi.ConvertType(out[1], new(uint32)).(*uint32)

	return *outstruct, err

}

// Assets is a free data retrieval call binding the contract method 0x9fda5b66.
//
// Solidity: function assets(bytes32 ) view returns(address owner, uint32 expiresAt)
func (_NewNotary *NewNotarySession) Assets(arg0 [32]byte) (struct {
	Owner     common.Address
	ExpiresAt uint32
}, error) {
	return _NewNotary.Contract.Assets(&_NewNotary.CallOpts, arg0)
}

// Assets is a free data retrieval call binding the contract method 0x9fda5b66.
//
// Solidity: function assets(bytes32 ) view returns(address owner, uint32 expiresAt)
func (_NewNotary *NewNotaryCallerSession) Assets(arg0 [32]byte) (struct {
	Owner     common.Address
	ExpiresAt uint32
}, error) {
	return _NewNotary.Contract.Assets(&_NewNotary.CallOpts, arg0)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewNotary *NewNotaryCaller) DeployedOn(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "deployedOn")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewNotary *NewNotarySession) DeployedOn() (*big.Int, error) {
	return _NewNotary.Contract.DeployedOn(&_NewNotary.CallOpts)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_NewNotary *NewNotaryCallerSession) DeployedOn() (*big.Int, error) {
	return _NewNotary.Contract.DeployedOn(&_NewNotary.CallOpts)
}

// GenerateAssetHash is a free data retrieval call binding the contract method 0x7a9d7657.
//
// Solidity: function generateAssetHash(bytes32 fileHash, uint32 expiresAt, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotaryCaller) GenerateAssetHash(opts *bind.CallOpts, fileHash [32]byte, expiresAt uint32, nonce [16]byte) ([32]byte, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "generateAssetHash", fileHash, expiresAt, nonce)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GenerateAssetHash is a free data retrieval call binding the contract method 0x7a9d7657.
//
// Solidity: function generateAssetHash(bytes32 fileHash, uint32 expiresAt, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotarySession) GenerateAssetHash(fileHash [32]byte, expiresAt uint32, nonce [16]byte) ([32]byte, error) {
	return _NewNotary.Contract.GenerateAssetHash(&_NewNotary.CallOpts, fileHash, expiresAt, nonce)
}

// GenerateAssetHash is a free data retrieval call binding the contract method 0x7a9d7657.
//
// Solidity: function generateAssetHash(bytes32 fileHash, uint32 expiresAt, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotaryCallerSession) GenerateAssetHash(fileHash [32]byte, expiresAt uint32, nonce [16]byte) ([32]byte, error) {
	return _NewNotary.Contract.GenerateAssetHash(&_NewNotary.CallOpts, fileHash, expiresAt, nonce)
}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewNotary *NewNotaryCaller) GetEthSignedMessageHash(opts *bind.CallOpts, messageHash [32]byte) ([32]byte, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "getEthSignedMessageHash", messageHash)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewNotary *NewNotarySession) GetEthSignedMessageHash(messageHash [32]byte) ([32]byte, error) {
	return _NewNotary.Contract.GetEthSignedMessageHash(&_NewNotary.CallOpts, messageHash)
}

// GetEthSignedMessageHash is a free data retrieval call binding the contract method 0xfa540801.
//
// Solidity: function getEthSignedMessageHash(bytes32 messageHash) pure returns(bytes32)
func (_NewNotary *NewNotaryCallerSession) GetEthSignedMessageHash(messageHash [32]byte) ([32]byte, error) {
	return _NewNotary.Contract.GetEthSignedMessageHash(&_NewNotary.CallOpts, messageHash)
}

// HashDocData is a free data retrieval call binding the contract method 0x99f3a496.
//
// Solidity: function hashDocData(bytes32 docHash, uint32 expiresAt) pure returns(bytes32)
func (_NewNotary *NewNotaryCaller) HashDocData(opts *bind.CallOpts, docHash [32]byte, expiresAt uint32) ([32]byte, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "hashDocData", docHash, expiresAt)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// HashDocData is a free data retrieval call binding the contract method 0x99f3a496.
//
// Solidity: function hashDocData(bytes32 docHash, uint32 expiresAt) pure returns(bytes32)
func (_NewNotary *NewNotarySession) HashDocData(docHash [32]byte, expiresAt uint32) ([32]byte, error) {
	return _NewNotary.Contract.HashDocData(&_NewNotary.CallOpts, docHash, expiresAt)
}

// HashDocData is a free data retrieval call binding the contract method 0x99f3a496.
//
// Solidity: function hashDocData(bytes32 docHash, uint32 expiresAt) pure returns(bytes32)
func (_NewNotary *NewNotaryCallerSession) HashDocData(docHash [32]byte, expiresAt uint32) ([32]byte, error) {
	return _NewNotary.Contract.HashDocData(&_NewNotary.CallOpts, docHash, expiresAt)
}

// OnBehalfOfSignHash is a free data retrieval call binding the contract method 0x424aaec2.
//
// Solidity: function onBehalfOfSignHash(bytes32 dataHash, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotaryCaller) OnBehalfOfSignHash(opts *bind.CallOpts, dataHash [32]byte, nonce [16]byte) ([32]byte, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "onBehalfOfSignHash", dataHash, nonce)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// OnBehalfOfSignHash is a free data retrieval call binding the contract method 0x424aaec2.
//
// Solidity: function onBehalfOfSignHash(bytes32 dataHash, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotarySession) OnBehalfOfSignHash(dataHash [32]byte, nonce [16]byte) ([32]byte, error) {
	return _NewNotary.Contract.OnBehalfOfSignHash(&_NewNotary.CallOpts, dataHash, nonce)
}

// OnBehalfOfSignHash is a free data retrieval call binding the contract method 0x424aaec2.
//
// Solidity: function onBehalfOfSignHash(bytes32 dataHash, bytes16 nonce) view returns(bytes32)
func (_NewNotary *NewNotaryCallerSession) OnBehalfOfSignHash(dataHash [32]byte, nonce [16]byte) ([32]byte, error) {
	return _NewNotary.Contract.OnBehalfOfSignHash(&_NewNotary.CallOpts, dataHash, nonce)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewNotary *NewNotaryCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewNotary *NewNotarySession) Owner() (common.Address, error) {
	return _NewNotary.Contract.Owner(&_NewNotary.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_NewNotary *NewNotaryCallerSession) Owner() (common.Address, error) {
	return _NewNotary.Contract.Owner(&_NewNotary.CallOpts)
}

// Whitelist is a free data retrieval call binding the contract method 0x9b19251a.
//
// Solidity: function whitelist(address ) view returns(bool)
func (_NewNotary *NewNotaryCaller) Whitelist(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _NewNotary.contract.Call(opts, &out, "whitelist", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Whitelist is a free data retrieval call binding the contract method 0x9b19251a.
//
// Solidity: function whitelist(address ) view returns(bool)
func (_NewNotary *NewNotarySession) Whitelist(arg0 common.Address) (bool, error) {
	return _NewNotary.Contract.Whitelist(&_NewNotary.CallOpts, arg0)
}

// Whitelist is a free data retrieval call binding the contract method 0x9b19251a.
//
// Solidity: function whitelist(address ) view returns(bool)
func (_NewNotary *NewNotaryCallerSession) Whitelist(arg0 common.Address) (bool, error) {
	return _NewNotary.Contract.Whitelist(&_NewNotary.CallOpts, arg0)
}

// AddToWhitelist is a paid mutator transaction binding the contract method 0xe43252d7.
//
// Solidity: function addToWhitelist(address admin) returns()
func (_NewNotary *NewNotaryTransactor) AddToWhitelist(opts *bind.TransactOpts, admin common.Address) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "addToWhitelist", admin)
}

// AddToWhitelist is a paid mutator transaction binding the contract method 0xe43252d7.
//
// Solidity: function addToWhitelist(address admin) returns()
func (_NewNotary *NewNotarySession) AddToWhitelist(admin common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.AddToWhitelist(&_NewNotary.TransactOpts, admin)
}

// AddToWhitelist is a paid mutator transaction binding the contract method 0xe43252d7.
//
// Solidity: function addToWhitelist(address admin) returns()
func (_NewNotary *NewNotaryTransactorSession) AddToWhitelist(admin common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.AddToWhitelist(&_NewNotary.TransactOpts, admin)
}

// DeleteAsset is a paid mutator transaction binding the contract method 0x77e6b6a6.
//
// Solidity: function deleteAsset(bytes32 hash) returns()
func (_NewNotary *NewNotaryTransactor) DeleteAsset(opts *bind.TransactOpts, hash [32]byte) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "deleteAsset", hash)
}

// DeleteAsset is a paid mutator transaction binding the contract method 0x77e6b6a6.
//
// Solidity: function deleteAsset(bytes32 hash) returns()
func (_NewNotary *NewNotarySession) DeleteAsset(hash [32]byte) (*types.Transaction, error) {
	return _NewNotary.Contract.DeleteAsset(&_NewNotary.TransactOpts, hash)
}

// DeleteAsset is a paid mutator transaction binding the contract method 0x77e6b6a6.
//
// Solidity: function deleteAsset(bytes32 hash) returns()
func (_NewNotary *NewNotaryTransactorSession) DeleteAsset(hash [32]byte) (*types.Transaction, error) {
	return _NewNotary.Contract.DeleteAsset(&_NewNotary.TransactOpts, hash)
}

// DeleteFromWhitelist is a paid mutator transaction binding the contract method 0xecfb5d17.
//
// Solidity: function deleteFromWhitelist(address admin) returns()
func (_NewNotary *NewNotaryTransactor) DeleteFromWhitelist(opts *bind.TransactOpts, admin common.Address) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "deleteFromWhitelist", admin)
}

// DeleteFromWhitelist is a paid mutator transaction binding the contract method 0xecfb5d17.
//
// Solidity: function deleteFromWhitelist(address admin) returns()
func (_NewNotary *NewNotarySession) DeleteFromWhitelist(admin common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.DeleteFromWhitelist(&_NewNotary.TransactOpts, admin)
}

// DeleteFromWhitelist is a paid mutator transaction binding the contract method 0xecfb5d17.
//
// Solidity: function deleteFromWhitelist(address admin) returns()
func (_NewNotary *NewNotaryTransactorSession) DeleteFromWhitelist(admin common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.DeleteFromWhitelist(&_NewNotary.TransactOpts, admin)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewNotary *NewNotaryTransactor) Kill(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "kill")
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewNotary *NewNotarySession) Kill() (*types.Transaction, error) {
	return _NewNotary.Contract.Kill(&_NewNotary.TransactOpts)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_NewNotary *NewNotaryTransactorSession) Kill() (*types.Transaction, error) {
	return _NewNotary.Contract.Kill(&_NewNotary.TransactOpts)
}

// RegisterAsset is a paid mutator transaction binding the contract method 0xacab07ac.
//
// Solidity: function registerAsset(bytes32 hash, uint32 expiresAt) returns()
func (_NewNotary *NewNotaryTransactor) RegisterAsset(opts *bind.TransactOpts, hash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "registerAsset", hash, expiresAt)
}

// RegisterAsset is a paid mutator transaction binding the contract method 0xacab07ac.
//
// Solidity: function registerAsset(bytes32 hash, uint32 expiresAt) returns()
func (_NewNotary *NewNotarySession) RegisterAsset(hash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.Contract.RegisterAsset(&_NewNotary.TransactOpts, hash, expiresAt)
}

// RegisterAsset is a paid mutator transaction binding the contract method 0xacab07ac.
//
// Solidity: function registerAsset(bytes32 hash, uint32 expiresAt) returns()
func (_NewNotary *NewNotaryTransactorSession) RegisterAsset(hash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.Contract.RegisterAsset(&_NewNotary.TransactOpts, hash, expiresAt)
}

// RegisterAssetOnBehalf is a paid mutator transaction binding the contract method 0x72296742.
//
// Solidity: function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, bytes32 fileHash, uint32 expiresAt, address signer) returns()
func (_NewNotary *NewNotaryTransactor) RegisterAssetOnBehalf(opts *bind.TransactOpts, v uint8, r [32]byte, s [32]byte, nonce [16]byte, fileHash [32]byte, expiresAt uint32, signer common.Address) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "registerAssetOnBehalf", v, r, s, nonce, fileHash, expiresAt, signer)
}

// RegisterAssetOnBehalf is a paid mutator transaction binding the contract method 0x72296742.
//
// Solidity: function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, bytes32 fileHash, uint32 expiresAt, address signer) returns()
func (_NewNotary *NewNotarySession) RegisterAssetOnBehalf(v uint8, r [32]byte, s [32]byte, nonce [16]byte, fileHash [32]byte, expiresAt uint32, signer common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.RegisterAssetOnBehalf(&_NewNotary.TransactOpts, v, r, s, nonce, fileHash, expiresAt, signer)
}

// RegisterAssetOnBehalf is a paid mutator transaction binding the contract method 0x72296742.
//
// Solidity: function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, bytes32 fileHash, uint32 expiresAt, address signer) returns()
func (_NewNotary *NewNotaryTransactorSession) RegisterAssetOnBehalf(v uint8, r [32]byte, s [32]byte, nonce [16]byte, fileHash [32]byte, expiresAt uint32, signer common.Address) (*types.Transaction, error) {
	return _NewNotary.Contract.RegisterAssetOnBehalf(&_NewNotary.TransactOpts, v, r, s, nonce, fileHash, expiresAt, signer)
}

// UpdateAsset is a paid mutator transaction binding the contract method 0x4daf306b.
//
// Solidity: function updateAsset(bytes32 currentHash, bytes32 newHash, uint32 expiresAt) returns()
func (_NewNotary *NewNotaryTransactor) UpdateAsset(opts *bind.TransactOpts, currentHash [32]byte, newHash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.contract.Transact(opts, "updateAsset", currentHash, newHash, expiresAt)
}

// UpdateAsset is a paid mutator transaction binding the contract method 0x4daf306b.
//
// Solidity: function updateAsset(bytes32 currentHash, bytes32 newHash, uint32 expiresAt) returns()
func (_NewNotary *NewNotarySession) UpdateAsset(currentHash [32]byte, newHash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.Contract.UpdateAsset(&_NewNotary.TransactOpts, currentHash, newHash, expiresAt)
}

// UpdateAsset is a paid mutator transaction binding the contract method 0x4daf306b.
//
// Solidity: function updateAsset(bytes32 currentHash, bytes32 newHash, uint32 expiresAt) returns()
func (_NewNotary *NewNotaryTransactorSession) UpdateAsset(currentHash [32]byte, newHash [32]byte, expiresAt uint32) (*types.Transaction, error) {
	return _NewNotary.Contract.UpdateAsset(&_NewNotary.TransactOpts, currentHash, newHash, expiresAt)
}

// NewNotaryAssetDeletedIterator is returned from FilterAssetDeleted and is used to iterate over the raw logs and unpacked data for AssetDeleted events raised by the NewNotary contract.
type NewNotaryAssetDeletedIterator struct {
	Event *NewNotaryAssetDeleted // Event containing the contract specifics and raw log

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
func (it *NewNotaryAssetDeletedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewNotaryAssetDeleted)
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
		it.Event = new(NewNotaryAssetDeleted)
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
func (it *NewNotaryAssetDeletedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewNotaryAssetDeletedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewNotaryAssetDeleted represents a AssetDeleted event raised by the NewNotary contract.
type NewNotaryAssetDeleted struct {
	Hash [32]byte
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterAssetDeleted is a free log retrieval operation binding the contract event 0x22ced05e2a8c120ab8dbb2d8bff75c90683795bba4268b3e549ed50542cc78c1.
//
// Solidity: event AssetDeleted(bytes32 indexed hash)
func (_NewNotary *NewNotaryFilterer) FilterAssetDeleted(opts *bind.FilterOpts, hash [][32]byte) (*NewNotaryAssetDeletedIterator, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewNotary.contract.FilterLogs(opts, "AssetDeleted", hashRule)
	if err != nil {
		return nil, err
	}
	return &NewNotaryAssetDeletedIterator{contract: _NewNotary.contract, event: "AssetDeleted", logs: logs, sub: sub}, nil
}

// WatchAssetDeleted is a free log subscription operation binding the contract event 0x22ced05e2a8c120ab8dbb2d8bff75c90683795bba4268b3e549ed50542cc78c1.
//
// Solidity: event AssetDeleted(bytes32 indexed hash)
func (_NewNotary *NewNotaryFilterer) WatchAssetDeleted(opts *bind.WatchOpts, sink chan<- *NewNotaryAssetDeleted, hash [][32]byte) (event.Subscription, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewNotary.contract.WatchLogs(opts, "AssetDeleted", hashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewNotaryAssetDeleted)
				if err := _NewNotary.contract.UnpackLog(event, "AssetDeleted", log); err != nil {
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

// ParseAssetDeleted is a log parse operation binding the contract event 0x22ced05e2a8c120ab8dbb2d8bff75c90683795bba4268b3e549ed50542cc78c1.
//
// Solidity: event AssetDeleted(bytes32 indexed hash)
func (_NewNotary *NewNotaryFilterer) ParseAssetDeleted(log types.Log) (*NewNotaryAssetDeleted, error) {
	event := new(NewNotaryAssetDeleted)
	if err := _NewNotary.contract.UnpackLog(event, "AssetDeleted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// NewNotaryAssetRegisteredIterator is returned from FilterAssetRegistered and is used to iterate over the raw logs and unpacked data for AssetRegistered events raised by the NewNotary contract.
type NewNotaryAssetRegisteredIterator struct {
	Event *NewNotaryAssetRegistered // Event containing the contract specifics and raw log

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
func (it *NewNotaryAssetRegisteredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewNotaryAssetRegistered)
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
		it.Event = new(NewNotaryAssetRegistered)
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
func (it *NewNotaryAssetRegisteredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewNotaryAssetRegisteredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewNotaryAssetRegistered represents a AssetRegistered event raised by the NewNotary contract.
type NewNotaryAssetRegistered struct {
	Hash  [32]byte
	Owner common.Address
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterAssetRegistered is a free log retrieval operation binding the contract event 0x7b8c7b505365aa1b7f9ce04295e6da7c743d877f121b9debcf6a8a9d1806ce46.
//
// Solidity: event AssetRegistered(bytes32 indexed hash, address owner)
func (_NewNotary *NewNotaryFilterer) FilterAssetRegistered(opts *bind.FilterOpts, hash [][32]byte) (*NewNotaryAssetRegisteredIterator, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewNotary.contract.FilterLogs(opts, "AssetRegistered", hashRule)
	if err != nil {
		return nil, err
	}
	return &NewNotaryAssetRegisteredIterator{contract: _NewNotary.contract, event: "AssetRegistered", logs: logs, sub: sub}, nil
}

// WatchAssetRegistered is a free log subscription operation binding the contract event 0x7b8c7b505365aa1b7f9ce04295e6da7c743d877f121b9debcf6a8a9d1806ce46.
//
// Solidity: event AssetRegistered(bytes32 indexed hash, address owner)
func (_NewNotary *NewNotaryFilterer) WatchAssetRegistered(opts *bind.WatchOpts, sink chan<- *NewNotaryAssetRegistered, hash [][32]byte) (event.Subscription, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _NewNotary.contract.WatchLogs(opts, "AssetRegistered", hashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewNotaryAssetRegistered)
				if err := _NewNotary.contract.UnpackLog(event, "AssetRegistered", log); err != nil {
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

// ParseAssetRegistered is a log parse operation binding the contract event 0x7b8c7b505365aa1b7f9ce04295e6da7c743d877f121b9debcf6a8a9d1806ce46.
//
// Solidity: event AssetRegistered(bytes32 indexed hash, address owner)
func (_NewNotary *NewNotaryFilterer) ParseAssetRegistered(log types.Log) (*NewNotaryAssetRegistered, error) {
	event := new(NewNotaryAssetRegistered)
	if err := _NewNotary.contract.UnpackLog(event, "AssetRegistered", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// NewNotaryAssetUpdatedIterator is returned from FilterAssetUpdated and is used to iterate over the raw logs and unpacked data for AssetUpdated events raised by the NewNotary contract.
type NewNotaryAssetUpdatedIterator struct {
	Event *NewNotaryAssetUpdated // Event containing the contract specifics and raw log

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
func (it *NewNotaryAssetUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(NewNotaryAssetUpdated)
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
		it.Event = new(NewNotaryAssetUpdated)
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
func (it *NewNotaryAssetUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *NewNotaryAssetUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// NewNotaryAssetUpdated represents a AssetUpdated event raised by the NewNotary contract.
type NewNotaryAssetUpdated struct {
	NewHash      [32]byte
	PreviousHash [32]byte
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterAssetUpdated is a free log retrieval operation binding the contract event 0xf51dcf05b8f9de99294b634d435bbe59d587f06262eda8637027473b9055717b.
//
// Solidity: event AssetUpdated(bytes32 indexed newHash, bytes32 indexed previousHash)
func (_NewNotary *NewNotaryFilterer) FilterAssetUpdated(opts *bind.FilterOpts, newHash [][32]byte, previousHash [][32]byte) (*NewNotaryAssetUpdatedIterator, error) {

	var newHashRule []interface{}
	for _, newHashItem := range newHash {
		newHashRule = append(newHashRule, newHashItem)
	}
	var previousHashRule []interface{}
	for _, previousHashItem := range previousHash {
		previousHashRule = append(previousHashRule, previousHashItem)
	}

	logs, sub, err := _NewNotary.contract.FilterLogs(opts, "AssetUpdated", newHashRule, previousHashRule)
	if err != nil {
		return nil, err
	}
	return &NewNotaryAssetUpdatedIterator{contract: _NewNotary.contract, event: "AssetUpdated", logs: logs, sub: sub}, nil
}

// WatchAssetUpdated is a free log subscription operation binding the contract event 0xf51dcf05b8f9de99294b634d435bbe59d587f06262eda8637027473b9055717b.
//
// Solidity: event AssetUpdated(bytes32 indexed newHash, bytes32 indexed previousHash)
func (_NewNotary *NewNotaryFilterer) WatchAssetUpdated(opts *bind.WatchOpts, sink chan<- *NewNotaryAssetUpdated, newHash [][32]byte, previousHash [][32]byte) (event.Subscription, error) {

	var newHashRule []interface{}
	for _, newHashItem := range newHash {
		newHashRule = append(newHashRule, newHashItem)
	}
	var previousHashRule []interface{}
	for _, previousHashItem := range previousHash {
		previousHashRule = append(previousHashRule, previousHashItem)
	}

	logs, sub, err := _NewNotary.contract.WatchLogs(opts, "AssetUpdated", newHashRule, previousHashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(NewNotaryAssetUpdated)
				if err := _NewNotary.contract.UnpackLog(event, "AssetUpdated", log); err != nil {
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

// ParseAssetUpdated is a log parse operation binding the contract event 0xf51dcf05b8f9de99294b634d435bbe59d587f06262eda8637027473b9055717b.
//
// Solidity: event AssetUpdated(bytes32 indexed newHash, bytes32 indexed previousHash)
func (_NewNotary *NewNotaryFilterer) ParseAssetUpdated(log types.Log) (*NewNotaryAssetUpdated, error) {
	event := new(NewNotaryAssetUpdated)
	if err := _NewNotary.contract.UnpackLog(event, "AssetUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
