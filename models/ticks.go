package models

import (
	"time"
)

// This just inserts the current time into the DB and shows all the previous times. Good for testing if db works.

// Creates the table "ticks" if it doesn't exist
func createTicks() error {
	if _, err := db.Exec("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)"); err != nil {
		return err
	}
	return nil
}

// Inserts the current time into the ticks table
func insertTick() error {
	if _, err := db.Exec("INSERT INTO ticks VALUES (now())"); err != nil {
		return err
	}
	return nil
}

// Returns all the "ticks" (times) in the ticks table
func GetTicks() ([]*time.Time, error) {

	// create the DB if it doesn't exist
	if err := createTicks(); err != nil {
		return nil, err
	}
	// insert the current time into the ticks table
	if err := insertTick(); err != nil {
		return nil, err
	}
	// get all the times currently in the db, store the rows returned in 'rows'
	rows, err := db.Query("SELECT tick FROM ticks")
	if err != nil {
		return nil, err
	}

	// We will return this, array of times
	var ticks []*time.Time

	defer rows.Close()
	// look at each row from the query
	for rows.Next() {
		var tick time.Time
		// store the value in the current row in the "tick" variable
		if err := rows.Scan(&tick); err != nil {
			return nil, err
		}
		// add tick to the ticks array
		ticks = append(ticks, &tick)
	}
	// return the array of times
	return ticks, nil
}