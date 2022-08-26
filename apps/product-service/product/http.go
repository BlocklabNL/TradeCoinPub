package product

import (
	"github.com/go-chi/chi"
)

// NewRouter constructs the http router for the asset package.
func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Route("/", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Post("/", CreateProduct)
			r.Get("/", GetAllProducts)
			r.Get("/{productid}", GetProduct)
			r.Put("/", UpdateProduct)
			r.Delete("/{productid}", DeleteProduct)
			r.Get("/document/{dochash}", GetProductByDocument)
			r.Get("/{productid}/event/{eventid}", GetEvent)
			r.Delete("/{productid}/event/{eventid}", DeleteEvent)
			r.Post("/{productid}/event", CreateEvent)
			r.Get("/{productid}/event", GetAllEvents)
		})
		r.Group(func(r chi.Router) {
			// r.Get("/{owner:[0-9a-fA-F]+}/{asset:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}", FetchAsset)
			// r.Get("/{owner:[0-9a-fA-F]+}/{asset:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}/info", FetchAssetInfo)
			// r.Get(`/{owner:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}/list`, FetchAllAssetDataFromOwner) //list
		})
	})

	return r
}
