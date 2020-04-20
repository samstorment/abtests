// $ go build; ./abtests		// this runs the app locally
package main

import (
	"fmt"
	"os"
	"net/http"
	"abtests/models"
	"abtests/routes"
)


func main() {

	if err := models.Init(); err != nil {
		fmt.Println("Error connecting to DB")
	}

	port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
	}
	
	router := routes.NewRouter()

	http.Handle("/", router)
	http.ListenAndServe(":" + port, nil)
}
