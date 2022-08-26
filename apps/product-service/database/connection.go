package database

import (
	"fmt"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/config"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mssql"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

var (
	gdb *gorm.DB
)

func init() {
	gorm.DefaultTableNameHandler = func(db *gorm.DB, defaultTableName string) string {
		return config.Prefix + "_" + defaultTableName
	}
}

func MustConnect() *gorm.DB {
	var (
		driver     = viper.GetString(config.DBDriver)
		connString = viper.GetString(config.DBConnectionString)
		username   = viper.GetString(config.DBUsername)
		password   = viper.GetString(config.DBPassword)
	)

	log.Infof("database driver %s", driver)
	db, err := gorm.Open(driver, fmt.Sprintf(connString, username, password))
	if err != nil {
		log.WithError(err).Fatal("could not open database")
	}
	gdb = db

	if viper.GetBool(config.DBShowQueries) {
		gdb.LogMode(true)
		l := log.New()
		gdb.SetLogger(l)
	}
	return gdb
}

func DB() *gorm.DB {
	return gdb
}

// SetDB sets the globally used database. This function should only be used in
// unittests. Normal operation should init the database connection pool with
// MustConnect.
func SetDB(db *gorm.DB) {
	gdb = db
}
