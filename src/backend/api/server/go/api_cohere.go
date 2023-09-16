/*
 * Simple Terms - OpenAPI 3.0
 *
 * This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach! You can now help us improve the API whether it's by making changes to the definition itself or to the code. That way, with time, we can improve the API in general, and expose some of the new features in OAS3.  _If you're looking for the Swagger 2.0/OAS 2.0 version of Petstore, then click [here](https://editor.swagger.io/?url=https://petstore.swagger.io/v2/swagger.yaml). Alternatively, you can load via the `Edit > Load Petstore OAS 2.0` menu option!_  Some useful links: - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore) - [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
 *
 * API version: 1.0.11
 * Contact: linofbaoze@outlook.com
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	// "encoding/json"
	"net/http"
	"strings"

	// "github.com/gorilla/mux"
)

// CohereAPIController binds http requests to an api service and writes the service results to the http response
type CohereAPIController struct {
	service CohereAPIServicer
	errorHandler ErrorHandler
}

// CohereAPIOption for how the controller is set up.
type CohereAPIOption func(*CohereAPIController)

// WithCohereAPIErrorHandler inject ErrorHandler into controller
func WithCohereAPIErrorHandler(h ErrorHandler) CohereAPIOption {
	return func(c *CohereAPIController) {
		c.errorHandler = h
	}
}

// NewCohereAPIController creates a default api controller
func NewCohereAPIController(s CohereAPIServicer, opts ...CohereAPIOption) Router {
	controller := &CohereAPIController{
		service:      s,
		errorHandler: DefaultErrorHandler,
	}

	for _, opt := range opts {
		opt(controller)
	}

	return controller
}

// Routes returns all the api routes for the CohereAPIController
func (c *CohereAPIController) Routes() Routes {
	return Routes{
		"GetPractices": Route{
			strings.ToUpper("Get"),
			"/cohere/getPractices",
			c.GetPractices,
		},
	}
}

// GetPractices - Gets the poor practices provided a terms of service-esque
func (c *CohereAPIController) GetPractices(w http.ResponseWriter, r *http.Request) {
	documentParam := r.Header.Get("document")
	result, err := c.service.GetPractices(r.Context(), documentParam)
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)
}