// build with "go build -o a". execute with "./a"
package main

import (
	"fmt"		// Formatting - Nice printing	
	"net/http"
	"html/template"
)


type Page struct {
	Title string
	Header string
}

func formHandler(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	username := r.FormValue("username")
	password := r.FormValue("password")

	page := Page{ username, password }
	temp, err := template.ParseFiles("templates/form.html")

	if err != nil { fmt.Println("Error", err) }

	temp.Execute(w, page)
}

func submitForm(w http.ResponseWriter, r *http.Request) {
	parseForm(r)
	http.Redirect(w, r, "/form", http.StatusFound)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {

	temp, err := template.ParseFiles("templates/login.html")
	if err != nil { fmt.Println("Error", err) }
	temp.Execute(w, nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hey dudes how we doin")
}

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/submit", submitForm)
	http.HandleFunc("/login", loginHandler)


	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8080", nil)
}