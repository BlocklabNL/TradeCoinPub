package config

var (
	Prefix = "product"

	VaultKeyPass  = "passwd"
	UploadKeyPass = "password"

	HTTPAddr                  = "http.addr"
	HTTPAddrDefault           = "localhost"
	HTTPPort                  = "http.port"
	HTTPPortDefault           = 8080
	HTTPAllowedOrigins        = "http.vhosts"
	HTTPAllowedOriginsDefault = []string{"localhost"}
	HTTPUsers                 = "http.users"
	HTTPAdmins                = "http.admins"

	// Database setting
	DBDriver             = "db.driver"
	DBDriverDefault      = "mysql"
	DBConnectionString   = "db.connstring"
	DBUsername           = "db.username"
	DBPassword           = "db.password"
	DBShowQueries        = "db.show-queries"
	DBShowQueriesDefault = false

	// Smart contract settings
	EthereumNode                    = "ethereum.node"
	EthereumNodeDefault             = "https://node.ebl.dev/"
	ProductNFTContractAddress       = "0x3244dA7e76e2daC4950294C929673bBdA75Fd28a"
	CompositionNFTContractAddress   = "0x3A0995EEC8025D4f34F7FFC7b092b360167B4e19"
	CompositionSalesContractAddress = "0x3776a564c93dcE3eADb0Df8bc5DBFe20d0837298"

	LogLevel        = "log.level"
	LogLevelDefault = 4

	CollectionInterval                = "collection.interval"
	CollectionIntervalDefault         = "15m"
	MinCollectionAmount               = "collection.minamount"
	MinCollectionAmountDefault uint64 = 50000

	// Upload specific options
	AssetLabels = "asset.labels"
)
