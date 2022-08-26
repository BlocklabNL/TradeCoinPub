package database

import (
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/jinzhu/gorm"
)

func PrePopulateTransformations(db *gorm.DB) error {
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

	if err := tx.Where(&model.Transform{Code: "Raw", Desc: "Raw state of Coffee"}).FirstOrCreate(&model.Transform{Code: "Raw", Desc: "Raw state of Coffee", SpecificWeight: 561}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.Transform{Code: "Raw", Desc: "Raw state of Soy"}).FirstOrCreate(&model.Transform{Code: "Raw", Desc: "Raw state of Soy", SpecificWeight: 754}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.Transform{Code: "Raw", Desc: "Raw state of Tea"}).FirstOrCreate(&model.Transform{Code: "Raw", Desc: "Raw state of Tea", SpecificWeight: 124.15}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	return tx.Commit().Error
}
