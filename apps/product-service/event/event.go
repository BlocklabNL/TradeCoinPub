package event

import (
	"encoding/json"
	"net/http"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/database"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/ethereum/go-ethereum/common"
	"github.com/sirupsen/logrus"
)

func GetAllEvents(w http.ResponseWriter, r *http.Request) {

	var (
		eventname      = r.URL.Query().Get("eventname")
		tokenid        = r.URL.Query().Get("tokenid")
		dochash        = r.URL.Query().Get("dochash")
		doctype        = r.URL.Query().Get("doctype")
		creatoraddress = r.URL.Query().Get("creatoraddress")
		queryEvent     model.Event
	)

	if eventname != "" {
		queryEvent.EventName = eventname
	}
	if tokenid != "" {
		queryEvent.TokenId = tokenid
	}
	if creatoraddress != "" {
		queryEvent.CreatorHash = common.HexToAddress(creatoraddress)
	}

	logrus.Println("inside GetAllEvents", eventname)
	database.MustConnect()
	db := database.DB()
	var events []model.Event
	db = db.Preload("EventDocuments").Preload("DynamicFields")

	if dochash != "" || doctype != "" {
		logrus.Println("Inside11")
		db = db.Joins("JOIN product_event_eventdocuments on product_event_eventdocuments.event_id=product_events.id").
			Joins("JOIN product_event_documents on product_event_documents.id=product_event_eventdocuments.event_document_id")

	}
	if dochash != "" {
		db = db.Where("product_event_documents.document_hash = ?", common.HexToHash(dochash))
	}
	if doctype != "" {
		db = db.Where("product_event_documents.document_type = ?", doctype)
	}

	logrus.Println("queryEvent")
	db = db.Where(queryEvent)
	db = db.Find(&events)

	if err := json.NewEncoder(w).Encode(&events); err != nil {
		logrus.WithError(err).Error("could not send product list reply")
	}
}

func parseProductData(r *http.Request) (model.Product, error) {

	logrus.Println(r.Body)

	var product model.Product
	err := json.NewDecoder(r.Body).Decode(&product)

	logrus.Println(product)

	if err != nil {
		return product, err
	}
	return product, nil
}

func parseEventData(r *http.Request) (model.Event, error) {

	logrus.Println(r.Body)

	var event model.Event
	err := json.NewDecoder(r.Body).Decode(&event)

	logrus.Println(event)

	if err != nil {
		return event, err
	}
	return event, nil
}
