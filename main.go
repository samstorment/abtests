package main

import (
	"net/http"
	"html/template"
	"fmt"
)

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/inbox", inboxHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Page Doesn't Exist", 404)
}

func formHandler(w http.ResponseWriter, r *http.Request) {

	temp, err := template.ParseFiles("templates/form.html")
	if err != nil { fmt.Println("Err", err) }
	temp.Execute(w, nil)
}

func inboxHandler(w http.ResponseWriter, r *http.Request) {

	temp, err := template.ParseFiles("templates/inbox.html")
	if err != nil { fmt.Println("Err", err) }
	temp.Execute(w, nil)
}

