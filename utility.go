package main

import (
	"net/http"
	"strconv"
	"strings"
	"time"
	"fmt"
)

// prints a formatted date and time. pass everything as an int except "am" or "pm"
func printDate(year, month, day, hour, minute, second int) {

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
	fmt.Println(mon, dy + ",", yr, hr + ":" + min + ":" + sec)
}

func parseForm(r *http.Request) {

	db := connect()

	r.ParseForm()

	dates := make(map[string]Date)
	times := make(map[string]Time)

	for key, values := range r.Form { 
		for _, value := range values {
			
			if key != "submit" {

				typeNum := strings.Split(key, "-")
				typ := typeNum[0]
				n := typeNum[1]

				if (typ == "date") {

					date := strings.Split(value, "-")

					year, _ := strconv.Atoi(date[0])
					month, _ := strconv.Atoi(date[1])
					day, _ := strconv.Atoi(date[2])

					dates[n] = Date{ day: day, month: month, year: year }
					
				} else if (typ == "start") {

					time := strings.Split(value, ":")
					hour, _ := strconv.Atoi(time[0])
					minute, _ := strconv.Atoi(time[1])

					if _, isInMap := times[n]; isInMap {
						t := times[n]
						ehour := t.endHour
						eminute := t.endMinute
						times[n] = Time{ hour, minute, ehour, eminute }
					} else {
						times[n] = Time{ startHour: hour, startMinute: minute}
					}

				} else if (typ == "end") {

					time := strings.Split(value, ":")
					hour, _ := strconv.Atoi(time[0])
					minute, _ := strconv.Atoi(time[1])

					if _, isInMap := times[n]; isInMap {
						t := times[n]
						shour := t.startHour
						sminute := t.startMinute
						times[n] = Time{ shour, sminute, hour, minute }
					} else {
						times[n] = Time{ endHour: hour, endMinute: minute}
					}
				}
			}
		}
	}

	for key, val := range dates {

		year := strconv.Itoa(val.year) + "-" + strconv.Itoa(val.month) + "-" + strconv.Itoa(val.day)
		startTime := strconv.Itoa(times[key].startHour) + ":" + strconv.Itoa(times[key].startMinute)
		endTime := strconv.Itoa(times[key].endHour) + ":" + strconv.Itoa(times[key].endMinute)

		insert(db, year, startTime, endTime)

		// printDate(val.year, val.month, val.day, times[key].startHour, times[key].startMinute, 0)
		// printDate(val.year, val.month, val.day, times[key].endHour, times[key].endMinute, 0)
	}

	close(db)
}