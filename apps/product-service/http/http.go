package http

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/config"
	"github.com/BlocklabNL/TradeCoin/apps/product-service/process"
	"github.com/go-chi/chi"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// Run the given multiplexer until the context expires
func Run(ctx context.Context, r *chi.Mux) {
	addr := fmt.Sprintf("%s:%d",
		viper.GetString(config.HTTPAddr), viper.GetUint(config.HTTPPort))

	log.Infof("start HTTP RPC service on %s", addr)

	srv := &http.Server{
		Handler:      r,
		Addr:         addr,
		IdleTimeout:  60 * time.Second,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	go func() {
		process.Increment()
		defer process.Decrement()

		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			log.WithError(err).Error("listen and serve failed")
		}
	}()

	go func() {
		<-ctx.Done()
		_ = srv.Shutdown(context.Background())
	}()
}
