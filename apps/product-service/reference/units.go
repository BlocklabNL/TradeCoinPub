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
func CreateUnit(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	unit, err := parseUnitData(r)
	if err != nil {
		http.Error(w, "Failed to parse Transform: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := db.Create(&unit).Error; err != nil {

		logrus.Println(err)
		return
	}
	db.Commit()
	if err := json.NewEncoder(w).Encode(&unit); err != nil {
		logrus.WithError(err).Error("could not send Unit reply")
	}
	return
}
func GetAllUnits(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	db := database.DB()
	var units []model.Units

	if err := db.Find(&units).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&units); err != nil {
		logrus.WithError(err).Error("could not send Units list reply")
	}
}
func GetUnit(w http.ResponseWriter, r *http.Request) {
	database.MustConnect()
	var (
		unitid = chi.URLParam(r, "unitid")
		db     = database.DB()
		unit   model.Units
	)

	if err := db.First(&unit, "id = ?", unitid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if err := json.NewEncoder(w).Encode(&unit); err != nil {
		logrus.WithError(err).Error("could not send Unit list reply")
	}
}

func UpdateUnit(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		unit model.Units
	)

	unitToUpdate, err := parseUnitData(r)

	logrus.Println("----------------11")
	logrus.Println(unitToUpdate)

	unitid := unitToUpdate.ID

	if err := db.First(&unit, "id = ?", unitid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	if err != nil {
		http.Error(w, "Failed to parse Unit: "+err.Error(), http.StatusBadRequest)
		return
	}

	unit.Unit = unitToUpdate.Unit
	unit.Desc = unitToUpdate.Desc
	unit.Code = unitToUpdate.Code
	unit.Type = unitToUpdate.Type
	unit.Factor = unitToUpdate.Factor

	if err := db.Save(&unit).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}
func DeleteUnit(w http.ResponseWriter, r *http.Request) {

	db := database.DB().Begin()
	defer db.RollbackUnlessCommitted()

	var (
		unitid = chi.URLParam(r, "unitid")
		unit   model.Units
	)
	print("unitid to be deleted:", unitid)
	if err := db.First(&unit, "id = ?", unitid).Error; err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// db.Model(&transform).Association("Documents").Clear()

	if err := db.Delete(&model.Units{}, unitid).Error; err != nil {
		logrus.Println(err)
		return
	}

	db.Commit()

	return

}

func parseUnitData(r *http.Request) (model.Units, error) {

	logrus.Println(r.Body)

	var unit model.Units
	err := json.NewDecoder(r.Body).Decode(&unit)

	logrus.Println(unit)

	if err != nil {
		return unit, err
	}
	return unit, nil
}
