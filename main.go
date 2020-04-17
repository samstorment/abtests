package main

import (
	"net/http"
	"html/template"
	"fmt"
	"strings"
)

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/inbox", inboxHandler)
	http.HandleFunc("/sent", sentHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.ListenAndServe(":8080", nil)
}

type Page struct {
	Title string
	User string
}


func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Page Doesn't Exist", 404)
}

func inboxHandler(w http.ResponseWriter, r *http.Request) {
	page := Page{ "Inbox", "Profile"}
	temp, err := template.New("").ParseFiles("templates/inbox.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", &page)
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	page := Page{ "Inbox", "Profile"}
	temp, err := template.New("").ParseFiles("templates/form.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", &page)
}

func sentHandler(w http.ResponseWriter, r *http.Request) {

	funcMap := template.FuncMap {
        "lower": strings.ToLower,
    }
	headers := []string{"Term", "Type", "Course", "CRN", "Status", "From", "Date"}

	temp, err := template.New("").Funcs(funcMap).ParseFiles("templates/sent.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", struct {
		Title string
		User string
		Headers [] string
	} {
		"Sent",
		"Profile",
		headers, 
	})
}

