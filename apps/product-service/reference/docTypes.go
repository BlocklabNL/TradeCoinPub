package reference

import (
	"encoding/json"
	"net/http"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/database"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/go-chi/chi"
	"github.com/sirupsen/logrus"
)

// Authorize authorizes a user to access a specific asset
func CreateDocType(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	docType, err := parseDocTypeData(r)
	if err != nil {
		http.Error(w, "Failed to parse docType: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := db.Create(&docType).Error; err != nil {

		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&docType); err != nil {
		logrus.WithError(err).Error("could not send docType reply")
	}
	return
}

func GetAllDocumentTypes(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	db := database.DB()
	var docType []model.DocumentType

	if err := db.Find(&docType).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&docType); err != nil {
		logrus.WithError(err).Error("could not send docType list reply")
	}
}

func GetDocType(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		docTypeName = chi.URLParam(r, "doctype")
		db          = database.DB()
		docType     model.DocumentType
	)

	if err := db.First(&docType, "docType = ?", docTypeName).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&docType); err != nil {
		logrus.WithError(err).Error("could not send docType list reply")
	}
}

func UpdateDocType(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		docType model.DocumentType
	)

	docTypeToUpdate, err := parseDocTypeData(r)

	logrus.Println("----------------11")
	logrus.Println(docTypeToUpdate)

	docTypeId := docTypeToUpdate.ID

	if err := db.First(&docType, "id = ?", docTypeId).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	logrus.Println("----------------22")
	logrus.Println(docType)

	if err != nil {
		http.Error(w, "Failed to parse docType: "+err.Error(), http.StatusBadRequest)
		return
	}

	logrus.Println("----------------33")
	logrus.Println(docType)

	docType.DocType = docTypeToUpdate.DocType
	docType.Desc = docTypeToUpdate.Desc

	logrus.Println("----------------44")
	logrus.Println(docType)

	if err := db.Save(&docType).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return
}

func DeleteDocType(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		docTypeid = chi.URLParam(r, "docTypeid")
		docType   model.DocumentType
	)

	if err := db.First(&docType, "id = ?", docTypeid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	if err := db.Delete(&model.DocumentType{}, docTypeid).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return
}

func parseDocTypeData(r *http.Request) (model.DocumentType, error) {

	logrus.Println(r.Body)

	var docType model.DocumentType
	err := json.NewDecoder(r.Body).Decode(&docType)

	logrus.Println(docType)

	if err != nil {
		return docType, err
	}
	return docType, nil
}
