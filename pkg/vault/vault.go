// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package vault

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

// VaultABI is the input ABI used to generate the binding from.
const VaultABI = "[{\"inputs\":[{\"internalType\":\"addresspayable\",\"name\":\"beneficiary\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"}],\"name\":\"AdminAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"enumVault.SubscriptionType\",\"name\":\"typ\",\"type\":\"uint8\"}],\"name\":\"ApplyForSubscription\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"chequeSeqNo\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ChequeClaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Deposit\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"due\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"}],\"name\":\"Invoice\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"InvoicePayed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"}],\"name\":\"SubscriptionApproved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"}],\"name\":\"SubscriptionRejected\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"CREDIT_FEE\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"DEBIT_FEE\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_DEBIT_DEPOSIT\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedBy\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedOn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"invoices\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"due\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"bookDate\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"lastInvoice\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"due\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"},{\"internalType\":\"uint256\",\"name\":\"bookDate\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payoutTo\",\"outputs\":[{\"internalType\":\"addresspayable\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"pending\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"created\",\"type\":\"uint256\"},{\"internalType\":\"enumVault.SubscriptionType\",\"name\":\"typ\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"claimed\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"period\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"chequeSeqNo\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"subscriptions\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"created\",\"type\":\"uint256\"},{\"internalType\":\"enumVault.SubscriptionType\",\"name\":\"typ\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"claimed\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"period\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"chequeSeqNo\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"period\",\"type\":\"uint256\"}],\"name\":\"applyForCreditSubscription\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"applyForDebitSubscription\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"}],\"name\":\"approveSubscription\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"}],\"name\":\"rejectSubscription\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"seqNo\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"expires\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"chequeSigningHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"seqNo\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"expires\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"chequeSigner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"seqNo\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"expires\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"verifyCheque\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"seqNo\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"expires\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"claimCheque\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"consumer\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"}],\"name\":\"newInvoice\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"}],\"name\":\"invoiceAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"assetRoot\",\"type\":\"bytes32\"}],\"name\":\"payInvoice\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"addAdmin\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"

// VaultBin is the compiled bytecode used for deploying new contracts.
var VaultBin = "0x60806040526103e8600055600054620100000260015561041a60025534801561002757600080fd5b5060405161294c38038061294c8339818101604052602081101561004a57600080fd5b81019080805190602001909291905050504360038190555033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550506128008061014c6000396000f3fe6080604052600436106101445760003560e01c8063797ab6a7116100b6578063b7bf40141161006f578063b7bf4014146108ef578063d63a8e111461092a578063e1496b4714610991578063e480c58b146109bc578063f046395a146109e7578063fad3233d14610a81576102cc565b8063797ab6a7146106b85780637ae6aab11461073257806387b39bc51461073c5780638cd6c729146107a157806399fb7e7c146107f2578063af56537c14610855576102cc565b80634b926d43116101085780634b926d43146104835780635eebea20146104f357806365bd49661461058d57806370480275146105b857806373fc84201461060957806378a72fee14610634576102cc565b80630e1f3dfa146102d15780630f35cc481461037457806313a7289b146103c35780631f21cc9114610414578063222ab34714610455576102cc565b366102cc573360028081111561015657fe5b600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660028111156101b157fe5b14610224576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f6e6f2063726564697420737562736372697074696f6e0000000000000000000081525060200191505060405180910390fd5b34600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301600082825401925050819055507fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150005b600080fd5b3480156102dd57600080fd5b5061033f600480360360c08110156102f457600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803560ff1690602001909291908035906020019092919080359060200190929190505050610ac2565b604051808373ffffffffffffffffffffffffffffffffffffffff16815260200182151581526020019250505060405180910390f35b34801561038057600080fd5b506103ad6004803603602081101561039757600080fd5b8101908080359060200190929190505050610bfe565b6040518082815260200191505060405180910390f35b3480156103cf57600080fd5b50610412600480360360208110156103e657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d3b565b005b34801561042057600080fd5b5061042961105e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104816004803603602081101561046b57600080fd5b8101908080359060200190929190505050611084565b005b34801561048f57600080fd5b506104f1600480360360c08110156104a657600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803560ff1690602001909291908035906020019092919080359060200190929190505050611326565b005b3480156104ff57600080fd5b506105426004803603602081101561051657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506115ae565b6040518088815260200187600281111561055857fe5b815260200186815260200185815260200184815260200183815260200182815260200197505050505050505060405180910390f35b34801561059957600080fd5b506105a26115fd565b6040518082815260200191505060405180910390f35b3480156105c457600080fd5b50610607600480360360208110156105db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611603565b005b34801561061557600080fd5b5061061e61176a565b6040518082815260200191505060405180910390f35b34801561064057600080fd5b5061068d6004803603604081101561065757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611770565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b3480156106c457600080fd5b50610707600480360360208110156106db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117ad565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b61073a6117dd565b005b34801561074857600080fd5b5061079f6004803603606081101561075f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050611af6565b005b3480156107ad57600080fd5b506107f0600480360360208110156107c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611fd1565b005b3480156107fe57600080fd5b5061083f6004803603606081101561081557600080fd5b81019080803590602001909291908035906020019092919080359060200190929190505050612201565b6040518082815260200191505060405180910390f35b34801561086157600080fd5b506108c3600480360360c081101561087857600080fd5b81019080803590602001909291908035906020019092919080359060200190929190803560ff1690602001909291908035906020019092919080359060200190929190505050612261565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156108fb57600080fd5b506109286004803603602081101561091257600080fd5b81019080803590602001909291905050506122e2565b005b34801561093657600080fd5b506109796004803603602081101561094d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612671565b60405180821515815260200191505060405180910390f35b34801561099d57600080fd5b506109a6612691565b6040518082815260200191505060405180910390f35b3480156109c857600080fd5b506109d1612697565b6040518082815260200191505060405180910390f35b3480156109f357600080fd5b50610a3660048036036020811015610a0a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061269d565b60405180888152602001876002811115610a4c57fe5b815260200186815260200185815260200184815260200183815260200182815260200197505050505050505060405180910390f35b348015610a8d57600080fd5b50610a966126ec565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000806000610ad5898989898989612261565b9050610adf612712565b600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060e0016040529081600082015481526020016001820160009054906101000a900460ff166002811115610b5157fe5b6002811115610b5c57fe5b81526020016002820154815260200160038201548152602001600482015481526020016005820154815260200160068201548152505090506000600280811115610ba257fe5b82602001516002811115610bb257fe5b148015610bc257508a8260c00151105b8015610bd2575081608001518910155b8015610be8575081608001518903826060015110155b9050828194509450505050965096945050505050565b600080600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050610c4a61275a565b81600085815260200190815260200160002060405180608001604052908160008201548152602001600182015481526020016002820154815260200160038201548152505090506000816000015111610d0b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f696e766f696365206e6f7420666f756e6400000000000000000000000000000081525060200191505060405180910390fd5b6000816000015190504282602001511015610d3057600a8181610d2a57fe5b04810190505b809350505050919050565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610dfa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f6163636f756e74206e6f2061646d696e0000000000000000000000000000000081525060200191505060405180910390fd5b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015411610e95576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806127866023913960400191505060405180910390fd5b600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015481600001556001820160009054906101000a900460ff168160010160006101000a81548160ff02191690836002811115610f4e57fe5b02179055506002820154816002015560038201548160030155600482015481600401556005820154816005015560068201548160060155905050600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000808201600090556001820160006101000a81549060ff02191690556002820160009055600382016000905560048201600090556005820160009055600682016000905550507fa92ec4720d066ecb45a6f0635f630ee0e0325431021e91901c61cb77f0c3769581604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b336001600281111561109257fe5b600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660028111156110ed57fe5b14611160576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f20646562697420737562736372697074696f6e000000000000000000000081525060200191505060405180910390fd5b600061116b83610bfe565b90503481146111e2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f696e76616c696420616d6f756e7400000000000000000000000000000000000081525060200191505060405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561124a573d6000803e3d6000fd5b506000600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905080600085815260200190815260200160002060008082016000905560018201600090556002820160009055600382016000905550507f2e48123b35b815cebf398419b12736b2da83731c2b336ea0a6db91ec4fe4a96a338584604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a150505050565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166113e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f6163636f756e74206e6f2061646d696e0000000000000000000000000000000081525060200191505060405180910390fd5b6000806113f6888888888888610ac2565b915091508061146d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f696e76616c69642063686571756500000000000000000000000000000000000081525060200191505060405180910390fd5b6000600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050868160030160008282540392505081905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc889081150290604051600060405180830381858888f1935050505015801561152a573d6000803e3d6000fd5b508881600601819055508681600401600082825401925050819055507f90bf57d01c8e0b51864909347f6f57c72cdcbdedcbd46bd1a215894bf9a1ab64838a89604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1505050505050505050565b60076020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060020154908060030154908060040154908060050154908060060154905087565b60025481565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166116c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f6163636f756e74206e6f2061646d696e0000000000000000000000000000000081525060200191505060405180910390fd5b6001600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f44d6d25963f097ad14f29f06854a01f575648a1ef82f30e562ccd3889717e33981604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b60035481565b6009602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154908060030154905084565b600a6020528060005260406000206000915090508060000154908060010154908060020154908060030154905084565b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015414611878576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806127a96022913960400191505060405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015414611930576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f616c726561647920676f74206120737562736372697074696f6e00000000000081525060200191505060405180910390fd5b6001543410156119a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f6465706f73697420746f6f206c6f77000000000000000000000000000000000081525060200191505060405180910390fd5b6040518060e00160405280428152602001600160028111156119c657fe5b8152602001600054815260200134815260200160008152602001600081526020016000815250600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff02191690836002811115611a5957fe5b021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c082015181600601559050507fb6c945dc9a09bf264e63e1484673a29615b8cd579df1faf23e1096631e3a6cd1336001604051808373ffffffffffffffffffffffffffffffffffffffff168152602001826002811115611ae357fe5b81526020019250505060405180910390a1565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611bb5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f6163636f756e74206e6f2061646d696e0000000000000000000000000000000081525060200191505060405180910390fd5b8260016002811115611bc357fe5b600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff166002811115611c1e57fe5b14611c91576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f6e6f20646562697420737562736372697074696f6e000000000000000000000081525060200191505060405180910390fd5b611c99612712565b600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060e0016040529081600082015481526020016001820160009054906101000a900460ff166002811115611d0b57fe5b6002811115611d1657fe5b8152602001600282015481526020016003820154815260200160048201548152602001600582015481526020016006820154815250509050611d5661275a565b600a60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806080016040529081600082015481526020016001820154815260200160028201548152602001600382015481525050905042620151808360a001510282606001510110611e4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f7061796d656e7420706572696f64206e6f74207965742070617373656400000081525060200191505060405180910390fd5b600062093a8042019050611e6061275a565b604051806080016040528088815260200183815260200187815260200142815250905080600960008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008881526020019081526020016000206000820151816000015560208201518160010155604082015181600201556060820151816003015590505080600a60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301559050507f58fbcd92fd1c371f6b1c07edebbf13c87efe9b31d5e2e634128a4f753ab5d13c888388604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a15050505050505050565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16612090576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f6163636f756e74206e6f2061646d696e0000000000000000000000000000000081525060200191505060405180910390fd5b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201541161212b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806127866023913960400191505060405180910390fd5b600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000808201600090556001820160006101000a81549060ff02191690556002820160009055600382016000905560048201600090556005820160009055600682016000905550507f4e4573f2b3412dd30c3eb085ba10ff1d2a2f65fed9915dacd6c4449323b4f82181604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b600030848484604051602001808573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281526020019450505050506040516020818303038152906040528051906020012090509392505050565b60008061226f888888612201565b905060018186868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156122cb573d6000803e3d6000fd5b505050602060405103519150509695505050505050565b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201541461237d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806127a96022913960400191505060405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015414612435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f616c726561647920676f74206120737562736372697074696f6e00000000000081525060200191505060405180910390fd5b60028110156124ac576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f706572696f64206d757374206265206174206c6561737420322064617973000081525060200191505060405180910390fd5b601f811115612523576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f706572696f64206d757374206265206174206d6178203331206461797300000081525060200191505060405180910390fd5b6040518060e0016040528042815260200160028081111561254057fe5b8152602001600254815260200160008152602001600081526020018281526020016000815250600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908360028111156125d357fe5b021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c082015181600601559050507fb6c945dc9a09bf264e63e1484673a29615b8cd579df1faf23e1096631e3a6cd1336002604051808373ffffffffffffffffffffffffffffffffffffffff16815260200182600281111561265d57fe5b81526020019250505060405180910390a150565b60066020528060005260406000206000915054906101000a900460ff1681565b60005481565b60015481565b60086020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060020154908060030154908060040154908060050154908060060154905087565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040518060e00160405280600081526020016000600281111561273157fe5b815260200160008152602001600081526020016000815260200160008152602001600081525090565b604051806080016040528060008152602001600081526020016000801916815260200160008152509056fe686173206e6f2070656e64696e6720737562736372697074696f6e2072657175657374616c7265616479206170706c69656420666f72206120737562736372697074696f6ea26469706673582212208ebee4b044afcecb6b883f96c4e3eae3f5945b326c32dab87aa3e65746cd570e64736f6c634300060c0033"

// DeployVault deploys a new Ethereum contract, binding an instance of Vault to it.
func DeployVault(auth *bind.TransactOpts, backend bind.ContractBackend, beneficiary common.Address) (common.Address, *types.Transaction, *Vault, error) {
	parsed, err := abi.JSON(strings.NewReader(VaultABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}

	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(VaultBin), backend, beneficiary)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Vault{VaultCaller: VaultCaller{contract: contract}, VaultTransactor: VaultTransactor{contract: contract}, VaultFilterer: VaultFilterer{contract: contract}}, nil
}

// Vault is an auto generated Go binding around an Ethereum contract.
type Vault struct {
	VaultCaller     // Read-only binding to the contract
	VaultTransactor // Write-only binding to the contract
	VaultFilterer   // Log filterer for contract events
}

// VaultCaller is an auto generated read-only Go binding around an Ethereum contract.
type VaultCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// VaultTransactor is an auto generated write-only Go binding around an Ethereum contract.
type VaultTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// VaultFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type VaultFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// VaultSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type VaultSession struct {
	Contract     *Vault            // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// VaultCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type VaultCallerSession struct {
	Contract *VaultCaller  // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// VaultTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type VaultTransactorSession struct {
	Contract     *VaultTransactor  // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// VaultRaw is an auto generated low-level Go binding around an Ethereum contract.
type VaultRaw struct {
	Contract *Vault // Generic contract binding to access the raw methods on
}

// VaultCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type VaultCallerRaw struct {
	Contract *VaultCaller // Generic read-only contract binding to access the raw methods on
}

// VaultTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type VaultTransactorRaw struct {
	Contract *VaultTransactor // Generic write-only contract binding to access the raw methods on
}

// NewVault creates a new instance of Vault, bound to a specific deployed contract.
func NewVault(address common.Address, backend bind.ContractBackend) (*Vault, error) {
	contract, err := bindVault(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Vault{VaultCaller: VaultCaller{contract: contract}, VaultTransactor: VaultTransactor{contract: contract}, VaultFilterer: VaultFilterer{contract: contract}}, nil
}

// NewVaultCaller creates a new read-only instance of Vault, bound to a specific deployed contract.
func NewVaultCaller(address common.Address, caller bind.ContractCaller) (*VaultCaller, error) {
	contract, err := bindVault(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &VaultCaller{contract: contract}, nil
}

// NewVaultTransactor creates a new write-only instance of Vault, bound to a specific deployed contract.
func NewVaultTransactor(address common.Address, transactor bind.ContractTransactor) (*VaultTransactor, error) {
	contract, err := bindVault(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &VaultTransactor{contract: contract}, nil
}

// NewVaultFilterer creates a new log filterer instance of Vault, bound to a specific deployed contract.
func NewVaultFilterer(address common.Address, filterer bind.ContractFilterer) (*VaultFilterer, error) {
	contract, err := bindVault(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &VaultFilterer{contract: contract}, nil
}

// bindVault binds a generic wrapper to an already deployed contract.
func bindVault(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(VaultABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Vault *VaultRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Vault.Contract.VaultCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Vault *VaultRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Vault.Contract.VaultTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Vault *VaultRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Vault.Contract.VaultTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Vault *VaultCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Vault.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Vault *VaultTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Vault.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Vault *VaultTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Vault.Contract.contract.Transact(opts, method, params...)
}

// CREDITFEE is a free data retrieval call binding the contract method 0x65bd4966.
//
// Solidity: function CREDIT_FEE() view returns(uint256)
func (_Vault *VaultCaller) CREDITFEE(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "CREDIT_FEE")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// CREDITFEE is a free data retrieval call binding the contract method 0x65bd4966.
//
// Solidity: function CREDIT_FEE() view returns(uint256)
func (_Vault *VaultSession) CREDITFEE() (*big.Int, error) {
	return _Vault.Contract.CREDITFEE(&_Vault.CallOpts)
}

// CREDITFEE is a free data retrieval call binding the contract method 0x65bd4966.
//
// Solidity: function CREDIT_FEE() view returns(uint256)
func (_Vault *VaultCallerSession) CREDITFEE() (*big.Int, error) {
	return _Vault.Contract.CREDITFEE(&_Vault.CallOpts)
}

// DEBITFEE is a free data retrieval call binding the contract method 0xe1496b47.
//
// Solidity: function DEBIT_FEE() view returns(uint256)
func (_Vault *VaultCaller) DEBITFEE(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "DEBIT_FEE")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// DEBITFEE is a free data retrieval call binding the contract method 0xe1496b47.
//
// Solidity: function DEBIT_FEE() view returns(uint256)
func (_Vault *VaultSession) DEBITFEE() (*big.Int, error) {
	return _Vault.Contract.DEBITFEE(&_Vault.CallOpts)
}

// DEBITFEE is a free data retrieval call binding the contract method 0xe1496b47.
//
// Solidity: function DEBIT_FEE() view returns(uint256)
func (_Vault *VaultCallerSession) DEBITFEE() (*big.Int, error) {
	return _Vault.Contract.DEBITFEE(&_Vault.CallOpts)
}

// MINDEBITDEPOSIT is a free data retrieval call binding the contract method 0xe480c58b.
//
// Solidity: function MIN_DEBIT_DEPOSIT() view returns(uint256)
func (_Vault *VaultCaller) MINDEBITDEPOSIT(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "MIN_DEBIT_DEPOSIT")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// MINDEBITDEPOSIT is a free data retrieval call binding the contract method 0xe480c58b.
//
// Solidity: function MIN_DEBIT_DEPOSIT() view returns(uint256)
func (_Vault *VaultSession) MINDEBITDEPOSIT() (*big.Int, error) {
	return _Vault.Contract.MINDEBITDEPOSIT(&_Vault.CallOpts)
}

// MINDEBITDEPOSIT is a free data retrieval call binding the contract method 0xe480c58b.
//
// Solidity: function MIN_DEBIT_DEPOSIT() view returns(uint256)
func (_Vault *VaultCallerSession) MINDEBITDEPOSIT() (*big.Int, error) {
	return _Vault.Contract.MINDEBITDEPOSIT(&_Vault.CallOpts)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Vault *VaultCaller) Allowed(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "allowed", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Vault *VaultSession) Allowed(arg0 common.Address) (bool, error) {
	return _Vault.Contract.Allowed(&_Vault.CallOpts, arg0)
}

// Allowed is a free data retrieval call binding the contract method 0xd63a8e11.
//
// Solidity: function allowed(address ) view returns(bool)
func (_Vault *VaultCallerSession) Allowed(arg0 common.Address) (bool, error) {
	return _Vault.Contract.Allowed(&_Vault.CallOpts, arg0)
}

// ChequeSigner is a free data retrieval call binding the contract method 0xaf56537c.
//
// Solidity: function chequeSigner(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address)
func (_Vault *VaultCaller) ChequeSigner(opts *bind.CallOpts, seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "chequeSigner", seqNo, expires, amount, v, r, s)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// ChequeSigner is a free data retrieval call binding the contract method 0xaf56537c.
//
// Solidity: function chequeSigner(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address)
func (_Vault *VaultSession) ChequeSigner(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, error) {
	return _Vault.Contract.ChequeSigner(&_Vault.CallOpts, seqNo, expires, amount, v, r, s)
}

// ChequeSigner is a free data retrieval call binding the contract method 0xaf56537c.
//
// Solidity: function chequeSigner(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address)
func (_Vault *VaultCallerSession) ChequeSigner(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, error) {
	return _Vault.Contract.ChequeSigner(&_Vault.CallOpts, seqNo, expires, amount, v, r, s)
}

// ChequeSigningHash is a free data retrieval call binding the contract method 0x99fb7e7c.
//
// Solidity: function chequeSigningHash(uint256 seqNo, uint256 expires, uint256 amount) view returns(bytes32)
func (_Vault *VaultCaller) ChequeSigningHash(opts *bind.CallOpts, seqNo *big.Int, expires *big.Int, amount *big.Int) ([32]byte, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "chequeSigningHash", seqNo, expires, amount)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// ChequeSigningHash is a free data retrieval call binding the contract method 0x99fb7e7c.
//
// Solidity: function chequeSigningHash(uint256 seqNo, uint256 expires, uint256 amount) view returns(bytes32)
func (_Vault *VaultSession) ChequeSigningHash(seqNo *big.Int, expires *big.Int, amount *big.Int) ([32]byte, error) {
	return _Vault.Contract.ChequeSigningHash(&_Vault.CallOpts, seqNo, expires, amount)
}

// ChequeSigningHash is a free data retrieval call binding the contract method 0x99fb7e7c.
//
// Solidity: function chequeSigningHash(uint256 seqNo, uint256 expires, uint256 amount) view returns(bytes32)
func (_Vault *VaultCallerSession) ChequeSigningHash(seqNo *big.Int, expires *big.Int, amount *big.Int) ([32]byte, error) {
	return _Vault.Contract.ChequeSigningHash(&_Vault.CallOpts, seqNo, expires, amount)
}

// DeployedBy is a free data retrieval call binding the contract method 0x1f21cc91.
//
// Solidity: function deployedBy() view returns(address)
func (_Vault *VaultCaller) DeployedBy(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "deployedBy")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// DeployedBy is a free data retrieval call binding the contract method 0x1f21cc91.
//
// Solidity: function deployedBy() view returns(address)
func (_Vault *VaultSession) DeployedBy() (common.Address, error) {
	return _Vault.Contract.DeployedBy(&_Vault.CallOpts)
}

// DeployedBy is a free data retrieval call binding the contract method 0x1f21cc91.
//
// Solidity: function deployedBy() view returns(address)
func (_Vault *VaultCallerSession) DeployedBy() (common.Address, error) {
	return _Vault.Contract.DeployedBy(&_Vault.CallOpts)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Vault *VaultCaller) DeployedOn(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "deployedOn")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Vault *VaultSession) DeployedOn() (*big.Int, error) {
	return _Vault.Contract.DeployedOn(&_Vault.CallOpts)
}

// DeployedOn is a free data retrieval call binding the contract method 0x73fc8420.
//
// Solidity: function deployedOn() view returns(uint256)
func (_Vault *VaultCallerSession) DeployedOn() (*big.Int, error) {
	return _Vault.Contract.DeployedOn(&_Vault.CallOpts)
}

// InvoiceAmount is a free data retrieval call binding the contract method 0x0f35cc48.
//
// Solidity: function invoiceAmount(bytes32 assetRoot) view returns(uint256)
func (_Vault *VaultCaller) InvoiceAmount(opts *bind.CallOpts, assetRoot [32]byte) (*big.Int, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "invoiceAmount", assetRoot)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// InvoiceAmount is a free data retrieval call binding the contract method 0x0f35cc48.
//
// Solidity: function invoiceAmount(bytes32 assetRoot) view returns(uint256)
func (_Vault *VaultSession) InvoiceAmount(assetRoot [32]byte) (*big.Int, error) {
	return _Vault.Contract.InvoiceAmount(&_Vault.CallOpts, assetRoot)
}

// InvoiceAmount is a free data retrieval call binding the contract method 0x0f35cc48.
//
// Solidity: function invoiceAmount(bytes32 assetRoot) view returns(uint256)
func (_Vault *VaultCallerSession) InvoiceAmount(assetRoot [32]byte) (*big.Int, error) {
	return _Vault.Contract.InvoiceAmount(&_Vault.CallOpts, assetRoot)
}

// Invoices is a free data retrieval call binding the contract method 0x78a72fee.
//
// Solidity: function invoices(address , bytes32 ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultCaller) Invoices(opts *bind.CallOpts, arg0 common.Address, arg1 [32]byte) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "invoices", arg0, arg1)

	outstruct := new(struct {
		Amount    *big.Int
		Due       *big.Int
		AssetRoot [32]byte
		BookDate  *big.Int
	})

	outstruct.Amount = out[0].(*big.Int)
	outstruct.Due = out[1].(*big.Int)
	outstruct.AssetRoot = out[2].([32]byte)
	outstruct.BookDate = out[3].(*big.Int)

	return *outstruct, err

}

// Invoices is a free data retrieval call binding the contract method 0x78a72fee.
//
// Solidity: function invoices(address , bytes32 ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultSession) Invoices(arg0 common.Address, arg1 [32]byte) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	return _Vault.Contract.Invoices(&_Vault.CallOpts, arg0, arg1)
}

// Invoices is a free data retrieval call binding the contract method 0x78a72fee.
//
// Solidity: function invoices(address , bytes32 ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultCallerSession) Invoices(arg0 common.Address, arg1 [32]byte) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	return _Vault.Contract.Invoices(&_Vault.CallOpts, arg0, arg1)
}

// LastInvoice is a free data retrieval call binding the contract method 0x797ab6a7.
//
// Solidity: function lastInvoice(address ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultCaller) LastInvoice(opts *bind.CallOpts, arg0 common.Address) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "lastInvoice", arg0)

	outstruct := new(struct {
		Amount    *big.Int
		Due       *big.Int
		AssetRoot [32]byte
		BookDate  *big.Int
	})

	outstruct.Amount = out[0].(*big.Int)
	outstruct.Due = out[1].(*big.Int)
	outstruct.AssetRoot = out[2].([32]byte)
	outstruct.BookDate = out[3].(*big.Int)

	return *outstruct, err

}

// LastInvoice is a free data retrieval call binding the contract method 0x797ab6a7.
//
// Solidity: function lastInvoice(address ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultSession) LastInvoice(arg0 common.Address) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	return _Vault.Contract.LastInvoice(&_Vault.CallOpts, arg0)
}

// LastInvoice is a free data retrieval call binding the contract method 0x797ab6a7.
//
// Solidity: function lastInvoice(address ) view returns(uint256 amount, uint256 due, bytes32 assetRoot, uint256 bookDate)
func (_Vault *VaultCallerSession) LastInvoice(arg0 common.Address) (struct {
	Amount    *big.Int
	Due       *big.Int
	AssetRoot [32]byte
	BookDate  *big.Int
}, error) {
	return _Vault.Contract.LastInvoice(&_Vault.CallOpts, arg0)
}

// PayoutTo is a free data retrieval call binding the contract method 0xfad3233d.
//
// Solidity: function payoutTo() view returns(address)
func (_Vault *VaultCaller) PayoutTo(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "payoutTo")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// PayoutTo is a free data retrieval call binding the contract method 0xfad3233d.
//
// Solidity: function payoutTo() view returns(address)
func (_Vault *VaultSession) PayoutTo() (common.Address, error) {
	return _Vault.Contract.PayoutTo(&_Vault.CallOpts)
}

// PayoutTo is a free data retrieval call binding the contract method 0xfad3233d.
//
// Solidity: function payoutTo() view returns(address)
func (_Vault *VaultCallerSession) PayoutTo() (common.Address, error) {
	return _Vault.Contract.PayoutTo(&_Vault.CallOpts)
}

// Pending is a free data retrieval call binding the contract method 0x5eebea20.
//
// Solidity: function pending(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultCaller) Pending(opts *bind.CallOpts, arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "pending", arg0)

	outstruct := new(struct {
		Created     *big.Int
		Typ         uint8
		Fee         *big.Int
		Balance     *big.Int
		Claimed     *big.Int
		Period      *big.Int
		ChequeSeqNo *big.Int
	})

	outstruct.Created = out[0].(*big.Int)
	outstruct.Typ = out[1].(uint8)
	outstruct.Fee = out[2].(*big.Int)
	outstruct.Balance = out[3].(*big.Int)
	outstruct.Claimed = out[4].(*big.Int)
	outstruct.Period = out[5].(*big.Int)
	outstruct.ChequeSeqNo = out[6].(*big.Int)

	return *outstruct, err

}

// Pending is a free data retrieval call binding the contract method 0x5eebea20.
//
// Solidity: function pending(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultSession) Pending(arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	return _Vault.Contract.Pending(&_Vault.CallOpts, arg0)
}

// Pending is a free data retrieval call binding the contract method 0x5eebea20.
//
// Solidity: function pending(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultCallerSession) Pending(arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	return _Vault.Contract.Pending(&_Vault.CallOpts, arg0)
}

// Subscriptions is a free data retrieval call binding the contract method 0xf046395a.
//
// Solidity: function subscriptions(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultCaller) Subscriptions(opts *bind.CallOpts, arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "subscriptions", arg0)

	outstruct := new(struct {
		Created     *big.Int
		Typ         uint8
		Fee         *big.Int
		Balance     *big.Int
		Claimed     *big.Int
		Period      *big.Int
		ChequeSeqNo *big.Int
	})

	outstruct.Created = out[0].(*big.Int)
	outstruct.Typ = out[1].(uint8)
	outstruct.Fee = out[2].(*big.Int)
	outstruct.Balance = out[3].(*big.Int)
	outstruct.Claimed = out[4].(*big.Int)
	outstruct.Period = out[5].(*big.Int)
	outstruct.ChequeSeqNo = out[6].(*big.Int)

	return *outstruct, err

}

// Subscriptions is a free data retrieval call binding the contract method 0xf046395a.
//
// Solidity: function subscriptions(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultSession) Subscriptions(arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	return _Vault.Contract.Subscriptions(&_Vault.CallOpts, arg0)
}

// Subscriptions is a free data retrieval call binding the contract method 0xf046395a.
//
// Solidity: function subscriptions(address ) view returns(uint256 created, uint8 typ, uint256 fee, uint256 balance, uint256 claimed, uint256 period, uint256 chequeSeqNo)
func (_Vault *VaultCallerSession) Subscriptions(arg0 common.Address) (struct {
	Created     *big.Int
	Typ         uint8
	Fee         *big.Int
	Balance     *big.Int
	Claimed     *big.Int
	Period      *big.Int
	ChequeSeqNo *big.Int
}, error) {
	return _Vault.Contract.Subscriptions(&_Vault.CallOpts, arg0)
}

// VerifyCheque is a free data retrieval call binding the contract method 0x0e1f3dfa.
//
// Solidity: function verifyCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address, bool)
func (_Vault *VaultCaller) VerifyCheque(opts *bind.CallOpts, seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, bool, error) {
	var out []interface{}
	err := _Vault.contract.Call(opts, &out, "verifyCheque", seqNo, expires, amount, v, r, s)

	if err != nil {
		return *new(common.Address), *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	out1 := *abi.ConvertType(out[1], new(bool)).(*bool)

	return out0, out1, err

}

// VerifyCheque is a free data retrieval call binding the contract method 0x0e1f3dfa.
//
// Solidity: function verifyCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address, bool)
func (_Vault *VaultSession) VerifyCheque(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, bool, error) {
	return _Vault.Contract.VerifyCheque(&_Vault.CallOpts, seqNo, expires, amount, v, r, s)
}

// VerifyCheque is a free data retrieval call binding the contract method 0x0e1f3dfa.
//
// Solidity: function verifyCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) view returns(address, bool)
func (_Vault *VaultCallerSession) VerifyCheque(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (common.Address, bool, error) {
	return _Vault.Contract.VerifyCheque(&_Vault.CallOpts, seqNo, expires, amount, v, r, s)
}

// AddAdmin is a paid mutator transaction binding the contract method 0x70480275.
//
// Solidity: function addAdmin(address addr) returns()
func (_Vault *VaultTransactor) AddAdmin(opts *bind.TransactOpts, addr common.Address) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "addAdmin", addr)
}

// AddAdmin is a paid mutator transaction binding the contract method 0x70480275.
//
// Solidity: function addAdmin(address addr) returns()
func (_Vault *VaultSession) AddAdmin(addr common.Address) (*types.Transaction, error) {
	return _Vault.Contract.AddAdmin(&_Vault.TransactOpts, addr)
}

// AddAdmin is a paid mutator transaction binding the contract method 0x70480275.
//
// Solidity: function addAdmin(address addr) returns()
func (_Vault *VaultTransactorSession) AddAdmin(addr common.Address) (*types.Transaction, error) {
	return _Vault.Contract.AddAdmin(&_Vault.TransactOpts, addr)
}

// ApplyForCreditSubscription is a paid mutator transaction binding the contract method 0xb7bf4014.
//
// Solidity: function applyForCreditSubscription(uint256 period) returns()
func (_Vault *VaultTransactor) ApplyForCreditSubscription(opts *bind.TransactOpts, period *big.Int) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "applyForCreditSubscription", period)
}

// ApplyForCreditSubscription is a paid mutator transaction binding the contract method 0xb7bf4014.
//
// Solidity: function applyForCreditSubscription(uint256 period) returns()
func (_Vault *VaultSession) ApplyForCreditSubscription(period *big.Int) (*types.Transaction, error) {
	return _Vault.Contract.ApplyForCreditSubscription(&_Vault.TransactOpts, period)
}

// ApplyForCreditSubscription is a paid mutator transaction binding the contract method 0xb7bf4014.
//
// Solidity: function applyForCreditSubscription(uint256 period) returns()
func (_Vault *VaultTransactorSession) ApplyForCreditSubscription(period *big.Int) (*types.Transaction, error) {
	return _Vault.Contract.ApplyForCreditSubscription(&_Vault.TransactOpts, period)
}

// ApplyForDebitSubscription is a paid mutator transaction binding the contract method 0x7ae6aab1.
//
// Solidity: function applyForDebitSubscription() payable returns()
func (_Vault *VaultTransactor) ApplyForDebitSubscription(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "applyForDebitSubscription")
}

// ApplyForDebitSubscription is a paid mutator transaction binding the contract method 0x7ae6aab1.
//
// Solidity: function applyForDebitSubscription() payable returns()
func (_Vault *VaultSession) ApplyForDebitSubscription() (*types.Transaction, error) {
	return _Vault.Contract.ApplyForDebitSubscription(&_Vault.TransactOpts)
}

// ApplyForDebitSubscription is a paid mutator transaction binding the contract method 0x7ae6aab1.
//
// Solidity: function applyForDebitSubscription() payable returns()
func (_Vault *VaultTransactorSession) ApplyForDebitSubscription() (*types.Transaction, error) {
	return _Vault.Contract.ApplyForDebitSubscription(&_Vault.TransactOpts)
}

// ApproveSubscription is a paid mutator transaction binding the contract method 0x13a7289b.
//
// Solidity: function approveSubscription(address consumer) returns()
func (_Vault *VaultTransactor) ApproveSubscription(opts *bind.TransactOpts, consumer common.Address) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "approveSubscription", consumer)
}

// ApproveSubscription is a paid mutator transaction binding the contract method 0x13a7289b.
//
// Solidity: function approveSubscription(address consumer) returns()
func (_Vault *VaultSession) ApproveSubscription(consumer common.Address) (*types.Transaction, error) {
	return _Vault.Contract.ApproveSubscription(&_Vault.TransactOpts, consumer)
}

// ApproveSubscription is a paid mutator transaction binding the contract method 0x13a7289b.
//
// Solidity: function approveSubscription(address consumer) returns()
func (_Vault *VaultTransactorSession) ApproveSubscription(consumer common.Address) (*types.Transaction, error) {
	return _Vault.Contract.ApproveSubscription(&_Vault.TransactOpts, consumer)
}

// ClaimCheque is a paid mutator transaction binding the contract method 0x4b926d43.
//
// Solidity: function claimCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) returns()
func (_Vault *VaultTransactor) ClaimCheque(opts *bind.TransactOpts, seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "claimCheque", seqNo, expires, amount, v, r, s)
}

// ClaimCheque is a paid mutator transaction binding the contract method 0x4b926d43.
//
// Solidity: function claimCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) returns()
func (_Vault *VaultSession) ClaimCheque(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.ClaimCheque(&_Vault.TransactOpts, seqNo, expires, amount, v, r, s)
}

// ClaimCheque is a paid mutator transaction binding the contract method 0x4b926d43.
//
// Solidity: function claimCheque(uint256 seqNo, uint256 expires, uint256 amount, uint8 v, bytes32 r, bytes32 s) returns()
func (_Vault *VaultTransactorSession) ClaimCheque(seqNo *big.Int, expires *big.Int, amount *big.Int, v uint8, r [32]byte, s [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.ClaimCheque(&_Vault.TransactOpts, seqNo, expires, amount, v, r, s)
}

// NewInvoice is a paid mutator transaction binding the contract method 0x87b39bc5.
//
// Solidity: function newInvoice(address consumer, uint256 amount, bytes32 assetRoot) returns()
func (_Vault *VaultTransactor) NewInvoice(opts *bind.TransactOpts, consumer common.Address, amount *big.Int, assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "newInvoice", consumer, amount, assetRoot)
}

// NewInvoice is a paid mutator transaction binding the contract method 0x87b39bc5.
//
// Solidity: function newInvoice(address consumer, uint256 amount, bytes32 assetRoot) returns()
func (_Vault *VaultSession) NewInvoice(consumer common.Address, amount *big.Int, assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.NewInvoice(&_Vault.TransactOpts, consumer, amount, assetRoot)
}

// NewInvoice is a paid mutator transaction binding the contract method 0x87b39bc5.
//
// Solidity: function newInvoice(address consumer, uint256 amount, bytes32 assetRoot) returns()
func (_Vault *VaultTransactorSession) NewInvoice(consumer common.Address, amount *big.Int, assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.NewInvoice(&_Vault.TransactOpts, consumer, amount, assetRoot)
}

// PayInvoice is a paid mutator transaction binding the contract method 0x222ab347.
//
// Solidity: function payInvoice(bytes32 assetRoot) payable returns()
func (_Vault *VaultTransactor) PayInvoice(opts *bind.TransactOpts, assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "payInvoice", assetRoot)
}

// PayInvoice is a paid mutator transaction binding the contract method 0x222ab347.
//
// Solidity: function payInvoice(bytes32 assetRoot) payable returns()
func (_Vault *VaultSession) PayInvoice(assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.PayInvoice(&_Vault.TransactOpts, assetRoot)
}

// PayInvoice is a paid mutator transaction binding the contract method 0x222ab347.
//
// Solidity: function payInvoice(bytes32 assetRoot) payable returns()
func (_Vault *VaultTransactorSession) PayInvoice(assetRoot [32]byte) (*types.Transaction, error) {
	return _Vault.Contract.PayInvoice(&_Vault.TransactOpts, assetRoot)
}

// RejectSubscription is a paid mutator transaction binding the contract method 0x8cd6c729.
//
// Solidity: function rejectSubscription(address consumer) returns()
func (_Vault *VaultTransactor) RejectSubscription(opts *bind.TransactOpts, consumer common.Address) (*types.Transaction, error) {
	return _Vault.contract.Transact(opts, "rejectSubscription", consumer)
}

// RejectSubscription is a paid mutator transaction binding the contract method 0x8cd6c729.
//
// Solidity: function rejectSubscription(address consumer) returns()
func (_Vault *VaultSession) RejectSubscription(consumer common.Address) (*types.Transaction, error) {
	return _Vault.Contract.RejectSubscription(&_Vault.TransactOpts, consumer)
}

// RejectSubscription is a paid mutator transaction binding the contract method 0x8cd6c729.
//
// Solidity: function rejectSubscription(address consumer) returns()
func (_Vault *VaultTransactorSession) RejectSubscription(consumer common.Address) (*types.Transaction, error) {
	return _Vault.Contract.RejectSubscription(&_Vault.TransactOpts, consumer)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Vault *VaultTransactor) Receive(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Vault.contract.RawTransact(opts, nil) // calldata is disallowed for receive function
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Vault *VaultSession) Receive() (*types.Transaction, error) {
	return _Vault.Contract.Receive(&_Vault.TransactOpts)
}

// Receive is a paid mutator transaction binding the contract receive function.
//
// Solidity: receive() payable returns()
func (_Vault *VaultTransactorSession) Receive() (*types.Transaction, error) {
	return _Vault.Contract.Receive(&_Vault.TransactOpts)
}

// VaultAdminAddedIterator is returned from FilterAdminAdded and is used to iterate over the raw logs and unpacked data for AdminAdded events raised by the Vault contract.
type VaultAdminAddedIterator struct {
	Event *VaultAdminAdded // Event containing the contract specifics and raw log

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
func (it *VaultAdminAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultAdminAdded)
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
		it.Event = new(VaultAdminAdded)
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
func (it *VaultAdminAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultAdminAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultAdminAdded represents a AdminAdded event raised by the Vault contract.
type VaultAdminAdded struct {
	Admin common.Address
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterAdminAdded is a free log retrieval operation binding the contract event 0x44d6d25963f097ad14f29f06854a01f575648a1ef82f30e562ccd3889717e339.
//
// Solidity: event AdminAdded(address admin)
func (_Vault *VaultFilterer) FilterAdminAdded(opts *bind.FilterOpts) (*VaultAdminAddedIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "AdminAdded")
	if err != nil {
		return nil, err
	}
	return &VaultAdminAddedIterator{contract: _Vault.contract, event: "AdminAdded", logs: logs, sub: sub}, nil
}

// WatchAdminAdded is a free log subscription operation binding the contract event 0x44d6d25963f097ad14f29f06854a01f575648a1ef82f30e562ccd3889717e339.
//
// Solidity: event AdminAdded(address admin)
func (_Vault *VaultFilterer) WatchAdminAdded(opts *bind.WatchOpts, sink chan<- *VaultAdminAdded) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "AdminAdded")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultAdminAdded)
				if err := _Vault.contract.UnpackLog(event, "AdminAdded", log); err != nil {
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

// ParseAdminAdded is a log parse operation binding the contract event 0x44d6d25963f097ad14f29f06854a01f575648a1ef82f30e562ccd3889717e339.
//
// Solidity: event AdminAdded(address admin)
func (_Vault *VaultFilterer) ParseAdminAdded(log types.Log) (*VaultAdminAdded, error) {
	event := new(VaultAdminAdded)
	if err := _Vault.contract.UnpackLog(event, "AdminAdded", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultApplyForSubscriptionIterator is returned from FilterApplyForSubscription and is used to iterate over the raw logs and unpacked data for ApplyForSubscription events raised by the Vault contract.
type VaultApplyForSubscriptionIterator struct {
	Event *VaultApplyForSubscription // Event containing the contract specifics and raw log

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
func (it *VaultApplyForSubscriptionIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultApplyForSubscription)
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
		it.Event = new(VaultApplyForSubscription)
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
func (it *VaultApplyForSubscriptionIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultApplyForSubscriptionIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultApplyForSubscription represents a ApplyForSubscription event raised by the Vault contract.
type VaultApplyForSubscription struct {
	Consumer common.Address
	Typ      uint8
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApplyForSubscription is a free log retrieval operation binding the contract event 0xb6c945dc9a09bf264e63e1484673a29615b8cd579df1faf23e1096631e3a6cd1.
//
// Solidity: event ApplyForSubscription(address consumer, uint8 typ)
func (_Vault *VaultFilterer) FilterApplyForSubscription(opts *bind.FilterOpts) (*VaultApplyForSubscriptionIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "ApplyForSubscription")
	if err != nil {
		return nil, err
	}
	return &VaultApplyForSubscriptionIterator{contract: _Vault.contract, event: "ApplyForSubscription", logs: logs, sub: sub}, nil
}

// WatchApplyForSubscription is a free log subscription operation binding the contract event 0xb6c945dc9a09bf264e63e1484673a29615b8cd579df1faf23e1096631e3a6cd1.
//
// Solidity: event ApplyForSubscription(address consumer, uint8 typ)
func (_Vault *VaultFilterer) WatchApplyForSubscription(opts *bind.WatchOpts, sink chan<- *VaultApplyForSubscription) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "ApplyForSubscription")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultApplyForSubscription)
				if err := _Vault.contract.UnpackLog(event, "ApplyForSubscription", log); err != nil {
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

// ParseApplyForSubscription is a log parse operation binding the contract event 0xb6c945dc9a09bf264e63e1484673a29615b8cd579df1faf23e1096631e3a6cd1.
//
// Solidity: event ApplyForSubscription(address consumer, uint8 typ)
func (_Vault *VaultFilterer) ParseApplyForSubscription(log types.Log) (*VaultApplyForSubscription, error) {
	event := new(VaultApplyForSubscription)
	if err := _Vault.contract.UnpackLog(event, "ApplyForSubscription", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultChequeClaimedIterator is returned from FilterChequeClaimed and is used to iterate over the raw logs and unpacked data for ChequeClaimed events raised by the Vault contract.
type VaultChequeClaimedIterator struct {
	Event *VaultChequeClaimed // Event containing the contract specifics and raw log

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
func (it *VaultChequeClaimedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultChequeClaimed)
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
		it.Event = new(VaultChequeClaimed)
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
func (it *VaultChequeClaimedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultChequeClaimedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultChequeClaimed represents a ChequeClaimed event raised by the Vault contract.
type VaultChequeClaimed struct {
	Consumer    common.Address
	ChequeSeqNo *big.Int
	Amount      *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterChequeClaimed is a free log retrieval operation binding the contract event 0x90bf57d01c8e0b51864909347f6f57c72cdcbdedcbd46bd1a215894bf9a1ab64.
//
// Solidity: event ChequeClaimed(address consumer, uint256 chequeSeqNo, uint256 amount)
func (_Vault *VaultFilterer) FilterChequeClaimed(opts *bind.FilterOpts) (*VaultChequeClaimedIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "ChequeClaimed")
	if err != nil {
		return nil, err
	}
	return &VaultChequeClaimedIterator{contract: _Vault.contract, event: "ChequeClaimed", logs: logs, sub: sub}, nil
}

// WatchChequeClaimed is a free log subscription operation binding the contract event 0x90bf57d01c8e0b51864909347f6f57c72cdcbdedcbd46bd1a215894bf9a1ab64.
//
// Solidity: event ChequeClaimed(address consumer, uint256 chequeSeqNo, uint256 amount)
func (_Vault *VaultFilterer) WatchChequeClaimed(opts *bind.WatchOpts, sink chan<- *VaultChequeClaimed) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "ChequeClaimed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultChequeClaimed)
				if err := _Vault.contract.UnpackLog(event, "ChequeClaimed", log); err != nil {
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

// ParseChequeClaimed is a log parse operation binding the contract event 0x90bf57d01c8e0b51864909347f6f57c72cdcbdedcbd46bd1a215894bf9a1ab64.
//
// Solidity: event ChequeClaimed(address consumer, uint256 chequeSeqNo, uint256 amount)
func (_Vault *VaultFilterer) ParseChequeClaimed(log types.Log) (*VaultChequeClaimed, error) {
	event := new(VaultChequeClaimed)
	if err := _Vault.contract.UnpackLog(event, "ChequeClaimed", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultDepositIterator is returned from FilterDeposit and is used to iterate over the raw logs and unpacked data for Deposit events raised by the Vault contract.
type VaultDepositIterator struct {
	Event *VaultDeposit // Event containing the contract specifics and raw log

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
func (it *VaultDepositIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultDeposit)
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
		it.Event = new(VaultDeposit)
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
func (it *VaultDepositIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultDepositIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultDeposit represents a Deposit event raised by the Vault contract.
type VaultDeposit struct {
	Consumer common.Address
	Amount   *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterDeposit is a free log retrieval operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address consumer, uint256 amount)
func (_Vault *VaultFilterer) FilterDeposit(opts *bind.FilterOpts) (*VaultDepositIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "Deposit")
	if err != nil {
		return nil, err
	}
	return &VaultDepositIterator{contract: _Vault.contract, event: "Deposit", logs: logs, sub: sub}, nil
}

// WatchDeposit is a free log subscription operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address consumer, uint256 amount)
func (_Vault *VaultFilterer) WatchDeposit(opts *bind.WatchOpts, sink chan<- *VaultDeposit) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "Deposit")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultDeposit)
				if err := _Vault.contract.UnpackLog(event, "Deposit", log); err != nil {
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

// ParseDeposit is a log parse operation binding the contract event 0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c.
//
// Solidity: event Deposit(address consumer, uint256 amount)
func (_Vault *VaultFilterer) ParseDeposit(log types.Log) (*VaultDeposit, error) {
	event := new(VaultDeposit)
	if err := _Vault.contract.UnpackLog(event, "Deposit", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultInvoiceIterator is returned from FilterInvoice and is used to iterate over the raw logs and unpacked data for Invoice events raised by the Vault contract.
type VaultInvoiceIterator struct {
	Event *VaultInvoice // Event containing the contract specifics and raw log

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
func (it *VaultInvoiceIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultInvoice)
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
		it.Event = new(VaultInvoice)
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
func (it *VaultInvoiceIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultInvoiceIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultInvoice represents a Invoice event raised by the Vault contract.
type VaultInvoice struct {
	Consumer  common.Address
	Due       *big.Int
	AssetRoot [32]byte
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterInvoice is a free log retrieval operation binding the contract event 0x58fbcd92fd1c371f6b1c07edebbf13c87efe9b31d5e2e634128a4f753ab5d13c.
//
// Solidity: event Invoice(address consumer, uint256 due, bytes32 assetRoot)
func (_Vault *VaultFilterer) FilterInvoice(opts *bind.FilterOpts) (*VaultInvoiceIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "Invoice")
	if err != nil {
		return nil, err
	}
	return &VaultInvoiceIterator{contract: _Vault.contract, event: "Invoice", logs: logs, sub: sub}, nil
}

// WatchInvoice is a free log subscription operation binding the contract event 0x58fbcd92fd1c371f6b1c07edebbf13c87efe9b31d5e2e634128a4f753ab5d13c.
//
// Solidity: event Invoice(address consumer, uint256 due, bytes32 assetRoot)
func (_Vault *VaultFilterer) WatchInvoice(opts *bind.WatchOpts, sink chan<- *VaultInvoice) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "Invoice")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultInvoice)
				if err := _Vault.contract.UnpackLog(event, "Invoice", log); err != nil {
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

// ParseInvoice is a log parse operation binding the contract event 0x58fbcd92fd1c371f6b1c07edebbf13c87efe9b31d5e2e634128a4f753ab5d13c.
//
// Solidity: event Invoice(address consumer, uint256 due, bytes32 assetRoot)
func (_Vault *VaultFilterer) ParseInvoice(log types.Log) (*VaultInvoice, error) {
	event := new(VaultInvoice)
	if err := _Vault.contract.UnpackLog(event, "Invoice", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultInvoicePayedIterator is returned from FilterInvoicePayed and is used to iterate over the raw logs and unpacked data for InvoicePayed events raised by the Vault contract.
type VaultInvoicePayedIterator struct {
	Event *VaultInvoicePayed // Event containing the contract specifics and raw log

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
func (it *VaultInvoicePayedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultInvoicePayed)
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
		it.Event = new(VaultInvoicePayed)
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
func (it *VaultInvoicePayedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultInvoicePayedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultInvoicePayed represents a InvoicePayed event raised by the Vault contract.
type VaultInvoicePayed struct {
	Consumer  common.Address
	AssetRoot [32]byte
	Amount    *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterInvoicePayed is a free log retrieval operation binding the contract event 0x2e48123b35b815cebf398419b12736b2da83731c2b336ea0a6db91ec4fe4a96a.
//
// Solidity: event InvoicePayed(address consumer, bytes32 assetRoot, uint256 amount)
func (_Vault *VaultFilterer) FilterInvoicePayed(opts *bind.FilterOpts) (*VaultInvoicePayedIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "InvoicePayed")
	if err != nil {
		return nil, err
	}
	return &VaultInvoicePayedIterator{contract: _Vault.contract, event: "InvoicePayed", logs: logs, sub: sub}, nil
}

// WatchInvoicePayed is a free log subscription operation binding the contract event 0x2e48123b35b815cebf398419b12736b2da83731c2b336ea0a6db91ec4fe4a96a.
//
// Solidity: event InvoicePayed(address consumer, bytes32 assetRoot, uint256 amount)
func (_Vault *VaultFilterer) WatchInvoicePayed(opts *bind.WatchOpts, sink chan<- *VaultInvoicePayed) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "InvoicePayed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultInvoicePayed)
				if err := _Vault.contract.UnpackLog(event, "InvoicePayed", log); err != nil {
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

// ParseInvoicePayed is a log parse operation binding the contract event 0x2e48123b35b815cebf398419b12736b2da83731c2b336ea0a6db91ec4fe4a96a.
//
// Solidity: event InvoicePayed(address consumer, bytes32 assetRoot, uint256 amount)
func (_Vault *VaultFilterer) ParseInvoicePayed(log types.Log) (*VaultInvoicePayed, error) {
	event := new(VaultInvoicePayed)
	if err := _Vault.contract.UnpackLog(event, "InvoicePayed", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultSubscriptionApprovedIterator is returned from FilterSubscriptionApproved and is used to iterate over the raw logs and unpacked data for SubscriptionApproved events raised by the Vault contract.
type VaultSubscriptionApprovedIterator struct {
	Event *VaultSubscriptionApproved // Event containing the contract specifics and raw log

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
func (it *VaultSubscriptionApprovedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultSubscriptionApproved)
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
		it.Event = new(VaultSubscriptionApproved)
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
func (it *VaultSubscriptionApprovedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultSubscriptionApprovedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultSubscriptionApproved represents a SubscriptionApproved event raised by the Vault contract.
type VaultSubscriptionApproved struct {
	Consumer common.Address
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterSubscriptionApproved is a free log retrieval operation binding the contract event 0xa92ec4720d066ecb45a6f0635f630ee0e0325431021e91901c61cb77f0c37695.
//
// Solidity: event SubscriptionApproved(address consumer)
func (_Vault *VaultFilterer) FilterSubscriptionApproved(opts *bind.FilterOpts) (*VaultSubscriptionApprovedIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "SubscriptionApproved")
	if err != nil {
		return nil, err
	}
	return &VaultSubscriptionApprovedIterator{contract: _Vault.contract, event: "SubscriptionApproved", logs: logs, sub: sub}, nil
}

// WatchSubscriptionApproved is a free log subscription operation binding the contract event 0xa92ec4720d066ecb45a6f0635f630ee0e0325431021e91901c61cb77f0c37695.
//
// Solidity: event SubscriptionApproved(address consumer)
func (_Vault *VaultFilterer) WatchSubscriptionApproved(opts *bind.WatchOpts, sink chan<- *VaultSubscriptionApproved) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "SubscriptionApproved")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultSubscriptionApproved)
				if err := _Vault.contract.UnpackLog(event, "SubscriptionApproved", log); err != nil {
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

// ParseSubscriptionApproved is a log parse operation binding the contract event 0xa92ec4720d066ecb45a6f0635f630ee0e0325431021e91901c61cb77f0c37695.
//
// Solidity: event SubscriptionApproved(address consumer)
func (_Vault *VaultFilterer) ParseSubscriptionApproved(log types.Log) (*VaultSubscriptionApproved, error) {
	event := new(VaultSubscriptionApproved)
	if err := _Vault.contract.UnpackLog(event, "SubscriptionApproved", log); err != nil {
		return nil, err
	}
	return event, nil
}

// VaultSubscriptionRejectedIterator is returned from FilterSubscriptionRejected and is used to iterate over the raw logs and unpacked data for SubscriptionRejected events raised by the Vault contract.
type VaultSubscriptionRejectedIterator struct {
	Event *VaultSubscriptionRejected // Event containing the contract specifics and raw log

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
func (it *VaultSubscriptionRejectedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(VaultSubscriptionRejected)
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
		it.Event = new(VaultSubscriptionRejected)
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
func (it *VaultSubscriptionRejectedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *VaultSubscriptionRejectedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// VaultSubscriptionRejected represents a SubscriptionRejected event raised by the Vault contract.
type VaultSubscriptionRejected struct {
	Consumer common.Address
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterSubscriptionRejected is a free log retrieval operation binding the contract event 0x4e4573f2b3412dd30c3eb085ba10ff1d2a2f65fed9915dacd6c4449323b4f821.
//
// Solidity: event SubscriptionRejected(address consumer)
func (_Vault *VaultFilterer) FilterSubscriptionRejected(opts *bind.FilterOpts) (*VaultSubscriptionRejectedIterator, error) {

	logs, sub, err := _Vault.contract.FilterLogs(opts, "SubscriptionRejected")
	if err != nil {
		return nil, err
	}
	return &VaultSubscriptionRejectedIterator{contract: _Vault.contract, event: "SubscriptionRejected", logs: logs, sub: sub}, nil
}

// WatchSubscriptionRejected is a free log subscription operation binding the contract event 0x4e4573f2b3412dd30c3eb085ba10ff1d2a2f65fed9915dacd6c4449323b4f821.
//
// Solidity: event SubscriptionRejected(address consumer)
func (_Vault *VaultFilterer) WatchSubscriptionRejected(opts *bind.WatchOpts, sink chan<- *VaultSubscriptionRejected) (event.Subscription, error) {

	logs, sub, err := _Vault.contract.WatchLogs(opts, "SubscriptionRejected")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(VaultSubscriptionRejected)
				if err := _Vault.contract.UnpackLog(event, "SubscriptionRejected", log); err != nil {
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

// ParseSubscriptionRejected is a log parse operation binding the contract event 0x4e4573f2b3412dd30c3eb085ba10ff1d2a2f65fed9915dacd6c4449323b4f821.
//
// Solidity: event SubscriptionRejected(address consumer)
func (_Vault *VaultFilterer) ParseSubscriptionRejected(log types.Log) (*VaultSubscriptionRejected, error) {
	event := new(VaultSubscriptionRejected)
	if err := _Vault.contract.UnpackLog(event, "SubscriptionRejected", log); err != nil {
		return nil, err
	}
	return event, nil
}
