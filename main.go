// $ go build; ./abtests		// this runs the app locally
package main

import (
	"net/http"
	"html/template"
	"fmt"
	"strings"
	"os"
	"abtests/models"
	"time"
)


func main() {

	if err := models.Init(); err != nil {
		fmt.Println("Error connecting to DB")
	}

	port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
	}

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/inbox", inboxHandler)
	http.HandleFunc("/sent", sentHandler)
	http.HandleFunc("/ticks", dbHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.ListenAndServe(":" + port, nil)
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


func dbHandler(w http.ResponseWriter, r *http.Request) {
	if _, err := models.Db.Exec("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)"); err != nil {
		fmt.Fprintf(w, "Error creating database table: %q", err)
		return
	}

	if _, err := models.Db.Exec("INSERT INTO ticks VALUES (now())"); err != nil {
		fmt.Fprintf(w, "Error incrementing tick: %q", err)
		return
	}

	rows, err := models.Db.Query("SELECT tick FROM ticks")
	if err != nil {
		fmt.Fprintf(w, "Error reading ticks: %q", err)
		return
	}

	defer rows.Close()
	for rows.Next() {
		var tick time.Time
		if err := rows.Scan(&tick); err != nil {
			fmt.Fprintf(w, "Error scanning ticks: %q", err)
			return
		}
		fmt.Fprintf(w, "Read from DB: %s\n", tick.String())
	}

}