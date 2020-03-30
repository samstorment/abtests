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
	page := Page{ "Form", "AB Form"}
	temp, err := template.ParseFiles("templates/form.html")

	if err != nil { fmt.Println("Err", err) }

	temp.Execute(w, page)
}

func submit(w http.ResponseWriter, r *http.Request) {
	parseForm(r)
	http.Redirect(w, r, "/form", http.StatusFound)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hey dudes how we doin")
}

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/submit", submit)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8080", nil)
}