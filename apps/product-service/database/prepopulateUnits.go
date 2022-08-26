package database

import (
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/jinzhu/gorm"
)

func PrePopulateUnitTypes(db *gorm.DB) error {

	// Note the use of tx as the database handle once you are within a transaction
	tx := db.Begin()

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	if err := tx.Where(&model.Units{Unit: "Cubic Meter"}).FirstOrCreate(&model.Units{Unit: "Cubic Meter", Code: "m^3", Desc: "Length x Width x Height", Type: "Volume Unit", Factor: 1}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	if err := tx.Where(&model.Units{Unit: "Bushel"}).FirstOrCreate(&model.Units{Unit: "Bushel", Code: "(Bu)", Desc: "Bushel of Tea", Type: "Volume Unit", Factor: 28.3775918}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	if err := tx.Where(&model.Units{Unit: "Liter"}).FirstOrCreate(&model.Units{Unit: "Liter", Code: "(L)", Desc: "Liter", Type: "Volume Unit", Factor: 1000}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	if err := tx.Where(&model.Units{Unit: "Kilogram"}).FirstOrCreate(&model.Units{Unit: "Kilogram", Code: "(Kg)", Desc: "Kilogram", Type: "Weight Unit", Factor: 1}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	if err := tx.Where(&model.Units{Unit: "Gram"}).FirstOrCreate(&model.Units{Unit: "Gram", Code: "(G)", Desc: "Gram", Type: "Weight Unit", Factor: 1000}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	if err := tx.Where(&model.Units{Unit: "Ton"}).FirstOrCreate(&model.Units{Unit: "Ton", Code: "t", Desc: "Tonnes", Type: "Weight Unit", Factor: 0.001}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}
	return tx.Commit().Error
}
