// build with "go build". execute with "./First_Try.exe"
package main

import (
	"fmt"		// Formatting - Nice printing
	"time"	
	"strconv"	// string conversion
	"net/http"
	"html/template"
)


// prints a formatted date and time. pass everything as an int except "am" or "pm"
func printDate(year, month, day, hour, minute, second int, ampm string) {

	start := time.Date(year, time.Month(month), day, hour, minute, second, 0, time.UTC)

	yr := start.Year()
	mon := start.Month()
	// convert the four below to strings for easier printing
	dy := strconv.Itoa(start.Day())
	hr := strconv.Itoa(start.Hour())
	min := strconv.Itoa(start.Minute())
	sec := strconv.Itoa(start.Second())

	// if the seconds is less than 10, it prints weird: ex - 12:45:9
	if start.Second() < 10 {
		sec = "0" + sec // here we want that to be 12:45:09
	}
	// print a formatted date and time
	fmt.Println(mon, dy + ",", yr, hr + ":" + min + ":" + sec, ampm)
}

type Page struct {
	Title string
	Header string
}

func addHandler(w http.ResponseWriter, r *http.Request) {

	page := Page{ "Add", "Add Dates and Times"}
	temp, err := template.ParseFiles("add.html")

	if err != nil { fmt.Println("Err", err) }

	temp.Execute(w, page)
}



func inputHandler(w http.ResponseWriter, r *http.Request) {

	page := Page{ "Gimme a name", "Any name"}
	temp, err := template.ParseFiles("input.html")

	if err != nil { fmt.Println("Err", err) }

	temp.Execute(w, page)
}

func saveHandler(w http.ResponseWriter, r *http.Request) {

	name := r.FormValue("name")
	comment := r.FormValue("comment")

	fmt.Println(name)
	fmt.Println(comment)

	http.Redirect(w, r, "/input", http.StatusFound)

}


func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hey dudes how we doin")

}

func main() {

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/add", addHandler)
	http.HandleFunc("/input", inputHandler)
	http.HandleFunc("/save", saveHandler)
	http.ListenAndServe(":8080", nil)

}