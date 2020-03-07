// build with "go build". execute with "./First_Try.exe"
package main

import (
	"fmt"
	"time"
	"strconv"
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


func main() {

	course := &Course {}
	course = course.exampleCourse()

	contact := &Contact {}
	contact = contact.exampleContact()

	form := Form {
		"Computer Science",
		"",
		*contact,
		*course,
	}

	fmt.Println(form)

}