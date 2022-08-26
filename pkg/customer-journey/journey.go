// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package journey

import (
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
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// JourneyABI is the input ABI used to generate the binding from.
const JourneyABI = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"notaryAddress\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"typ\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"AssetLinked\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"}],\"name\":\"DocumentTypeRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"typ\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"initiator\",\"type\":\"address\"}],\"name\":\"JourneyStart\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedOn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"name\":\"documentDescriptionMapping\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"name\":\"documents\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"kill\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"}],\"name\":\"addUser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"}],\"name\":\"delUser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"}],\"name\":\"RegisterDocument\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"Start\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"parent\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"hash\",\"type\":\"bytes32\"},{\"internalType\":\"uint8\",\"name\":\"docType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"key\",\"type\":\"string\"}],\"name\":\"Link\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"

// JourneyBin is the compiled bytecode used for deploying new contracts.
var JourneyBin = "0x608060405234801561001057600080fd5b506040516119df3803806119df8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550436004819055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550506118ab806101346000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638da5cb5b116100715780638da5cb5b1461024a578063ba377a261461027e578063d16e024e1461030e578063d63a8e11146103a8578063e445604914610402578063f849f379146104d4576100a9565b80633cb81256146100ae57806341c0e1b514610158578063421b2d8b146101625780636f569c89146101a657806373fc84201461022c575b600080fd5b6100dd600480360360208110156100c457600080fd5b81019080803560ff169060200190929190505050610518565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011d578082015181840152602081019050610102565b50505050905090810190601f16801561014a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101606105c8565b005b6101a46004803603602081101561017857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610685565b005b61022a600480360360408110156101bc57600080fd5b81019080803560ff169060200190929190803590602001906401000000008111156101e657600080fd5b8201836020820111156101f857600080fd5b8035906020019184600183028401116401000000008311171561021a57600080fd5b909192939192939050505061079f565b005b6102346109d6565b6040518082815260200191505060405180910390f35b6102526109dc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61030c6004803603606081101561029457600080fd5b8101908080359060200190929190803560ff169060200190929190803590602001906401000000008111156102c857600080fd5b8201836020820111156102da57600080fd5b803590602001918460018302840111640100000000831117156102fc57600080fd5b9091929391929390505050610a00565b005b6103a66004803603608081101561032457600080fd5b810190808035906020019092919080359060200190929190803560ff1690602001909291908035906020019064010000000081111561036257600080fd5b82018360208201111561037457600080fd5b8035906020019184600183028401116401000000008311171561039657600080fd5b909192939192939050505061100c565b005b6103ea600480360360208110156103be57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611602565b60405180821515815260200191505060405180910390f35b6104bb6004803603602081101561041857600080fd5b810190808035906020019064010000000081111561043557600080fd5b82018360208201111561044757600080fd5b8035906020019184600183028401116401000000008311171561046957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611622565b604051808260ff16815260200191505060405180910390f35b610516600480360360208110156104ea57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611658565b005b60056020528060005260406000206000915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105c05780601f10610595576101008083540402835291602001916105c0565b820191906000526020600020905b8154815290600101906020018083116105a357829003601f168201915b505050505081565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461066c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602881526020018061184e6028913960400191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16ff5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610744576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661085e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000600560008560ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905014610901576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f646f63756d656e7420616c72656164792072656769737465726564000000000081525060200191505060405180910390fd5b8181600560008660ff1660ff1681526020019081526020016000209190610929929190611769565b508260068383604051808383808284378083019250505092505050908152602001604051809103902060006101000a81548160ff021916908360ff1602179055508260ff167f897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8838360405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a2505050565b60045481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610abf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b83336000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b81526004018082815260200191505060006040518083038186803b158015610b3657600080fd5b505afa158015610b4a573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060a0811015610b7457600080fd5b8101908080519060200190929190805190602001909291908051906020019092919080516040519392919084640100000000821115610bb257600080fd5b83820191506020820185811115610bc857600080fd5b8251866001820283011164010000000082111715610be557600080fd5b8083526020830192505050908051906020019080838360005b83811015610c19578082015181840152602081019050610bfe565b50505050905090810190601f168015610c465780820380516001836020036101000a031916815260200191505b50604052602001805190602001909291905050509091929350909150905050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610d0a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b866000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed5decd6836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610d8057600080fd5b505afa158015610d94573d6000803e3d6000fd5b505050506040513d6020811015610daa57600080fd5b8101908080519060200190929190505050905060008114610e33576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f6173736574206d61726b656420666f72207472616e736665720000000000000081525060200191505060405180910390fd5b876000600560008360ff1660ff16815260200190815260200160002080546001816001161561010002031660029004905011610ed7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b600360008b815260200190815260200160002060009054906101000a900460ff1615610f4e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806118076025913960400191505060405180910390fd5b6001600360008c815260200190815260200160002060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff168a7f955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db8b8b8b604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a350505050505050505050565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166110cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b83336000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639fda5b66846040518263ffffffff1660e01b81526004018082815260200191505060006040518083038186803b15801561114257600080fd5b505afa158015611156573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060a081101561118057600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805160405193929190846401000000008211156111be57600080fd5b838201915060208201858111156111d457600080fd5b82518660018202830111640100000000821117156111f157600080fd5b8083526020830192505050908051906020019080838360005b8381101561122557808201518184015260208101905061120a565b50505050905090810190601f1680156112525780820380516001836020036101000a031916815260200191505b50604052602001805190602001909291905050509091929350909150905050809150508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611316576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6173736574206e6f74206f776e6564000000000000000000000000000000000081525060200191505060405180910390fd5b866000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed5decd6836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561138c57600080fd5b505afa1580156113a0573d6000803e3d6000fd5b505050506040513d60208110156113b657600080fd5b810190808051906020019092919050505090506000811461143f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f6173736574206d61726b656420666f72207472616e736665720000000000000081525060200191505060405180910390fd5b876000600560008360ff1660ff168152602001908152602001600020805460018160011615610100020316600290049050116114e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f756e6b6e6f776e20646f63756d656e740000000000000000000000000000000081525060200191505060405180910390fd5b600360008c815260200190815260200160002060009054906101000a900460ff16611559576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061182c6022913960400191505060405180910390fd5b6001600360008c815260200190815260200160002060006101000a81548160ff021916908315150217905550898b7f6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c8b8b8b604051808460ff168152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060405180910390a35050505050505050505050565b60026020528060005260406000206000915054906101000a900460ff1681565b6006818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611717576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f6e6f7420616c6c6f77656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff021916905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106117aa57803560ff19168380011785556117d8565b828001600101855582156117d8579182015b828111156117d75782358255916020019190600101906117bc565b5b5090506117e591906117e9565b5090565b5b808211156118025760008160009055506001016117ea565b509056fe617373657420616c72656164792070617274206f6620616e6f74686572206a6f75726e6579706172656e742068617368206973206e6f742070617274206f66206a6f75726e6579636f6e74726163742063616e206f6e6c792062652064656c65746520627920746865206f776e6572a26469706673582212200504586f044f621b6a738de9308d0bf9dc484108a0bfbb2be4dbe60b5033827f64736f6c634300060c0033"

// DeployJourney deploys a new Ethereum contract, binding an instance of Journey to it.
func DeployJourney(auth *bind.TransactOpts, backend bind.ContractBackend, notaryAddress common.Address) (common.Address, *types.Transaction, *Journey, error) {
	parsed, err := abi.JSON(strings.NewReader(JourneyABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}

	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(JourneyBin), backend, notaryAddress)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Journey{JourneyCaller: JourneyCaller{contract: contract}, JourneyTransactor: JourneyTransactor{contract: contract}, JourneyFilterer: JourneyFilterer{contract: contract}}, nil
}

// Journey is an auto generated Go binding around an Ethereum contract.
type Journey struct {
	JourneyCaller     // Read-only binding to the contract
	JourneyTransactor // Write-only binding to the contract
	JourneyFilterer   // Log filterer for contract events
}

// JourneyCaller is an auto generated read-only Go binding around an Ethereum contract.
type JourneyCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JourneyTransactor is an auto generated write-only Go binding around an Ethereum contract.
type JourneyTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JourneyFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type JourneyFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// JourneySession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type JourneySession struct {
	Contract     *Journey          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// JourneyCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type JourneyCallerSession struct {
	Contract *JourneyCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// JourneyTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type JourneyTransactorSession struct {
	Contract     *JourneyTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// JourneyRaw is an auto generated low-level Go binding around an Ethereum contract.
type JourneyRaw struct {
	Contract *Journey // Generic contract binding to access the raw methods on
}

// JourneyCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type JourneyCallerRaw struct {
	Contract *JourneyCaller // Generic read-only contract binding to access the raw methods on
}

// JourneyTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type JourneyTransactorRaw struct {
	Contract *JourneyTransactor // Generic write-only contract binding to access the raw methods on
}

// NewJourney creates a new instance of Journey, bound to a specific deployed contract.
func NewJourney(address common.Address, backend bind.ContractBackend) (*Journey, error) {
	contract, err := bindJourney(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Journey{JourneyCaller: JourneyCaller{contract: contract}, JourneyTransactor: JourneyTransactor{contract: contract}, JourneyFilterer: JourneyFilterer{contract: contract}}, nil
}

// NewJourneyCaller creates a new read-only instance of Journey, bound to a specific deployed contract.
func NewJourneyCaller(address common.Address, caller bind.ContractCaller) (*JourneyCaller, error) {
	contract, err := bindJourney(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &JourneyCaller{contract: contract}, nil
}

// NewJourneyTransactor creates a new write-only instance of Journey, bound to a specific deployed contract.
func NewJourneyTransactor(address common.Address, transactor bind.ContractTransactor) (*JourneyTransactor, error) {
	contract, err := bindJourney(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &JourneyTransactor{contract: contract}, nil
}

// NewJourneyFilterer creates a new log filterer instance of Journey, bound to a specific deployed contract.
func NewJourneyFilterer(address common.Address, filterer bind.ContractFilterer) (*JourneyFilterer, error) {
	contract, err := bindJourney(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &JourneyFilterer{contract: contract}, nil
}

// bindJourney binds a generic wrapper to an already deployed contract.
func bindJourney(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(JourneyABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Journey *JourneyRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Journey.Contract.JourneyCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Journey *JourneyRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Journey.Contract.JourneyTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Journey *JourneyRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Journey.Contract.JourneyTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Journey *JourneyCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Journey.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Journey *JourneyTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Journey.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Journey *JourneyTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Journey.Contract.contract.Transact(opts, method, params...)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Journey *JourneyCaller) Allowed(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _Journey.contract.Call(opts, &out, "allowed", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Journey *JourneySession) Allowed(arg0 common.Address) (bool, error) {
	return _Journey.Contract.Allowed(&_Journey.CallOpts, arg0)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Journey *JourneyCallerSession) Allowed(arg0 common.Address) (bool, error) {
	return _Journey.Contract.Allowed(&_Journey.CallOpts, arg0)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Journey *JourneyCaller) DeployedOn(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Journey.contract.Call(opts, &out, "deployedOn")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Journey *JourneySession) DeployedOn() (*big.Int, error) {
	return _Journey.Contract.DeployedOn(&_Journey.CallOpts)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Journey *JourneyCallerSession) DeployedOn() (*big.Int, error) {
	return _Journey.Contract.DeployedOn(&_Journey.CallOpts)
}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_Journey *JourneyCaller) DocumentDescriptionMapping(opts *bind.CallOpts, arg0 string) (uint8, error) {
	var out []interface{}
	err := _Journey.contract.Call(opts, &out, "documentDescriptionMapping", arg0)

	if err != nil {
		return *new(uint8), err
	}

	out0 := *abi.ConvertType(out[0], new(uint8)).(*uint8)

	return out0, err

}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_Journey *JourneySession) DocumentDescriptionMapping(arg0 string) (uint8, error) {
	return _Journey.Contract.DocumentDescriptionMapping(&_Journey.CallOpts, arg0)
}

// DocumentDescriptionMapping is a free data retrieval call binding the contract method 0xe4456049.
//
// Solidity: function documentDescriptionMapping(string ) view returns(uint8)
func (_Journey *JourneyCallerSession) DocumentDescriptionMapping(arg0 string) (uint8, error) {
	return _Journey.Contract.DocumentDescriptionMapping(&_Journey.CallOpts, arg0)
}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_Journey *JourneyCaller) Documents(opts *bind.CallOpts, arg0 uint8) (string, error) {
	var out []interface{}
	err := _Journey.contract.Call(opts, &out, "documents", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_Journey *JourneySession) Documents(arg0 uint8) (string, error) {
	return _Journey.Contract.Documents(&_Journey.CallOpts, arg0)
}

// Documents is a free data retrieval call binding the contract method 0x3cb81256.
//
// Solidity: function documents(uint8 ) view returns(string)
func (_Journey *JourneyCallerSession) Documents(arg0 uint8) (string, error) {
	return _Journey.Contract.Documents(&_Journey.CallOpts, arg0)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Journey *JourneyCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Journey.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Journey *JourneySession) Owner() (common.Address, error) {
	return _Journey.Contract.Owner(&_Journey.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Journey *JourneyCallerSession) Owner() (common.Address, error) {
	return _Journey.Contract.Owner(&_Journey.CallOpts)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneyTransactor) Link(opts *bind.TransactOpts, parent [32]byte, hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "Link", parent, hash, docType, key)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneySession) Link(parent [32]byte, hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.Contract.Link(&_Journey.TransactOpts, parent, hash, docType, key)
}

// Link is a paid mutator transaction binding the contract method 0xd16e024e.
//
// Solidity: function Link(bytes32 parent, bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneyTransactorSession) Link(parent [32]byte, hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.Contract.Link(&_Journey.TransactOpts, parent, hash, docType, key)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_Journey *JourneyTransactor) RegisterDocument(opts *bind.TransactOpts, docType uint8, description string) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "RegisterDocument", docType, description)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_Journey *JourneySession) RegisterDocument(docType uint8, description string) (*types.Transaction, error) {
	return _Journey.Contract.RegisterDocument(&_Journey.TransactOpts, docType, description)
}

// RegisterDocument is a paid mutator transaction binding the contract method 0x6f569c89.
//
// Solidity: function RegisterDocument(uint8 docType, string description) returns()
func (_Journey *JourneyTransactorSession) RegisterDocument(docType uint8, description string) (*types.Transaction, error) {
	return _Journey.Contract.RegisterDocument(&_Journey.TransactOpts, docType, description)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneyTransactor) Start(opts *bind.TransactOpts, hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "Start", hash, docType, key)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneySession) Start(hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.Contract.Start(&_Journey.TransactOpts, hash, docType, key)
}

// Start is a paid mutator transaction binding the contract method 0xba377a26.
//
// Solidity: function Start(bytes32 hash, uint8 docType, string key) returns()
func (_Journey *JourneyTransactorSession) Start(hash [32]byte, docType uint8, key string) (*types.Transaction, error) {
	return _Journey.Contract.Start(&_Journey.TransactOpts, hash, docType, key)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_Journey *JourneyTransactor) AddUser(opts *bind.TransactOpts, user common.Address) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "addUser", user)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_Journey *JourneySession) AddUser(user common.Address) (*types.Transaction, error) {
	return _Journey.Contract.AddUser(&_Journey.TransactOpts, user)
}

// AddUser is a paid mutator transaction binding the contract method 0x421b2d8b.
//
// Solidity: function addUser(address user) returns()
func (_Journey *JourneyTransactorSession) AddUser(user common.Address) (*types.Transaction, error) {
	return _Journey.Contract.AddUser(&_Journey.TransactOpts, user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_Journey *JourneyTransactor) DelUser(opts *bind.TransactOpts, user common.Address) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "delUser", user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_Journey *JourneySession) DelUser(user common.Address) (*types.Transaction, error) {
	return _Journey.Contract.DelUser(&_Journey.TransactOpts, user)
}

// DelUser is a paid mutator transaction binding the contract method 0xf849f379.
//
// Solidity: function delUser(address user) returns()
func (_Journey *JourneyTransactorSession) DelUser(user common.Address) (*types.Transaction, error) {
	return _Journey.Contract.DelUser(&_Journey.TransactOpts, user)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_Journey *JourneyTransactor) Kill(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Journey.contract.Transact(opts, "kill")
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_Journey *JourneySession) Kill() (*types.Transaction, error) {
	return _Journey.Contract.Kill(&_Journey.TransactOpts)
}

// Kill is a paid mutator transaction binding the contract method 0x41c0e1b5.
//
// Solidity: function kill() returns()
func (_Journey *JourneyTransactorSession) Kill() (*types.Transaction, error) {
	return _Journey.Contract.Kill(&_Journey.TransactOpts)
}

// JourneyAssetLinkedIterator is returned from FilterAssetLinked and is used to iterate over the raw logs and unpacked data for AssetLinked events raised by the Journey contract.
type JourneyAssetLinkedIterator struct {
	Event *JourneyAssetLinked // Event containing the contract specifics and raw log

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
func (it *JourneyAssetLinkedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JourneyAssetLinked)
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
		it.Event = new(JourneyAssetLinked)
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
func (it *JourneyAssetLinkedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JourneyAssetLinkedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JourneyAssetLinked represents a AssetLinked event raised by the Journey contract.
type JourneyAssetLinked struct {
	Parent [32]byte
	Hash   [32]byte
	Typ    uint8
	Key    string
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterAssetLinked is a free log retrieval operation binding the contract event 0x6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c.
//
// Solidity: event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key)
func (_Journey *JourneyFilterer) FilterAssetLinked(opts *bind.FilterOpts, parent [][32]byte, hash [][32]byte) (*JourneyAssetLinkedIterator, error) {

	var parentRule []interface{}
	for _, parentItem := range parent {
		parentRule = append(parentRule, parentItem)
	}
	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _Journey.contract.FilterLogs(opts, "AssetLinked", parentRule, hashRule)
	if err != nil {
		return nil, err
	}
	return &JourneyAssetLinkedIterator{contract: _Journey.contract, event: "AssetLinked", logs: logs, sub: sub}, nil
}

// WatchAssetLinked is a free log subscription operation binding the contract event 0x6f7f2cbbfe35924aacc98903ecaca5d09f1a3a29ba52182e6c5221b181c8b01c.
//
// Solidity: event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key)
func (_Journey *JourneyFilterer) WatchAssetLinked(opts *bind.WatchOpts, sink chan<- *JourneyAssetLinked, parent [][32]byte, hash [][32]byte) (event.Subscription, error) {

	var parentRule []interface{}
	for _, parentItem := range parent {
		parentRule = append(parentRule, parentItem)
	}
	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	logs, sub, err := _Journey.contract.WatchLogs(opts, "AssetLinked", parentRule, hashRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JourneyAssetLinked)
				if err := _Journey.contract.UnpackLog(event, "AssetLinked", log); err != nil {
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
func (_Journey *JourneyFilterer) ParseAssetLinked(log types.Log) (*JourneyAssetLinked, error) {
	event := new(JourneyAssetLinked)
	if err := _Journey.contract.UnpackLog(event, "AssetLinked", log); err != nil {
		return nil, err
	}
	return event, nil
}

// JourneyDocumentTypeRegisteredIterator is returned from FilterDocumentTypeRegistered and is used to iterate over the raw logs and unpacked data for DocumentTypeRegistered events raised by the Journey contract.
type JourneyDocumentTypeRegisteredIterator struct {
	Event *JourneyDocumentTypeRegistered // Event containing the contract specifics and raw log

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
func (it *JourneyDocumentTypeRegisteredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JourneyDocumentTypeRegistered)
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
		it.Event = new(JourneyDocumentTypeRegistered)
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
func (it *JourneyDocumentTypeRegisteredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JourneyDocumentTypeRegisteredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JourneyDocumentTypeRegistered represents a DocumentTypeRegistered event raised by the Journey contract.
type JourneyDocumentTypeRegistered struct {
	DocType     uint8
	Description string
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterDocumentTypeRegistered is a free log retrieval operation binding the contract event 0x897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8.
//
// Solidity: event DocumentTypeRegistered(uint8 indexed docType, string description)
func (_Journey *JourneyFilterer) FilterDocumentTypeRegistered(opts *bind.FilterOpts, docType []uint8) (*JourneyDocumentTypeRegisteredIterator, error) {

	var docTypeRule []interface{}
	for _, docTypeItem := range docType {
		docTypeRule = append(docTypeRule, docTypeItem)
	}

	logs, sub, err := _Journey.contract.FilterLogs(opts, "DocumentTypeRegistered", docTypeRule)
	if err != nil {
		return nil, err
	}
	return &JourneyDocumentTypeRegisteredIterator{contract: _Journey.contract, event: "DocumentTypeRegistered", logs: logs, sub: sub}, nil
}

// WatchDocumentTypeRegistered is a free log subscription operation binding the contract event 0x897bb2e273cae150ae911da7829cafd4657faedb046aef9fb209d4aec3349fb8.
//
// Solidity: event DocumentTypeRegistered(uint8 indexed docType, string description)
func (_Journey *JourneyFilterer) WatchDocumentTypeRegistered(opts *bind.WatchOpts, sink chan<- *JourneyDocumentTypeRegistered, docType []uint8) (event.Subscription, error) {

	var docTypeRule []interface{}
	for _, docTypeItem := range docType {
		docTypeRule = append(docTypeRule, docTypeItem)
	}

	logs, sub, err := _Journey.contract.WatchLogs(opts, "DocumentTypeRegistered", docTypeRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JourneyDocumentTypeRegistered)
				if err := _Journey.contract.UnpackLog(event, "DocumentTypeRegistered", log); err != nil {
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
func (_Journey *JourneyFilterer) ParseDocumentTypeRegistered(log types.Log) (*JourneyDocumentTypeRegistered, error) {
	event := new(JourneyDocumentTypeRegistered)
	if err := _Journey.contract.UnpackLog(event, "DocumentTypeRegistered", log); err != nil {
		return nil, err
	}
	return event, nil
}

// JourneyJourneyStartIterator is returned from FilterJourneyStart and is used to iterate over the raw logs and unpacked data for JourneyStart events raised by the Journey contract.
type JourneyJourneyStartIterator struct {
	Event *JourneyJourneyStart // Event containing the contract specifics and raw log

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
func (it *JourneyJourneyStartIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(JourneyJourneyStart)
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
		it.Event = new(JourneyJourneyStart)
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
func (it *JourneyJourneyStartIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *JourneyJourneyStartIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// JourneyJourneyStart represents a JourneyStart event raised by the Journey contract.
type JourneyJourneyStart struct {
	Hash      [32]byte
	Typ       uint8
	Key       string
	Initiator common.Address
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterJourneyStart is a free log retrieval operation binding the contract event 0x955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db.
//
// Solidity: event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator)
func (_Journey *JourneyFilterer) FilterJourneyStart(opts *bind.FilterOpts, hash [][32]byte, initiator []common.Address) (*JourneyJourneyStartIterator, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	var initiatorRule []interface{}
	for _, initiatorItem := range initiator {
		initiatorRule = append(initiatorRule, initiatorItem)
	}

	logs, sub, err := _Journey.contract.FilterLogs(opts, "JourneyStart", hashRule, initiatorRule)
	if err != nil {
		return nil, err
	}
	return &JourneyJourneyStartIterator{contract: _Journey.contract, event: "JourneyStart", logs: logs, sub: sub}, nil
}

// WatchJourneyStart is a free log subscription operation binding the contract event 0x955de9d1da36fa142798faee4d3d3162c183e1bfe74cc06d3304c58e8771b1db.
//
// Solidity: event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator)
func (_Journey *JourneyFilterer) WatchJourneyStart(opts *bind.WatchOpts, sink chan<- *JourneyJourneyStart, hash [][32]byte, initiator []common.Address) (event.Subscription, error) {

	var hashRule []interface{}
	for _, hashItem := range hash {
		hashRule = append(hashRule, hashItem)
	}

	var initiatorRule []interface{}
	for _, initiatorItem := range initiator {
		initiatorRule = append(initiatorRule, initiatorItem)
	}

	logs, sub, err := _Journey.contract.WatchLogs(opts, "JourneyStart", hashRule, initiatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(JourneyJourneyStart)
				if err := _Journey.contract.UnpackLog(event, "JourneyStart", log); err != nil {
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
func (_Journey *JourneyFilterer) ParseJourneyStart(log types.Log) (*JourneyJourneyStart, error) {
	event := new(JourneyJourneyStart)
	if err := _Journey.contract.UnpackLog(event, "JourneyStart", log); err != nil {
		return nil, err
	}
	return event, nil
}
