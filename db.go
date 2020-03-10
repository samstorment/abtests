package main

import (
	"fmt"
    "database/sql"
    _ "github.com/go-sql-driver/mysql" // need to isntall to $GOPATH with $ go get -u github.com/go-sql-driver/mysql
)

func connect() *sql.DB {

	fmt.Println("Connecting")

	db, err := sql.Open("mysql", "root:@tcp(192.168.1.14:3306)/meetings")

	if err != nil {
		panic(err.Error())
	}
	// defer db.Close()

	fmt.Println("Connected")

	return db
}

func insert(db *sql.DB, date, startTime, endTime string) {

	query := fmt.Sprintf("INSERT INTO meetings VALUES ('%s', '%s', '%s')", date, startTime, endTime)

	insert, err := db.Query(query)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

	fmt.Println("Successfully inserted into Meetings")
}

func close(db *sql.DB) {
	db.Close()

	fmt.Println("Closed DB")
}