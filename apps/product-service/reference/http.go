package reference

import (
	"github.com/go-chi/chi"
)

// NewRouter constructs the http router for the asset package.
func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Route("/", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Post("/transformation", CreateTransform)
			r.Get("/transformation", GetAllTransforms)
			r.Get("/transformation/{transformid}", GetTransform)
			r.Put("/transformation", UpdateTransform)
			r.Delete("/transformation/{transformid}", DeleteTransform)
			r.Get("/commodity", GetAllCommodities)
			r.Get("/commodity/{name}", GetCommodity)
			r.Post("/commodity", CreateCommodity)
			r.Delete("/commodity/{commodityid}", DeleteCommodity)
			r.Put("/commodity", UpdateCommodity)
			r.Get("/doctype", GetAllDocumentTypes)
			r.Get("/doctype/{doctype}", GetDocType)
			r.Post("/doctype", CreateDocType)
			r.Delete("/doctype/{doctypeid}", DeleteDocType)
			r.Put("/doctype", UpdateDocType)
			r.Post("/unit", CreateUnit)
			r.Get("/unit", GetAllUnits)
			r.Get("/unit/{unitid}", GetUnit)
			r.Put("/unit", UpdateUnit)
			r.Delete("/unit/{unitid}", DeleteUnit)
		})
		r.Group(func(r chi.Router) {
			// r.Get("/{owner:[0-9a-fA-F]+}/{asset:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}", FetchAsset)
			// r.Get("/{owner:[0-9a-fA-F]+}/{asset:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}/info", FetchAssetInfo)
			// r.Get(`/{owner:[0-9a-fA-F]+}/{email:[0-9a-fA-F]+}/{password:[0-9a-fA-F]+}/list`, FetchAllAssetDataFromOwner) //list
		})
	})

	return r
}
