// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package tradeCoin

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

// TradeCoinCompositionSalesDocuments is an auto generated low-level Go binding around an user-defined struct.
type TradeCoinCompositionSalesDocuments struct {
	DocHash  [][32]byte
	DocType  [][32]byte
	RootHash [32]byte
}

// TradeCoinCompositionSalesABI is the input ABI used to generate the binding from.
const TradeCoinCompositionSalesABI = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_tradeCoinComposition\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"functionCaller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"dochash\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"name\":\"CompleteSaleEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"functionCaller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"dochash\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"name\":\"FinishCommercialTxEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"functionCaller\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"payInFiat\",\"type\":\"bool\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"priceInWei\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"isPayed\",\"type\":\"bool\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"name\":\"InitiateCommercialTxEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"functionCaller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"dochash\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"name\":\"ReverseSaleEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"indexedDocHash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"paymentInWei\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"payInFiat\",\"type\":\"bool\"}],\"name\":\"ServicePaymentEvent\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"pendingSales\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"priceInWei\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"payInFiat\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"isPayed\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"tradeCoinComposition\",\"outputs\":[{\"internalType\":\"contractTradeCoinCompositionContract\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"tradeCoinTokenBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"weiBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tradeCoinCompositionTokenID\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_priceInWei\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_newOwner\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"internalType\":\"structTradeCoinCompositionSales.Documents\",\"name\":\"_documents\",\"type\":\"tuple\"},{\"internalType\":\"bool\",\"name\":\"_payInFiat\",\"type\":\"bool\"}],\"name\":\"initiateCommercialTx\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tradeCoinCompositionTokenID\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"internalType\":\"structTradeCoinCompositionSales.Documents\",\"name\":\"_documents\",\"type\":\"tuple\"}],\"name\":\"finishCommercialTx\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tradeCoinCompositionTokenID\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"internalType\":\"structTradeCoinCompositionSales.Documents\",\"name\":\"_documents\",\"type\":\"tuple\"}],\"name\":\"reverseSale\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tradeCoinCompositionTokenID\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_receiver\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_paymentInWei\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"_payInFiat\",\"type\":\"bool\"},{\"components\":[{\"internalType\":\"bytes32[]\",\"name\":\"docHash\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"docType\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32\",\"name\":\"rootHash\",\"type\":\"bytes32\"}],\"internalType\":\"structTradeCoinCompositionSales.Documents\",\"name\":\"_documents\",\"type\":\"tuple\"}],\"name\":\"servicePayment\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"}]"

// TradeCoinCompositionSalesBin is the compiled bytecode used for deploying new contracts.
var TradeCoinCompositionSalesBin = "0x608060405234801561001057600080fd5b50604051610fef380380610fef83398101604081905261002f91610059565b6001600081905580546001600160a01b0319166001600160a01b0392909216919091179055610087565b60006020828403121561006a578081fd5b81516001600160a01b0381168114610080578182fd5b9392505050565b610f59806100966000396000f3fe60806040526004361061007b5760003560e01c8063858be3121161004e578063858be312146100f157806390e6460a1461010757806397cfa59a14610199578063dfcd4fd2146101d157600080fd5b80631779a3b51461008057806327315cd6146100955780632969d202146100b55780636392130a146100de575b600080fd5b61009361008e366004610cd1565b6101f1565b005b3480156100a157600080fd5b506100936100b0366004610d16565b61030b565b3480156100c157600080fd5b506100cb60035481565b6040519081526020015b60405180910390f35b6100936100ec366004610c61565b610493565b3480156100fd57600080fd5b506100cb60025481565b34801561011357600080fd5b50610162610122366004610c49565b60046020526000908152604090208054600182015460028301546003909301546001600160a01b0392831693919092169160ff8082169161010090041685565b604080516001600160a01b03968716815295909416602086015292840191909152151560608301521515608082015260a0016100d5565b3480156101a557600080fd5b506001546101b9906001600160a01b031681565b6040516001600160a01b0390911681526020016100d5565b3480156101dd57600080fd5b506100936101ec366004610cd1565b610653565b60008281526004602052604090206003015460ff166102655760008281526004602052604090206002015434146102655760405162461bcd60e51b81526020600482015260136024820152724e6f742074686520726967687420707269636560681b60448201526064015b60405180910390fd5b600082815260046020526040812080546003918201805461ff00191661010017905581546001600160a01b03909116923492916102a3908490610ec8565b909155505081516020830151604080850151905133936001600160a01b0386169388937fa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba936102f493929190610dc0565b60405180910390a461030683836108e1565b505050565b6001546040516323b872dd60e01b8152336004820152306024820152604481018790526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561035d57600080fd5b505af1158015610371573d6000803e3d6000fd5b50506040805160a0810182523381526001600160a01b0387811660208084019182528385018b8152881515606086019081528c156080870190815260008f81526004909452968320955186549086166001600160a01b031991821617875593516001808801805492909716919095161790945551600280860191909155925160039094018054955115156101000261ff00199515159590951661ffff199096169590951793909317909355805492945092509061042f908490610ec8565b90915550508151602083015160408085015190516001600160a01b0387169333938a937f25a24a8ffa5eb313557301630c545600b7827f0fd5cda1f1964061bf7525b213936104849389938d93841593610df6565b60405180910390a45050505050565b600260005414156104b65760405162461bcd60e51b815260040161025c90610e91565b60026000556020810151518151511480156104e4575080515160021015806104e45750600281602001515111155b6105215760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c840d8cadccee8d60931b604482015260640161025c565b816105b9573483101580156105365750600083115b6105825760405162461bcd60e51b815260206004820152601760248201527f50726f6d6973656420746f2070617920696e2046696174000000000000000000604482015260640161025c565b6040516001600160a01b038516903480156108fc02916000818181858888f193505050501580156105b7573d6000803e3d6000fd5b505b336001600160a01b0316846001600160a01b0316867f259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76846000015160008151811061061457634e487b7160e01b600052603260045260246000fd5b60200260200101518560000151866020015187604001518a8a60405161063f96959493929190610e45565b60405180910390a450506001600055505050565b600260005414156106765760405162461bcd60e51b815260040161025c90610e91565b60026000908155828152600460205260409020546001600160a01b03163314806106b957506000828152600460205260409020600101546001600160a01b031633145b6107055760405162461bcd60e51b815260206004820152601b60248201527f4e6f74207468652073656c6c6572206f72206e6577206f776e65720000000000604482015260640161025c565b6001600260008282546107189190610ee0565b90915550506001546000838152600460208190526040918290205491516323b872dd60e01b815230918101919091526001600160a01b039182166024820152604481018590529116906323b872dd90606401600060405180830381600087803b15801561078457600080fd5b505af1158015610798573d6000803e3d6000fd5b505050600083815260046020526040902060030154610100900460ff16905080156107d3575060008281526004602052604090206002015415155b1561084f5760008281526004602052604081206002015460038054919290916107fd908490610ee0565b9091555050600082815260046020526040808220805460029091015491516001600160a01b039091169282156108fc02929190818181858888f1935050505015801561084d573d6000803e3d6000fd5b505b600082815260046020908152604080832080546001600160a01b03199081168255600182018054909116905560028101939093556003909201805461ffff19169055825190830151838301519251339386937f4d191042b620967040163a37743d1879679b3ba4dcc1b21f9b9c5e671172507a936108d09391929091610dc0565b60405180910390a350506001600055565b600260005414156109045760405162461bcd60e51b815260040161025c90610e91565b6002600090815582815260046020526040902060030154610100900460ff1661095b5760405162461bcd60e51b8152602060048201526009602482015268139bdd081c185e595960ba1b604482015260640161025c565b6000828152600460205260408120600201546003805491929091610980908490610ee0565b9250508190555060016002600082825461099a9190610ee0565b9091555050600180546000848152600460208190526040918290209093015490516323b872dd60e01b815230938101939093526001600160a01b0390811660248401526044830185905216906323b872dd90606401600060405180830381600087803b158015610a0957600080fd5b505af1158015610a1d573d6000803e3d6000fd5b505050600083815260046020526040808220805460029091015491516001600160a01b03909116935081156108fc0292818181858888f19350505050158015610a6a573d6000803e3d6000fd5b50600082815260046020908152604080832080546001600160a01b03199081168255600182018054909116905560028101939093556003909201805461ffff19169055825190830151838301519251339386937f792df4c02d9599f70aef8e5ad7275f68d59867f01a2d63853c534e1bb63e81a7936108d09391929091610dc0565b80356001600160a01b0381168114610b0357600080fd5b919050565b600082601f830112610b18578081fd5b8135602067ffffffffffffffff80831115610b3557610b35610f0d565b8260051b604051601f19603f83011681018181108482111715610b5a57610b5a610f0d565b60405284815283810192508684018288018501891015610b78578687fd5b8692505b85831015610b9a578035845292840192600192909201918401610b7c565b50979650505050505050565b80358015158114610b0357600080fd5b600060608284031215610bc7578081fd5b6040516060810167ffffffffffffffff8282108183111715610beb57610beb610f0d565b816040528293508435915080821115610c0357600080fd5b610c0f86838701610b08565b83526020850135915080821115610c2557600080fd5b50610c3285828601610b08565b602083015250604083013560408201525092915050565b600060208284031215610c5a578081fd5b5035919050565b600080600080600060a08688031215610c78578081fd5b85359450610c8860208701610aec565b935060408601359250610c9d60608701610ba6565b9150608086013567ffffffffffffffff811115610cb8578182fd5b610cc488828901610bb6565b9150509295509295909350565b60008060408385031215610ce3578182fd5b82359150602083013567ffffffffffffffff811115610d00578182fd5b610d0c85828601610bb6565b9150509250929050565b600080600080600060a08688031215610d2d578081fd5b8535945060208601359350610d4460408701610aec565b9250606086013567ffffffffffffffff811115610d5f578182fd5b610d6b88828901610bb6565b925050610d7a60808701610ba6565b90509295509295909350565b6000815180845260208085019450808401835b83811015610db557815187529582019590820190600101610d99565b509495945050505050565b606081526000610dd36060830186610d86565b8281036020840152610de58186610d86565b915050826040830152949350505050565b8615158152856020820152841515604082015260c060608201526000610e1f60c0830186610d86565b8281036080840152610e318186610d86565b9150508260a0830152979650505050505050565b86815260c060208201526000610e5e60c0830188610d86565b8281036040840152610e708188610d86565b606084019690965250506080810192909252151560a0909101529392505050565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60008219821115610edb57610edb610ef7565b500190565b600082821015610ef257610ef2610ef7565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220e193b179111e9ebe76d46146e3de0bb61b2cb968f80b3f60251a281bc776dde464736f6c63430008040033"

// DeployTradeCoinCompositionSales deploys a new Ethereum contract, binding an instance of TradeCoinCompositionSales to it.
func DeployTradeCoinCompositionSales(auth *bind.TransactOpts, backend bind.ContractBackend, _tradeCoinComposition common.Address) (common.Address, *types.Transaction, *TradeCoinCompositionSales, error) {
	parsed, err := abi.JSON(strings.NewReader(TradeCoinCompositionSalesABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}

	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(TradeCoinCompositionSalesBin), backend, _tradeCoinComposition)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &TradeCoinCompositionSales{TradeCoinCompositionSalesCaller: TradeCoinCompositionSalesCaller{contract: contract}, TradeCoinCompositionSalesTransactor: TradeCoinCompositionSalesTransactor{contract: contract}, TradeCoinCompositionSalesFilterer: TradeCoinCompositionSalesFilterer{contract: contract}}, nil
}

// TradeCoinCompositionSales is an auto generated Go binding around an Ethereum contract.
type TradeCoinCompositionSales struct {
	TradeCoinCompositionSalesCaller     // Read-only binding to the contract
	TradeCoinCompositionSalesTransactor // Write-only binding to the contract
	TradeCoinCompositionSalesFilterer   // Log filterer for contract events
}

// TradeCoinCompositionSalesCaller is an auto generated read-only Go binding around an Ethereum contract.
type TradeCoinCompositionSalesCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TradeCoinCompositionSalesTransactor is an auto generated write-only Go binding around an Ethereum contract.
type TradeCoinCompositionSalesTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TradeCoinCompositionSalesFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type TradeCoinCompositionSalesFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TradeCoinCompositionSalesSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type TradeCoinCompositionSalesSession struct {
	Contract     *TradeCoinCompositionSales // Generic contract binding to set the session for
	CallOpts     bind.CallOpts              // Call options to use throughout this session
	TransactOpts bind.TransactOpts          // Transaction auth options to use throughout this session
}

// TradeCoinCompositionSalesCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type TradeCoinCompositionSalesCallerSession struct {
	Contract *TradeCoinCompositionSalesCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts                    // Call options to use throughout this session
}

// TradeCoinCompositionSalesTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type TradeCoinCompositionSalesTransactorSession struct {
	Contract     *TradeCoinCompositionSalesTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts                    // Transaction auth options to use throughout this session
}

// TradeCoinCompositionSalesRaw is an auto generated low-level Go binding around an Ethereum contract.
type TradeCoinCompositionSalesRaw struct {
	Contract *TradeCoinCompositionSales // Generic contract binding to access the raw methods on
}

// TradeCoinCompositionSalesCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type TradeCoinCompositionSalesCallerRaw struct {
	Contract *TradeCoinCompositionSalesCaller // Generic read-only contract binding to access the raw methods on
}

// TradeCoinCompositionSalesTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type TradeCoinCompositionSalesTransactorRaw struct {
	Contract *TradeCoinCompositionSalesTransactor // Generic write-only contract binding to access the raw methods on
}

// NewTradeCoinCompositionSales creates a new instance of TradeCoinCompositionSales, bound to a specific deployed contract.
func NewTradeCoinCompositionSales(address common.Address, backend bind.ContractBackend) (*TradeCoinCompositionSales, error) {
	contract, err := bindTradeCoinCompositionSales(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSales{TradeCoinCompositionSalesCaller: TradeCoinCompositionSalesCaller{contract: contract}, TradeCoinCompositionSalesTransactor: TradeCoinCompositionSalesTransactor{contract: contract}, TradeCoinCompositionSalesFilterer: TradeCoinCompositionSalesFilterer{contract: contract}}, nil
}

// NewTradeCoinCompositionSalesCaller creates a new read-only instance of TradeCoinCompositionSales, bound to a specific deployed contract.
func NewTradeCoinCompositionSalesCaller(address common.Address, caller bind.ContractCaller) (*TradeCoinCompositionSalesCaller, error) {
	contract, err := bindTradeCoinCompositionSales(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesCaller{contract: contract}, nil
}

// NewTradeCoinCompositionSalesTransactor creates a new write-only instance of TradeCoinCompositionSales, bound to a specific deployed contract.
func NewTradeCoinCompositionSalesTransactor(address common.Address, transactor bind.ContractTransactor) (*TradeCoinCompositionSalesTransactor, error) {
	contract, err := bindTradeCoinCompositionSales(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesTransactor{contract: contract}, nil
}

// NewTradeCoinCompositionSalesFilterer creates a new log filterer instance of TradeCoinCompositionSales, bound to a specific deployed contract.
func NewTradeCoinCompositionSalesFilterer(address common.Address, filterer bind.ContractFilterer) (*TradeCoinCompositionSalesFilterer, error) {
	contract, err := bindTradeCoinCompositionSales(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesFilterer{contract: contract}, nil
}

// bindTradeCoinCompositionSales binds a generic wrapper to an already deployed contract.
func bindTradeCoinCompositionSales(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(TradeCoinCompositionSalesABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _TradeCoinCompositionSales.Contract.TradeCoinCompositionSalesCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinCompositionSalesTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinCompositionSalesTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _TradeCoinCompositionSales.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.contract.Transact(opts, method, params...)
}

// PendingSales is a free data retrieval call binding the contract method 0x90e6460a.
//
// Solidity: function pendingSales(uint256 ) view returns(address seller, address newOwner, uint256 priceInWei, bool payInFiat, bool isPayed)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCaller) PendingSales(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Seller     common.Address
	NewOwner   common.Address
	PriceInWei *big.Int
	PayInFiat  bool
	IsPayed    bool
}, error) {
	var out []interface{}
	err := _TradeCoinCompositionSales.contract.Call(opts, &out, "pendingSales", arg0)

	outstruct := new(struct {
		Seller     common.Address
		NewOwner   common.Address
		PriceInWei *big.Int
		PayInFiat  bool
		IsPayed    bool
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Seller = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.NewOwner = *abi.ConvertType(out[1], new(common.Address)).(*common.Address)
	outstruct.PriceInWei = *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)
	outstruct.PayInFiat = *abi.ConvertType(out[3], new(bool)).(*bool)
	outstruct.IsPayed = *abi.ConvertType(out[4], new(bool)).(*bool)

	return *outstruct, err

}

// PendingSales is a free data retrieval call binding the contract method 0x90e6460a.
//
// Solidity: function pendingSales(uint256 ) view returns(address seller, address newOwner, uint256 priceInWei, bool payInFiat, bool isPayed)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) PendingSales(arg0 *big.Int) (struct {
	Seller     common.Address
	NewOwner   common.Address
	PriceInWei *big.Int
	PayInFiat  bool
	IsPayed    bool
}, error) {
	return _TradeCoinCompositionSales.Contract.PendingSales(&_TradeCoinCompositionSales.CallOpts, arg0)
}

// PendingSales is a free data retrieval call binding the contract method 0x90e6460a.
//
// Solidity: function pendingSales(uint256 ) view returns(address seller, address newOwner, uint256 priceInWei, bool payInFiat, bool isPayed)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCallerSession) PendingSales(arg0 *big.Int) (struct {
	Seller     common.Address
	NewOwner   common.Address
	PriceInWei *big.Int
	PayInFiat  bool
	IsPayed    bool
}, error) {
	return _TradeCoinCompositionSales.Contract.PendingSales(&_TradeCoinCompositionSales.CallOpts, arg0)
}

// TradeCoinComposition is a free data retrieval call binding the contract method 0x97cfa59a.
//
// Solidity: function tradeCoinComposition() view returns(address)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCaller) TradeCoinComposition(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _TradeCoinCompositionSales.contract.Call(opts, &out, "tradeCoinComposition")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// TradeCoinComposition is a free data retrieval call binding the contract method 0x97cfa59a.
//
// Solidity: function tradeCoinComposition() view returns(address)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) TradeCoinComposition() (common.Address, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinComposition(&_TradeCoinCompositionSales.CallOpts)
}

// TradeCoinComposition is a free data retrieval call binding the contract method 0x97cfa59a.
//
// Solidity: function tradeCoinComposition() view returns(address)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCallerSession) TradeCoinComposition() (common.Address, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinComposition(&_TradeCoinCompositionSales.CallOpts)
}

// TradeCoinTokenBalance is a free data retrieval call binding the contract method 0x858be312.
//
// Solidity: function tradeCoinTokenBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCaller) TradeCoinTokenBalance(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _TradeCoinCompositionSales.contract.Call(opts, &out, "tradeCoinTokenBalance")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TradeCoinTokenBalance is a free data retrieval call binding the contract method 0x858be312.
//
// Solidity: function tradeCoinTokenBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) TradeCoinTokenBalance() (*big.Int, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinTokenBalance(&_TradeCoinCompositionSales.CallOpts)
}

// TradeCoinTokenBalance is a free data retrieval call binding the contract method 0x858be312.
//
// Solidity: function tradeCoinTokenBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCallerSession) TradeCoinTokenBalance() (*big.Int, error) {
	return _TradeCoinCompositionSales.Contract.TradeCoinTokenBalance(&_TradeCoinCompositionSales.CallOpts)
}

// WeiBalance is a free data retrieval call binding the contract method 0x2969d202.
//
// Solidity: function weiBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCaller) WeiBalance(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _TradeCoinCompositionSales.contract.Call(opts, &out, "weiBalance")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// WeiBalance is a free data retrieval call binding the contract method 0x2969d202.
//
// Solidity: function weiBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) WeiBalance() (*big.Int, error) {
	return _TradeCoinCompositionSales.Contract.WeiBalance(&_TradeCoinCompositionSales.CallOpts)
}

// WeiBalance is a free data retrieval call binding the contract method 0x2969d202.
//
// Solidity: function weiBalance() view returns(uint256)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesCallerSession) WeiBalance() (*big.Int, error) {
	return _TradeCoinCompositionSales.Contract.WeiBalance(&_TradeCoinCompositionSales.CallOpts)
}

// FinishCommercialTx is a paid mutator transaction binding the contract method 0x1779a3b5.
//
// Solidity: function finishCommercialTx(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactor) FinishCommercialTx(opts *bind.TransactOpts, _tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.contract.Transact(opts, "finishCommercialTx", _tradeCoinCompositionTokenID, _documents)
}

// FinishCommercialTx is a paid mutator transaction binding the contract method 0x1779a3b5.
//
// Solidity: function finishCommercialTx(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) FinishCommercialTx(_tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.FinishCommercialTx(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _documents)
}

// FinishCommercialTx is a paid mutator transaction binding the contract method 0x1779a3b5.
//
// Solidity: function finishCommercialTx(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorSession) FinishCommercialTx(_tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.FinishCommercialTx(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _documents)
}

// InitiateCommercialTx is a paid mutator transaction binding the contract method 0x27315cd6.
//
// Solidity: function initiateCommercialTx(uint256 _tradeCoinCompositionTokenID, uint256 _priceInWei, address _newOwner, (bytes32[],bytes32[],bytes32) _documents, bool _payInFiat) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactor) InitiateCommercialTx(opts *bind.TransactOpts, _tradeCoinCompositionTokenID *big.Int, _priceInWei *big.Int, _newOwner common.Address, _documents TradeCoinCompositionSalesDocuments, _payInFiat bool) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.contract.Transact(opts, "initiateCommercialTx", _tradeCoinCompositionTokenID, _priceInWei, _newOwner, _documents, _payInFiat)
}

// InitiateCommercialTx is a paid mutator transaction binding the contract method 0x27315cd6.
//
// Solidity: function initiateCommercialTx(uint256 _tradeCoinCompositionTokenID, uint256 _priceInWei, address _newOwner, (bytes32[],bytes32[],bytes32) _documents, bool _payInFiat) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) InitiateCommercialTx(_tradeCoinCompositionTokenID *big.Int, _priceInWei *big.Int, _newOwner common.Address, _documents TradeCoinCompositionSalesDocuments, _payInFiat bool) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.InitiateCommercialTx(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _priceInWei, _newOwner, _documents, _payInFiat)
}

// InitiateCommercialTx is a paid mutator transaction binding the contract method 0x27315cd6.
//
// Solidity: function initiateCommercialTx(uint256 _tradeCoinCompositionTokenID, uint256 _priceInWei, address _newOwner, (bytes32[],bytes32[],bytes32) _documents, bool _payInFiat) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorSession) InitiateCommercialTx(_tradeCoinCompositionTokenID *big.Int, _priceInWei *big.Int, _newOwner common.Address, _documents TradeCoinCompositionSalesDocuments, _payInFiat bool) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.InitiateCommercialTx(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _priceInWei, _newOwner, _documents, _payInFiat)
}

// ReverseSale is a paid mutator transaction binding the contract method 0xdfcd4fd2.
//
// Solidity: function reverseSale(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactor) ReverseSale(opts *bind.TransactOpts, _tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.contract.Transact(opts, "reverseSale", _tradeCoinCompositionTokenID, _documents)
}

// ReverseSale is a paid mutator transaction binding the contract method 0xdfcd4fd2.
//
// Solidity: function reverseSale(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) ReverseSale(_tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.ReverseSale(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _documents)
}

// ReverseSale is a paid mutator transaction binding the contract method 0xdfcd4fd2.
//
// Solidity: function reverseSale(uint256 _tradeCoinCompositionTokenID, (bytes32[],bytes32[],bytes32) _documents) returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorSession) ReverseSale(_tradeCoinCompositionTokenID *big.Int, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.ReverseSale(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _documents)
}

// ServicePayment is a paid mutator transaction binding the contract method 0x6392130a.
//
// Solidity: function servicePayment(uint256 _tradeCoinCompositionTokenID, address _receiver, uint256 _paymentInWei, bool _payInFiat, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactor) ServicePayment(opts *bind.TransactOpts, _tradeCoinCompositionTokenID *big.Int, _receiver common.Address, _paymentInWei *big.Int, _payInFiat bool, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.contract.Transact(opts, "servicePayment", _tradeCoinCompositionTokenID, _receiver, _paymentInWei, _payInFiat, _documents)
}

// ServicePayment is a paid mutator transaction binding the contract method 0x6392130a.
//
// Solidity: function servicePayment(uint256 _tradeCoinCompositionTokenID, address _receiver, uint256 _paymentInWei, bool _payInFiat, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesSession) ServicePayment(_tradeCoinCompositionTokenID *big.Int, _receiver common.Address, _paymentInWei *big.Int, _payInFiat bool, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.ServicePayment(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _receiver, _paymentInWei, _payInFiat, _documents)
}

// ServicePayment is a paid mutator transaction binding the contract method 0x6392130a.
//
// Solidity: function servicePayment(uint256 _tradeCoinCompositionTokenID, address _receiver, uint256 _paymentInWei, bool _payInFiat, (bytes32[],bytes32[],bytes32) _documents) payable returns()
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesTransactorSession) ServicePayment(_tradeCoinCompositionTokenID *big.Int, _receiver common.Address, _paymentInWei *big.Int, _payInFiat bool, _documents TradeCoinCompositionSalesDocuments) (*types.Transaction, error) {
	return _TradeCoinCompositionSales.Contract.ServicePayment(&_TradeCoinCompositionSales.TransactOpts, _tradeCoinCompositionTokenID, _receiver, _paymentInWei, _payInFiat, _documents)
}

// TradeCoinCompositionSalesCompleteSaleEventIterator is returned from FilterCompleteSaleEvent and is used to iterate over the raw logs and unpacked data for CompleteSaleEvent events raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesCompleteSaleEventIterator struct {
	Event *TradeCoinCompositionSalesCompleteSaleEvent // Event containing the contract specifics and raw log

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
func (it *TradeCoinCompositionSalesCompleteSaleEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(TradeCoinCompositionSalesCompleteSaleEvent)
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
		it.Event = new(TradeCoinCompositionSalesCompleteSaleEvent)
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
func (it *TradeCoinCompositionSalesCompleteSaleEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *TradeCoinCompositionSalesCompleteSaleEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// TradeCoinCompositionSalesCompleteSaleEvent represents a CompleteSaleEvent event raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesCompleteSaleEvent struct {
	TokenId        *big.Int
	FunctionCaller common.Address
	Dochash        [][32]byte
	DocType        [][32]byte
	RootHash       [32]byte
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterCompleteSaleEvent is a free log retrieval operation binding the contract event 0x792df4c02d9599f70aef8e5ad7275f68d59867f01a2d63853c534e1bb63e81a7.
//
// Solidity: event CompleteSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) FilterCompleteSaleEvent(opts *bind.FilterOpts, tokenId []*big.Int, functionCaller []common.Address) (*TradeCoinCompositionSalesCompleteSaleEventIterator, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.FilterLogs(opts, "CompleteSaleEvent", tokenIdRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesCompleteSaleEventIterator{contract: _TradeCoinCompositionSales.contract, event: "CompleteSaleEvent", logs: logs, sub: sub}, nil
}

// WatchCompleteSaleEvent is a free log subscription operation binding the contract event 0x792df4c02d9599f70aef8e5ad7275f68d59867f01a2d63853c534e1bb63e81a7.
//
// Solidity: event CompleteSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) WatchCompleteSaleEvent(opts *bind.WatchOpts, sink chan<- *TradeCoinCompositionSalesCompleteSaleEvent, tokenId []*big.Int, functionCaller []common.Address) (event.Subscription, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.WatchLogs(opts, "CompleteSaleEvent", tokenIdRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(TradeCoinCompositionSalesCompleteSaleEvent)
				if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "CompleteSaleEvent", log); err != nil {
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

// ParseCompleteSaleEvent is a log parse operation binding the contract event 0x792df4c02d9599f70aef8e5ad7275f68d59867f01a2d63853c534e1bb63e81a7.
//
// Solidity: event CompleteSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) ParseCompleteSaleEvent(log types.Log) (*TradeCoinCompositionSalesCompleteSaleEvent, error) {
	event := new(TradeCoinCompositionSalesCompleteSaleEvent)
	if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "CompleteSaleEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// TradeCoinCompositionSalesFinishCommercialTxEventIterator is returned from FilterFinishCommercialTxEvent and is used to iterate over the raw logs and unpacked data for FinishCommercialTxEvent events raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesFinishCommercialTxEventIterator struct {
	Event *TradeCoinCompositionSalesFinishCommercialTxEvent // Event containing the contract specifics and raw log

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
func (it *TradeCoinCompositionSalesFinishCommercialTxEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(TradeCoinCompositionSalesFinishCommercialTxEvent)
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
		it.Event = new(TradeCoinCompositionSalesFinishCommercialTxEvent)
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
func (it *TradeCoinCompositionSalesFinishCommercialTxEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *TradeCoinCompositionSalesFinishCommercialTxEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// TradeCoinCompositionSalesFinishCommercialTxEvent represents a FinishCommercialTxEvent event raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesFinishCommercialTxEvent struct {
	TokenId        *big.Int
	Seller         common.Address
	FunctionCaller common.Address
	Dochash        [][32]byte
	DocType        [][32]byte
	RootHash       [32]byte
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterFinishCommercialTxEvent is a free log retrieval operation binding the contract event 0xa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba.
//
// Solidity: event FinishCommercialTxEvent(uint256 indexed tokenId, address indexed seller, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) FilterFinishCommercialTxEvent(opts *bind.FilterOpts, tokenId []*big.Int, seller []common.Address, functionCaller []common.Address) (*TradeCoinCompositionSalesFinishCommercialTxEventIterator, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.FilterLogs(opts, "FinishCommercialTxEvent", tokenIdRule, sellerRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesFinishCommercialTxEventIterator{contract: _TradeCoinCompositionSales.contract, event: "FinishCommercialTxEvent", logs: logs, sub: sub}, nil
}

// WatchFinishCommercialTxEvent is a free log subscription operation binding the contract event 0xa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba.
//
// Solidity: event FinishCommercialTxEvent(uint256 indexed tokenId, address indexed seller, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) WatchFinishCommercialTxEvent(opts *bind.WatchOpts, sink chan<- *TradeCoinCompositionSalesFinishCommercialTxEvent, tokenId []*big.Int, seller []common.Address, functionCaller []common.Address) (event.Subscription, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.WatchLogs(opts, "FinishCommercialTxEvent", tokenIdRule, sellerRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(TradeCoinCompositionSalesFinishCommercialTxEvent)
				if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "FinishCommercialTxEvent", log); err != nil {
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

// ParseFinishCommercialTxEvent is a log parse operation binding the contract event 0xa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba.
//
// Solidity: event FinishCommercialTxEvent(uint256 indexed tokenId, address indexed seller, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) ParseFinishCommercialTxEvent(log types.Log) (*TradeCoinCompositionSalesFinishCommercialTxEvent, error) {
	event := new(TradeCoinCompositionSalesFinishCommercialTxEvent)
	if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "FinishCommercialTxEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// TradeCoinCompositionSalesInitiateCommercialTxEventIterator is returned from FilterInitiateCommercialTxEvent and is used to iterate over the raw logs and unpacked data for InitiateCommercialTxEvent events raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesInitiateCommercialTxEventIterator struct {
	Event *TradeCoinCompositionSalesInitiateCommercialTxEvent // Event containing the contract specifics and raw log

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
func (it *TradeCoinCompositionSalesInitiateCommercialTxEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(TradeCoinCompositionSalesInitiateCommercialTxEvent)
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
		it.Event = new(TradeCoinCompositionSalesInitiateCommercialTxEvent)
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
func (it *TradeCoinCompositionSalesInitiateCommercialTxEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *TradeCoinCompositionSalesInitiateCommercialTxEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// TradeCoinCompositionSalesInitiateCommercialTxEvent represents a InitiateCommercialTxEvent event raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesInitiateCommercialTxEvent struct {
	TokenId        *big.Int
	FunctionCaller common.Address
	Buyer          common.Address
	PayInFiat      bool
	PriceInWei     *big.Int
	IsPayed        bool
	DocHash        [][32]byte
	DocType        [][32]byte
	RootHash       [32]byte
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterInitiateCommercialTxEvent is a free log retrieval operation binding the contract event 0x25a24a8ffa5eb313557301630c545600b7827f0fd5cda1f1964061bf7525b213.
//
// Solidity: event InitiateCommercialTxEvent(uint256 indexed tokenId, address indexed functionCaller, address indexed buyer, bool payInFiat, uint256 priceInWei, bool isPayed, bytes32[] docHash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) FilterInitiateCommercialTxEvent(opts *bind.FilterOpts, tokenId []*big.Int, functionCaller []common.Address, buyer []common.Address) (*TradeCoinCompositionSalesInitiateCommercialTxEventIterator, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}
	var buyerRule []interface{}
	for _, buyerItem := range buyer {
		buyerRule = append(buyerRule, buyerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.FilterLogs(opts, "InitiateCommercialTxEvent", tokenIdRule, functionCallerRule, buyerRule)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesInitiateCommercialTxEventIterator{contract: _TradeCoinCompositionSales.contract, event: "InitiateCommercialTxEvent", logs: logs, sub: sub}, nil
}

// WatchInitiateCommercialTxEvent is a free log subscription operation binding the contract event 0x25a24a8ffa5eb313557301630c545600b7827f0fd5cda1f1964061bf7525b213.
//
// Solidity: event InitiateCommercialTxEvent(uint256 indexed tokenId, address indexed functionCaller, address indexed buyer, bool payInFiat, uint256 priceInWei, bool isPayed, bytes32[] docHash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) WatchInitiateCommercialTxEvent(opts *bind.WatchOpts, sink chan<- *TradeCoinCompositionSalesInitiateCommercialTxEvent, tokenId []*big.Int, functionCaller []common.Address, buyer []common.Address) (event.Subscription, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}
	var buyerRule []interface{}
	for _, buyerItem := range buyer {
		buyerRule = append(buyerRule, buyerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.WatchLogs(opts, "InitiateCommercialTxEvent", tokenIdRule, functionCallerRule, buyerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(TradeCoinCompositionSalesInitiateCommercialTxEvent)
				if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "InitiateCommercialTxEvent", log); err != nil {
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

// ParseInitiateCommercialTxEvent is a log parse operation binding the contract event 0x25a24a8ffa5eb313557301630c545600b7827f0fd5cda1f1964061bf7525b213.
//
// Solidity: event InitiateCommercialTxEvent(uint256 indexed tokenId, address indexed functionCaller, address indexed buyer, bool payInFiat, uint256 priceInWei, bool isPayed, bytes32[] docHash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) ParseInitiateCommercialTxEvent(log types.Log) (*TradeCoinCompositionSalesInitiateCommercialTxEvent, error) {
	event := new(TradeCoinCompositionSalesInitiateCommercialTxEvent)
	if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "InitiateCommercialTxEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// TradeCoinCompositionSalesReverseSaleEventIterator is returned from FilterReverseSaleEvent and is used to iterate over the raw logs and unpacked data for ReverseSaleEvent events raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesReverseSaleEventIterator struct {
	Event *TradeCoinCompositionSalesReverseSaleEvent // Event containing the contract specifics and raw log

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
func (it *TradeCoinCompositionSalesReverseSaleEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(TradeCoinCompositionSalesReverseSaleEvent)
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
		it.Event = new(TradeCoinCompositionSalesReverseSaleEvent)
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
func (it *TradeCoinCompositionSalesReverseSaleEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *TradeCoinCompositionSalesReverseSaleEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// TradeCoinCompositionSalesReverseSaleEvent represents a ReverseSaleEvent event raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesReverseSaleEvent struct {
	TokenId        *big.Int
	FunctionCaller common.Address
	Dochash        [][32]byte
	DocType        [][32]byte
	RootHash       [32]byte
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterReverseSaleEvent is a free log retrieval operation binding the contract event 0x4d191042b620967040163a37743d1879679b3ba4dcc1b21f9b9c5e671172507a.
//
// Solidity: event ReverseSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) FilterReverseSaleEvent(opts *bind.FilterOpts, tokenId []*big.Int, functionCaller []common.Address) (*TradeCoinCompositionSalesReverseSaleEventIterator, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.FilterLogs(opts, "ReverseSaleEvent", tokenIdRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesReverseSaleEventIterator{contract: _TradeCoinCompositionSales.contract, event: "ReverseSaleEvent", logs: logs, sub: sub}, nil
}

// WatchReverseSaleEvent is a free log subscription operation binding the contract event 0x4d191042b620967040163a37743d1879679b3ba4dcc1b21f9b9c5e671172507a.
//
// Solidity: event ReverseSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) WatchReverseSaleEvent(opts *bind.WatchOpts, sink chan<- *TradeCoinCompositionSalesReverseSaleEvent, tokenId []*big.Int, functionCaller []common.Address) (event.Subscription, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var functionCallerRule []interface{}
	for _, functionCallerItem := range functionCaller {
		functionCallerRule = append(functionCallerRule, functionCallerItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.WatchLogs(opts, "ReverseSaleEvent", tokenIdRule, functionCallerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(TradeCoinCompositionSalesReverseSaleEvent)
				if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "ReverseSaleEvent", log); err != nil {
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

// ParseReverseSaleEvent is a log parse operation binding the contract event 0x4d191042b620967040163a37743d1879679b3ba4dcc1b21f9b9c5e671172507a.
//
// Solidity: event ReverseSaleEvent(uint256 indexed tokenId, address indexed functionCaller, bytes32[] dochash, bytes32[] docType, bytes32 rootHash)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) ParseReverseSaleEvent(log types.Log) (*TradeCoinCompositionSalesReverseSaleEvent, error) {
	event := new(TradeCoinCompositionSalesReverseSaleEvent)
	if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "ReverseSaleEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// TradeCoinCompositionSalesServicePaymentEventIterator is returned from FilterServicePaymentEvent and is used to iterate over the raw logs and unpacked data for ServicePaymentEvent events raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesServicePaymentEventIterator struct {
	Event *TradeCoinCompositionSalesServicePaymentEvent // Event containing the contract specifics and raw log

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
func (it *TradeCoinCompositionSalesServicePaymentEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(TradeCoinCompositionSalesServicePaymentEvent)
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
		it.Event = new(TradeCoinCompositionSalesServicePaymentEvent)
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
func (it *TradeCoinCompositionSalesServicePaymentEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *TradeCoinCompositionSalesServicePaymentEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// TradeCoinCompositionSalesServicePaymentEvent represents a ServicePaymentEvent event raised by the TradeCoinCompositionSales contract.
type TradeCoinCompositionSalesServicePaymentEvent struct {
	TokenId        *big.Int
	Receiver       common.Address
	Sender         common.Address
	IndexedDocHash [32]byte
	DocHash        [][32]byte
	DocType        [][32]byte
	RootHash       [32]byte
	PaymentInWei   *big.Int
	PayInFiat      bool
	Raw            types.Log // Blockchain specific contextual infos
}

// FilterServicePaymentEvent is a free log retrieval operation binding the contract event 0x259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76.
//
// Solidity: event ServicePaymentEvent(uint256 indexed tokenId, address indexed receiver, address indexed sender, bytes32 indexedDocHash, bytes32[] docHash, bytes32[] docType, bytes32 rootHash, uint256 paymentInWei, bool payInFiat)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) FilterServicePaymentEvent(opts *bind.FilterOpts, tokenId []*big.Int, receiver []common.Address, sender []common.Address) (*TradeCoinCompositionSalesServicePaymentEventIterator, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var receiverRule []interface{}
	for _, receiverItem := range receiver {
		receiverRule = append(receiverRule, receiverItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.FilterLogs(opts, "ServicePaymentEvent", tokenIdRule, receiverRule, senderRule)
	if err != nil {
		return nil, err
	}
	return &TradeCoinCompositionSalesServicePaymentEventIterator{contract: _TradeCoinCompositionSales.contract, event: "ServicePaymentEvent", logs: logs, sub: sub}, nil
}

// WatchServicePaymentEvent is a free log subscription operation binding the contract event 0x259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76.
//
// Solidity: event ServicePaymentEvent(uint256 indexed tokenId, address indexed receiver, address indexed sender, bytes32 indexedDocHash, bytes32[] docHash, bytes32[] docType, bytes32 rootHash, uint256 paymentInWei, bool payInFiat)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) WatchServicePaymentEvent(opts *bind.WatchOpts, sink chan<- *TradeCoinCompositionSalesServicePaymentEvent, tokenId []*big.Int, receiver []common.Address, sender []common.Address) (event.Subscription, error) {

	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}
	var receiverRule []interface{}
	for _, receiverItem := range receiver {
		receiverRule = append(receiverRule, receiverItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _TradeCoinCompositionSales.contract.WatchLogs(opts, "ServicePaymentEvent", tokenIdRule, receiverRule, senderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(TradeCoinCompositionSalesServicePaymentEvent)
				if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "ServicePaymentEvent", log); err != nil {
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

// ParseServicePaymentEvent is a log parse operation binding the contract event 0x259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76.
//
// Solidity: event ServicePaymentEvent(uint256 indexed tokenId, address indexed receiver, address indexed sender, bytes32 indexedDocHash, bytes32[] docHash, bytes32[] docType, bytes32 rootHash, uint256 paymentInWei, bool payInFiat)
func (_TradeCoinCompositionSales *TradeCoinCompositionSalesFilterer) ParseServicePaymentEvent(log types.Log) (*TradeCoinCompositionSalesServicePaymentEvent, error) {
	event := new(TradeCoinCompositionSalesServicePaymentEvent)
	if err := _TradeCoinCompositionSales.contract.UnpackLog(event, "ServicePaymentEvent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
