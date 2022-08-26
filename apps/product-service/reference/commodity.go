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
func CreateCommodity(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	commodity, err := parseCommodityData(r)
	if err != nil {
		http.Error(w, "Failed to parse commodity: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := db.Create(&commodity).Error; err != nil {

		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&commodity); err != nil {
		logrus.WithError(err).Error("could not send commodity reply")
	}
	return
}

func GetAllCommodities(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	db := database.DB()
	var commodity []model.Commodity

	if err := db.Preload("Transformations").Find(&commodity).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&commodity); err != nil {
		logrus.WithError(err).Error("could not send commodity list reply")
	}
}

func GetCommodity(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		name      = chi.URLParam(r, "name")
		db        = database.DB()
		commodity model.Commodity
	)

	if err := db.Preload("Transformations").First(&commodity, "name = ?", name).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&commodity); err != nil {
		logrus.WithError(err).Error("could not send commodity list reply")
	}
}

func UpdateCommodity(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		commodity model.Commodity
	)

	commodityToUpdate, err := parseCommodityData(r)

	commodityid := commodityToUpdate.ID

	if err := db.Preload("Transformations").First(&commodity, "id = ?", commodityid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	logrus.Println("----------------before")
	logrus.Println(commodity)

	if err != nil {
		http.Error(w, "Failed to parse commodity: "+err.Error(), http.StatusBadRequest)
		return
	}

	commodity.Name = commodityToUpdate.Name
	commodity.Desc = commodityToUpdate.Desc

	logrus.Println("----------------after")
	logrus.Println(commodity)

	db.Model(&commodity).Association("Transformations").Clear()

	commodity.Transformations = commodityToUpdate.Transformations

	if err := db.Save(&commodity).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return
}

func DeleteCommodity(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		commodityid = chi.URLParam(r, "commodityid")
		commodity   model.Commodity
	)

	if err := db.First(&commodity, "id = ?", commodityid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	if err := db.Delete(&model.Commodity{}, commodityid).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return
}

func parseCommodityData(r *http.Request) (model.Commodity, error) {

	logrus.Println(r.Body)

	var commodity model.Commodity
	err := json.NewDecoder(r.Body).Decode(&commodity)

	logrus.Println(commodity)

	if err != nil {
		return commodity, err
	}
	return commodity, nil
}
