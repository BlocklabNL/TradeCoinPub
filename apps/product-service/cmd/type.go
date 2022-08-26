package cmd

import "github.com/ethereum/go-ethereum/common"

type tradeCoinAsset struct {
	Hash        common.Hash     `json:"hash"`
	Initiator   *common.Address `json:"initiator,omitempty"`
	Transaction common.Hash     `json:"txHash"`
	BlockHash   common.Hash     `json:"blockHash"`
	BlockNumber uint64          `json:"blockNumber"`
	TxIndex     uint            `json:"txIndex"`
}
