package database

import (
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/sirupsen/logrus"
)

func MustCreateV2Schema() {

	db := DB()

	if err := db.AutoMigrate(&model.Product{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate asset table")
	}

	if err := db.AutoMigrate(&model.Document{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate Document")
	}

	if err := db.AutoMigrate(&model.DocumentType{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate DocumentType")
	}

	if err := db.AutoMigrate(&model.Commodity{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate Commodity")
	}

	if err := db.AutoMigrate(&model.Event{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate Event")
	}

	if err := db.AutoMigrate(&model.DynamicField{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate EventDynamicField")
	}

	if err := db.AutoMigrate(&model.Transform{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate Transform")

	}

	if err := db.AutoMigrate(&model.EventDocument{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate EventDocument")
	}

	if err := db.AutoMigrate(&model.Units{}).Error; err != nil {
		logrus.WithError(err).Fatal("could not migrate Units")

	}

	if err := PrePopulateDocumentTypes(db); err != nil {
		logrus.WithError(err).Fatal("could not prepopulate DocumentTypes")
	}

	if err := PrePopulateUnitTypes(db); err != nil {
		logrus.WithError(err).Fatal("could not prepopulate UnitTypes")
	}

	if err := PrePopulateTransformations(db); err != nil {
		logrus.WithError(err).Fatal("could not prepopulate Transformations")
	}
}
