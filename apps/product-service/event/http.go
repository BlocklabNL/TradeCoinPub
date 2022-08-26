package event

import (
	"github.com/go-chi/chi"
)

// NewRouter constructs the http router for the asset package.
func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Route("/", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Get("/", GetAllEvents)
		})
		r.Group(func(r chi.Router) {
		})
	})

	return r
}
