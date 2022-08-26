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
func CreateTransform(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	transform, err := parseTransformData(r)
	if err != nil {
		http.Error(w, "Failed to parse Transform: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := db.Create(&transform).Error; err != nil {

		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&transform); err != nil {
		logrus.WithError(err).Error("could not send Transform reply")
	}
	return
}
func GetAllTransforms(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	db := database.DB()
	var transforms []model.Transform

	if err := db.Find(&transforms).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&transforms); err != nil {
		logrus.WithError(err).Error("could not send Transform list reply")
	}
}
func GetTransform(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		transformid = chi.URLParam(r, "transformid")
		db          = database.DB()
		transform   model.Transform
	)

	if err := db.First(&transform, "id = ?", transformid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&transform); err != nil {
		logrus.WithError(err).Error("could not send Transform list reply")
	}
}

func UpdateTransform(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		transform model.Transform
	)

	transformToUpdate, err := parseTransformData(r)

	logrus.Println("----------------11")
	logrus.Println(transformToUpdate)

	transformid := transformToUpdate.ID

	if err := db.First(&transform, "id = ?", transformid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	if err != nil {
		http.Error(w, "Failed to parse Transform: "+err.Error(), http.StatusBadRequest)
		return
	}

	transform.Desc = transformToUpdate.Desc
	transform.Code = transformToUpdate.Code
	transform.SpecificWeight = transformToUpdate.SpecificWeight

	if err := db.Save(&transform).Error; err != nil {
		logrus.Println(err)
		return
	}

	if err := db.Save(&transform).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}
func DeleteTransform(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		transformid = chi.URLParam(r, "transformid")
		transform   model.Transform
	)
	print("transformid to be deleted:", transformid)
	if err := db.First(&transform, "id = ?", transformid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// db.Model(&transform).Association("Documents").Clear()

	if err := db.Delete(&model.Transform{}, transformid).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}

func parseTransformData(r *http.Request) (model.Transform, error) {

	logrus.Println(r.Body)

	var transform model.Transform
	err := json.NewDecoder(r.Body).Decode(&transform)

	logrus.Println(transform)

	if err != nil {
		return transform, err
	}
	return transform, nil
}
