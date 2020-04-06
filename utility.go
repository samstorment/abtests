package main

import (
	"net/http"
	"fmt"
)

// both these methods do about the same thing. Which is about nothing
func parseForm(r *http.Request) {


	// if the form is good, print the Form map
	if err := r.ParseForm(); err != nil {
		fmt.Println("Something messed up", err)
	} else {
		fmt.Println("Form:", r.PostForm)
	}
}

func processLogin(r *http.Request) {

	// if the form is good, print the username and password
	if err := r.ParseForm(); err != nil {
		fmt.Println("Something messed up", err)
	} else {
		username := r.FormValue("username")
		password := r.FormValue("password")
		fmt.Println(username, password)
	}
}