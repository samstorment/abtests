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

type Day struct {
	day byte
	times []Time
	location Location
}

type Location struct {
	building string
	room string
	campus string
}

type Instructor struct {
	first string
	last string
	id string
}

type Course struct {
	term int // 202015 = spring 2020, 202025 = summer 2020, 202035 = fall 2020
	action string
	section Section
	session Session
	days []Day
	instructor Instructor
}

type Contact struct {
	first string
	last string
	phoneExtension string
	email string
	box string
}

type Form struct {
	reqDepartment string
	comments string
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