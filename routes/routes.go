package routes

import (
	"net/http"
	"html/template"
	"fmt"
	"strings"
	"github.com/gorilla/mux"
	"abtests/models"
	"abtests/sessions"
	"abtests/middleware"
)

func NewRouter() *mux.Router {

	router := mux.NewRouter()


	router.HandleFunc("/home", homeHandler)
	router.HandleFunc("/form", formHandler)
	router.HandleFunc("/", middleware.AuthRequired(inboxHandler))
	router.HandleFunc("/sent", sentHandler)
	router.HandleFunc("/ticks", dbHandler)
	router.HandleFunc("/login", loginHandler)
	router.HandleFunc("/logout", logoutHandler)

	router.HandleFunc("/course/{courseId}", summaryHandler)

	fileServer := http.FileServer(http.Dir("./static/"))
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static", fileServer))

	return router
}

type Page struct {
	Title string
	User string
}


func homeHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Page Doesn't Exist", 404)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {

	if (r.Method == "GET") {
		temp, err := template.ParseFiles("templates/login.html")
		if err != nil { fmt.Println("Err", err) }
		temp.Execute(w, nil)
	} else if (r.Method == "POST") {

		r.ParseForm()
		username := r.PostFormValue("username")
		// this is where we would get the user's id from the db, im just hardcoding to test

		if (username == "admin") {
			userId := 1
			session, _ := sessions.Store.Get(r, "session")
			session.Values["user_id"] = userId
			session.Save(r, w)
			http.Redirect(w, r, "/", 302)

		} else if (username == "standard") {
			userId := 2
			session, _ := sessions.Store.Get(r, "session")
			session.Values["user_id"] = userId
			session.Save(r, w)
			http.Redirect(w, r, "/", 302)
			
		} else {
			temp, err := template.ParseFiles("templates/login.html")
			if err != nil { fmt.Println("Err", err) }
			temp.Execute(w, "Username " + username + " does not exist")
		}
	}
}

// when a get request is made to /inbox
func inboxHandler(w http.ResponseWriter, r *http.Request) {

	// get the username from the session. Normally we would get the id not the username, but we're testing
	username := sessions.GetUsername(r)

	// display the username in the inbox
	page := Page{ "Inbox", username}
	temp, err := template.New("").ParseFiles("templates/inbox.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", &page)
}

// when a get request is made to /logout we clear the cookies and redirect to the login page
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := sessions.Store.Get(r, "session")
	delete(session.Values, "user_id")
	session.Save(r, w)
	http.Redirect(w, r, "/login", 302)
}


func formHandler(w http.ResponseWriter, r *http.Request) {


	page := Page{ "Inbox", "Profile"}
	temp, err := template.New("").ParseFiles("templates/form.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", &page)
}

func sentHandler(w http.ResponseWriter, r *http.Request) {

	username := sessions.GetUsername(r)

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
		username,
		headers, 
	})
}


func summaryHandler(w http.ResponseWriter, r *http.Request) {

	// get the username from the session. Normally we would get the id not the username, but we're testing
	username := sessions.GetUsername(r)

	vars := mux.Vars(r)
	courseId := vars["courseId"]

	temp, err := template.New("").ParseFiles("templates/summary.html", "templates/layout.html")
	if err != nil { fmt.Println("Err", err) }
	temp.ExecuteTemplate(w, "layout", struct {
		Title string
		User string
		CourseId string
	} {
		"Summary",
		username,
		courseId,
	})
}

func dbHandler(w http.ResponseWriter, r *http.Request) {

	// get all the ticks from the DB
	ticks, err := models.GetTicks()
	if err != nil {
		fmt.Fprintf(w, "Error getting tick: %q", err)
	}
	// print all the times to the browser
	for _, v := range ticks {
		fmt.Fprintf(w, "Read from DB: %s\n", v.String())
	}
}