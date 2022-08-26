package database

import (
	"github.com/BlocklabNL/TradeCoin/apps/product-service/model"
	"github.com/jinzhu/gorm"
)

func PrePopulateDocumentTypes(db *gorm.DB) error {
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

	if err := tx.Where(&model.DocumentType{DocType: "Sales Order"}).FirstOrCreate(&model.DocumentType{DocType: "Sales Order", Desc: "Sales Order"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Purchase Order"}).FirstOrCreate(&model.DocumentType{DocType: "Purchase Order", Desc: "Purchase Order"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Commercial Invoice"}).FirstOrCreate(&model.DocumentType{DocType: "Commercial Invoice", Desc: "Commercial Invoice"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Proforma Invoice"}).FirstOrCreate(&model.DocumentType{DocType: "Proforma Invoice", Desc: "Proforma Invoice"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Certificate"}).FirstOrCreate(&model.DocumentType{DocType: "Certificate", Desc: "Certificate"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Certificate of Origin"}).FirstOrCreate(&model.DocumentType{DocType: "Certificate of Origin", Desc: "Certificate of Origin"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Certificate of Conformity"}).FirstOrCreate(&model.DocumentType{DocType: "Certificate of Conformity", Desc: "Certificate of Conformity"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Phytosanatiary Certficate"}).FirstOrCreate(&model.DocumentType{DocType: "Phytosanatiary Certficate", Desc: "Phytosanatiary Certficate"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Inspection Report"}).FirstOrCreate(&model.DocumentType{DocType: "Inspection Report", Desc: "Inspection Report"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Transport Order"}).FirstOrCreate(&model.DocumentType{DocType: "Transport Order", Desc: "Transport Order"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Bill of Lading"}).FirstOrCreate(&model.DocumentType{DocType: "Bill of Lading", Desc: "Bill of Lading"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "CMR"}).FirstOrCreate(&model.DocumentType{DocType: "CMR", Desc: "CMR"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Air Manifest"}).FirstOrCreate(&model.DocumentType{DocType: "Air Manifest", Desc: "Air Manifest"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "CIM"}).FirstOrCreate(&model.DocumentType{DocType: "CIM", Desc: "CIM"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Warehouse Receipt"}).FirstOrCreate(&model.DocumentType{DocType: "Warehouse Receipt", Desc: "Warehouse Receipt"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Import Document"}).FirstOrCreate(&model.DocumentType{DocType: "Import Document", Desc: "Import Document"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "EU-A"}).FirstOrCreate(&model.DocumentType{DocType: "EU-A", Desc: "EU-A"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Export Customs Document"}).FirstOrCreate(&model.DocumentType{DocType: "Export Customs Document", Desc: "Export Customs Document"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Dangerous Goods Declaration"}).FirstOrCreate(&model.DocumentType{DocType: "Dangerous Goods Declaration", Desc: "Dangerous Goods Declaration"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Weight Report"}).FirstOrCreate(&model.DocumentType{DocType: "Weight Report", Desc: "Weight Report"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Cupping And Rating Report"}).FirstOrCreate(&model.DocumentType{DocType: "Cupping And Rating Report", Desc: "Cupping And Rating Report"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	if err := tx.Where(&model.DocumentType{DocType: "Picture"}).FirstOrCreate(&model.DocumentType{DocType: "Picture", Desc: "Picture"}).Error; err != nil {
		tx.RollbackUnlessCommitted()
		return err
	}

	return tx.Commit().Error
}
