
// I put comments rather than changing stuff because I don't have time to change stuff and I don't want to break it yet
package main

type Section struct {
	crn string
	subject string
	courseNum string
	sectionNum string
	maxEnroll int
	maxWait int
	method string
}

type Date struct {
	day int
	month int
	year int
}

// this should just have an hour and minute
type Time struct {
	startHour int
	startMinute int
	endHour int
	endMinute int
}

type Session struct {
	startDate Date
	endDate Date
}

// This should probably be called a "Meeting" since it includes the meeting day, time, and location.
type Day struct {
	day byte
	// This shouldnt be a slice, but instead there should be a start time field and an end time field
	times []Time
	location Location
}

type Location struct {
	building string
	room string
	campus string
}

// Should add a int/float field for contribution
type Instructor struct {
	first string
	last string
	id string
}

type Course struct {
	term int // 202015 = spring 2020, 202025 = summer 2020, 202035 = fall 2020
	action string // ADD, DROP, CANCEL
	section Section 
	session Session // the active date range of the course
	days []Day // the days the course meets: If the changes to other comments are implemented this could accomodate weird off grid Meetings
	instructor Instructor
}

// Don't think we need the campus box. Put department here
type Contact struct {
	first string
	last string
	phoneExtension string
	email string
	box string
}

// Remove reqDepartment, put itin contact
type Form struct {
	reqDepartment string // GO AWAY
	comments string  // these are the special comments at the end of a form
	contact Contact
	courses []Course
}

func exampleContact() *Contact {
	c := &Contact{ "Bill", "Johnson", "6728", "bjohnso@siue.edu", "14457 siue" }
	return c
}

func exampleCourse() *Course {

	section := Section{ "50054", "CS", "425", "001", 25, 99, "Lecture" }

	sessionStart := Date{ 16, 8, 2020 }
	sessionEnd := Date{ 15, 12, 2020 }

	session := Session{ sessionStart, sessionEnd }

	time := Time{ 12, 30, 1, 45 }
	times := [] Time{ time }

	location := Location{ "Engineering", "1234", "Edwardsville" }

	day1 := Day{ 'M',  times, location}
	day2 := Day{ 'W',  times, location}

	days := [] Day{ day1, day2  }

	instructor := Instructor{ "John", "Clark", "800544784"}

	c := &Course{ 202025, "add", section, session, days, instructor}

	return c
}

func exampleForm() *Form {

	course := exampleCourse()
	contact := exampleContact()
	courses := [] Course{ *course }

	f := &Form {
		reqDepartment: "Computer Science",
		comments: "Adding this course in place of CS 330.",
		contact: *contact,
		courses: courses,
	}
	return f
}