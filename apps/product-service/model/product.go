package model

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
)

type Product struct {
	gorm.Model
	Tokenid      string         `json:"tokenid"`
	Tokenname    string         `json:"tokenname"`
	Status       string         `json:"status"`
	Commodity    string         `json:"commodity"`
	Amount       string         `json:"amount"`
	Unit         string         `json:"unit"`
	State        string         `json:"state"`
	Owner        common.Address `json:"owner"`
	Handler      common.Address `json:"handler"`
	Tokenuri     string         `json:"tokenuri"`
	Trans        pq.StringArray `json:"trans" gorm:"type:text[]"`
	RootHash     common.Hash    `json:"roothash"`
	LastTranHash common.Hash    `json:"lasttranhash"`
	Documents    []Document     `json:"documents" gorm:"many2many:product_documents;"`
	Events       []Event        `json:"events" gorm:"many2many:product_events;"`
}

type Document struct {
	gorm.Model
	DocumentHash common.Hash `json:"dochash"`
	Products     []Product   `json:"products" gorm:"many2many:product_documents;"`
}

type DocumentType struct {
	gorm.Model
	DocType string `json:"doctype" gorm:"unique;"`
	Desc    string `json:"desc"`
}

type Commodity struct {
	gorm.Model
	Name            string      `json:"name" gorm:"unique;"`
	Desc            string      `json:"desc"`
	Transformations []Transform `json:"transformations" gorm:"many2many:commodity_transformcommodity;"`
}

type Event struct {
	gorm.Model
	EventName       string          `json:"eventname"`
	EventDesc       string          `json:"eventdesc"`
	TokenId         string          `json:"tokenid"`
	RootHash        common.Hash     `json:"roothash"`
	TransactionHash common.Hash     `json:"tranhash"`
	ContractAddress common.Hash     `json:"contadd"`
	BlockHash       common.Hash     `json:"blockhash"`
	CreatorHash     common.Address  `json:"creatoraddress"`
	BlockNumber     uint64          `json:"blocknbr"`
	GeoLocation     string          `json:"geolocation"`
	TranIndex       uint            `json:"tranindex"`
	DynamicFields   []DynamicField  `json:"dynamicfields" gorm:"many2many:event_dynamicfields;"`
	EventDocuments  []EventDocument `json:"documents" gorm:"many2many:event_eventdocuments;"`
}
type EventDocument struct {
	gorm.Model
	DocumentHash common.Hash `json:"dochash"`
	DocumentType string      `json:"doctype"`
}

type DynamicField struct {
	gorm.Model
	FieldName  string `json:"fieldname"`
	FieldValue string `json:"fieldvalue"`
}

type Transform struct {
	gorm.Model
	Code           string  `json:"code"`
	Desc           string  `json:"desc"`
	SpecificWeight float32 `json:"spwt"`
}

type Units struct {
	gorm.Model
	Unit   string  `json:"unit"`
	Code   string  `json:"code"`
	Desc   string  `json:"desc"`
	Type   string  `json:"type"`
	Factor float32 `json:"factor"`
}
