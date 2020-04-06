// build with "go build -o a". execute with "./a". Can batch into one statment with "go build -o a; ./a"
package main

import (
	"fmt"		// Formatting - Nice printing	
	"net/http"
	"html/template"
)

// The way i handle routes is bad here. This whole server is pretty much garbage
func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/submit", submitForm)
	http.HandleFunc("/form", loginHandler)


	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	http.ListenAndServe(":8080", nil)
}

type Page struct {
	Title string
	Header string
}

func submitForm(w http.ResponseWriter, r *http.Request) {
	parseForm(r)
	http.Redirect(w, r, "/form", http.StatusFound)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {

	// 
	if r.Method == http.MethodGet {
		temp, err := template.ParseFiles("templates/login.html")
		if err != nil { fmt.Println("Error parsing template", err) }
		temp.Execute(w, nil)
	}

	if r.Method == http.MethodPost {
	
		parseForm(r) // this line just prints the formn content, not necessary
		r.ParseForm() // this line actually parses the form content from the request body

		// Get the username and password from the login form
		username := r.FormValue("username")
		password := r.FormValue("password")

		// Some sweet user authentication
		if username != "Sam" {
			page := Page{ "error", username + " doesn't exist"}
			temp, err := template.ParseFiles("templates/login.html")
			if err != nil { fmt.Println("Error", err) }
			temp.Execute(w, page)
		} else {
			page := Page{ username, password }
			temp, err := template.ParseFiles("templates/form.html")
			if err != nil { fmt.Println("Error", err) }
			temp.Execute(w, page)
		}

	}
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Page Doesn't Exist", 404)
}
