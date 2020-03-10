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

func addHandler(w http.ResponseWriter, r *http.Request) {

	page := Page{ "Add", "Add a Meeting"}
	temp, err := template.ParseFiles("templates/add.html")

	if err != nil { fmt.Println("Err", err) }

	temp.Execute(w, page)
}

func submitHandler(w http.ResponseWriter, r *http.Request) {

	parseForm(r)

	http.Redirect(w, r, "/add", http.StatusFound)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hey dudes how we doin")
}

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/add", addHandler)
	http.HandleFunc("/saveDate", submitHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8080", nil)
}