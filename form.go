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
	hour int
	minute int
}

type Session struct {
	startDate Date
	endDate Date
}

type Day struct {
	day byte
	startTime Time
	endTime Time
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
	course Course
}


func (c *Contact) exampleContact() *Contact {

	c.first = "Bill"
	c.last = "Johnson"
	c.phoneExtension = "6728"
	c.email = "bjohnso@siue.edu"
	c.box = "14457 siue"

	return c
}

func (c *Course) exampleCourse() *Course {

	c.term = 202025
	c.section = Section{ "50054", "CS", "425", "001", 25, 99, "Lecture"}
	c.session = Session{ Date{16, 8, 2020}, Date{15, 12, 2020} }
	c.days = append(c.days, Day{'M', Time{12, 30}, Time{1, 45}, Location{ "Engineering", "1234", "Edwardsville"} } )
	c.instructor = Instructor{ "John", "Clark", "800544784"}

	return c
}