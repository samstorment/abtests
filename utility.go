package main

import (
	"net/http"
	// "encoding/json"
	"fmt"
)

func parseForm(r *http.Request) {

	if err := r.ParseForm(); err != nil {
		fmt.Println("Something messed up", err)
	} else {
		fmt.Println(r.PostForm)
	}
}

func processLogin(r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Println("Something messed up", err)
	} else {

		username := r.FormValue("username")
		password := r.FormValue("password")

		fmt.Println(username, password)
	}
}