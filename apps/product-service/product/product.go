package product

import (
	"encoding/json"
	"net/http"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/database"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/go-chi/chi"
	"github.com/sirupsen/logrus"
)

// Authorize authorizes a user to access a specific asset
func CreateProduct(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	product, err := parseProductData(r)
	if err != nil {
		http.Error(w, "Failed to parse product: "+err.Error(), http.StatusBadRequest)
		return
	}

	//Calculate root hash
	var hashString string
	for _, document := range product.Documents {
		hashString = hashString + document.DocumentHash.String()
	}
	roothash := crypto.Keccak256Hash([]byte(hashString))
	product.RootHash = roothash

	if err := db.Create(&product).Error; err != nil {

		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&product); err != nil {
		logrus.WithError(err).Error("could not send product reply")
	}
	return
}
func GetAllProducts(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	db := database.DB()
	var products []model.Product

	if err := db.Preload("Documents").Find(&products).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&products); err != nil {
		logrus.WithError(err).Error("could not send product list reply")
	}
}
func GetProduct(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		productid = chi.URLParam(r, "productid")
		db        = database.DB()
		product   model.Product
	)

	if err := db.Preload("Documents").First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&product); err != nil {
		logrus.WithError(err).Error("could not send product list reply")
	}
}

func GetProductByDocument(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		dochash  = common.HexToHash(chi.URLParam(r, "dochash"))
		db       = database.DB()
		document model.Document
	)

	logrus.Println(dochash)

	if err := db.Preload("Products").First(&document, "document_hash = ?", dochash).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&document); err != nil {
		logrus.WithError(err).Error("could not send product list reply")
	}
}

func UpdateProduct(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		product model.Product
	)

	productToUpdate, err := parseProductData(r)

	logrus.Println("----------------11")
	logrus.Println(productToUpdate)

	productid := productToUpdate.ID

	if err := db.Preload("Documents").First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	logrus.Println("----------------22")
	logrus.Println(product)

	if err != nil {
		http.Error(w, "Failed to parse product: "+err.Error(), http.StatusBadRequest)
		return
	}

	logrus.Println("----------------33")
	logrus.Println(product)

	product.Commodity = productToUpdate.Commodity
	product.Tokenid = productToUpdate.Tokenid
	product.Tokenname = productToUpdate.Tokenname
	product.State = productToUpdate.State
	product.Owner = productToUpdate.Owner
	product.Handler = productToUpdate.Handler
	product.Tokenuri = productToUpdate.Tokenuri
	product.Trans = productToUpdate.Trans
	product.Amount = productToUpdate.Amount
	product.Unit = productToUpdate.Unit
	product.Documents = productToUpdate.Documents
	product.LastTranHash = productToUpdate.LastTranHash

	if err := db.Save(&product).Error; err != nil {
		logrus.Println(err)
		return
	}

	//Calculate root hash
	var hashString string
	for _, document := range product.Documents {
		hashString = hashString + document.DocumentHash.String()
	}
	roothash := crypto.Keccak256Hash([]byte(hashString))

	product.RootHash = roothash

	if err := db.Save(&product).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}
func DeleteProduct(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		productid = chi.URLParam(r, "productid")
		product   model.Product
	)

	if err := db.First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	db.Model(&product).Association("Documents").Clear()

	if err := db.Delete(&model.Product{}, productid).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	logrus.Println("CreateEvent-----begin")
	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()
	var (
		productid = chi.URLParam(r, "productid")
		product   model.Product
	)
	logrus.Println("CreateEvent-----productid", productid)
	if err := db.Preload("Events").First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	logrus.Println("CreateEvent----------------")
	logrus.Println(product)
	event, err := parseEventData(r)
	if err != nil {
		http.Error(w, "Failed to parse event: "+err.Error(), http.StatusBadRequest)
		return
	}
	if err := db.Create(&event).Error; err != nil {
		logrus.Println(err)
		return
	}
	//link event to Product
	product.Events = append(product.Events, event)
	if err := db.Save(&product).Error; err != nil {
		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&event); err != nil {
		logrus.WithError(err).Error("could not send event reply")
	}
	return
}

func GetAllEvents(w http.ResponseWriter, r *http.Request) {
	logrus.Println("GetAllEvents-----begin")
	database.MustConnect()
	db := database.DB()
	var (
		productid = chi.URLParam(r, "productid")
		product   model.Product
	)
	logrus.Println("GetAllEvents-----productid", productid)
	if err := db.Preload("Events.DynamicFields").Preload("Events.EventDocuments").Preload("Events").First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&product.Events); err != nil {
		logrus.WithError(err).Error("could not send events reply")
	}
	return
}

func GetEvent(w http.ResponseWriter, r *http.Request) {
	logrus.Println("GetEvent-----begin")
	database.MustConnect()
	db := database.DB()
	var (
		productid = chi.URLParam(r, "productid")
		eventid   = chi.URLParam(r, "eventid")
		product   model.Product
	)
	logrus.Println("GetEvent-----productid", productid)
	logrus.Println("GetEvent-----eventid", eventid)
	if err := db.Preload("Events").First(&product, "id = ?", productid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&product.Events); err != nil {
		logrus.WithError(err).Error("could not send events reply")
	}
	return
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()
	var (
		eventid = chi.URLParam(r, "eventid")
		event   model.Event
	)

	if err := db.First(&event, "id = ?", eventid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	db.Model(&event).Association("DynamicFields").Clear()

	if err := db.Delete(&model.Event{}, eventid).Error; err != nil {
		logrus.Println(err)
		return
	}
	db.Commit()
	return

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
