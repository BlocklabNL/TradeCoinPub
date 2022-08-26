package http

import (
	"encoding/json"
	"net/http"

	"github.com/sirupsen/logrus"
)

// Config returns the configuration settings of the oracle.
// It doesn't require authentication and can be used as liveness check.
func Config(w http.ResponseWriter, r *http.Request) {
	reply := map[string]interface{}{
		"service": "product-service",
	}

	if err := json.NewEncoder(w).Encode(reply); err != nil {
		logrus.WithError(err).Error("could not send reply")
	}
}
