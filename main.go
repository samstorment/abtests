// $ go build; ./abtests		// this runs the app locally
package main

import (
	"fmt"
	"abtests/models"
	"abtests/routes"
)


func main() {

	if err := models.Init(); err != nil {
		fmt.Println("Error connecting to DB")
	}

	routes.NewRouter()
}
