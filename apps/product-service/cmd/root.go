package cmd

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/event"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/listeners/tradecoin"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/listeners/tradecoincomp"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/listeners/tradecoinsales"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/product"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/reference"
	"github.com/ethereum/go-ethereum/common"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/config"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/database"
	http2 "github.com/BlocklabNL/TradeCoin/apps/product-service/http"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

type wgKey struct{}

var (
	cacheMu              sync.RWMutex
	cache                = make(map[common.Hash][]tradeCoinAsset)
	cacheTradeCoinStarts = make(map[common.Hash]tradeCoinAsset)

	buildOn string
	gitHash string
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "product-service",
	Short: "Runs the product service",
	Long:  `product service for tradecoin applicaiton`,
	Run:   run,
}

var cfgFile string

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.cobra.yaml)")

	rootCmd.PersistentFlags().StringSlice(config.HTTPAllowedOrigins, config.HTTPAllowedOriginsDefault, "HTTP RPC allowed origins list")
	rootCmd.PersistentFlags().String(config.HTTPAddr, config.HTTPAddrDefault, "HTTP RPC bind")
	rootCmd.PersistentFlags().Int(config.HTTPPort, config.HTTPPortDefault, "HTTP RPC port")
	rootCmd.PersistentFlags().String(config.HTTPUsers, "", "HTTP RPC users")
	rootCmd.PersistentFlags().String(config.HTTPAdmins, "", "HTTP RPC admins")

	rootCmd.PersistentFlags().String(config.DBDriver, config.DBDriverDefault, "database driver [mysql,postgres,sqlite3,mssql]")
	rootCmd.PersistentFlags().String(config.DBConnectionString, "", "database connection string (can contain two template placeholders, %[1]s contains the provided username and %[2]s contains the provided password")
	rootCmd.PersistentFlags().String(config.DBUsername, "", "database username")
	rootCmd.PersistentFlags().String(config.DBPassword, "", "database password")
	rootCmd.PersistentFlags().Int(config.LogLevel, config.LogLevelDefault, "log level [0=panic,1=fatal,2=err,3=warm,4=info,5=debug,6=trace]")
	rootCmd.PersistentFlags().Bool(config.DBShowQueries, config.DBShowQueriesDefault, "log database queries")
	rootCmd.PersistentFlags().String(config.CollectionInterval, config.CollectionIntervalDefault, "interval how often to check subscription for claiming/collection")
	rootCmd.PersistentFlags().Uint64(config.MinCollectionAmount, config.MinCollectionAmountDefault, "minimal collection amount for credit subscription")

	if err := viper.BindPFlags(rootCmd.PersistentFlags()); err != nil {
		logrus.WithError(err).Fatal("could not bind flags")
	}
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	}

	viper.SetEnvPrefix(config.Prefix)
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	viper.AutomaticEnv() // read in environment variables that match

	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}

	logLvl := viper.GetInt(config.LogLevel)
	logrus.SetLevel(logrus.Level(logLvl))
}

func run(cmd *cobra.Command, args []string) {
	var (
		r         = router()
		ctx, stop = context.WithCancel(context.Background())
	)

	// start background go-routines and wait for signal to stop
	var wg sync.WaitGroup
	wg.Add(2)

	// instantiate listener.go/cache and metrics.go
	go tradecoin.StartCache(ctx, false)
	go tradecoincomp.StartCache(ctx, false)
	go tradecoinsales.StartCache(ctx, false)

	database.MustConnect()
	database.MustCreateV2Schema()

	// disable dept collection since its not fully implemented/tested and not required
	// invoice.MustGenerate(ctx)

	http2.Run(ctx, r)

	sigint := make(chan os.Signal, 1)
	signal.Notify(sigint, os.Interrupt)
	signal.Notify(sigint, syscall.SIGTERM)
	<-sigint

	log.Info("shutdown initiated...")
	stop()

	// wait till all go-routines stopped
	wg.Wait()
	log.Info("shutdown finished")
}

// router sets up all the application routers. One router endpoint is the
// /metrics endpoint which outputs data regarding the server. All other endpoints
// can be reached under the /v1 router.
func router() *chi.Mux {
	var (
		r         = chi.NewRouter()
		product   = product.NewRouter()
		reference = reference.NewRouter()
		event     = event.NewRouter()
	)

	r.Use(middleware.Heartbeat("/health"))
	r.Use(cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
		AllowedHeaders: []string{"Accept", "Access-Control-Allow-Origin", "Authorization", "Content-Type", "X-CSRF-Token"},
		MaxAge:         300,
	}).Handler)
	r.Use(http2.NewPrometheusMetricsLogger())
	r.Get("/config", http2.Config)

	// root paths
	r.Mount("/product", product)
	r.Mount("/reference", reference)
	r.Mount("/event", event)

	return r

}
