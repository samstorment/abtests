package models

import (
	"os"
	"fmt"
	"encoding/json"
	"database/sql"
	_ "github.com/lib/pq"
)


var Db *sql.DB

func Init() error {
	
	dbPath, err := getDbPath()
	if err != nil { 
		fmt.Println(dbPath, "Errror get")
		return err 
	}
	
	Db, err = sql.Open("postgres", dbPath)
	if err != nil { 
		fmt.Println("Errror Open")
		return err 
	}
	return nil
}

type Config struct {
	Host 		string
	Port		int
	User		string
	Password	string	
	Dbname		string
}

func getDbPath() (string, error) {

	dbPath := os.Getenv("DATABASE_URL")
	if dbPath == "" {

		var configuration Config

		file, err := os.Open("./config/config.development.json") 
		if err != nil {  return "open prob", err }  

		decoder := json.NewDecoder(file) 

		err = decoder.Decode(&configuration) 
		if err != nil {  return "decode prob", err }
		// dbPath = "$(heroku config:get DATABASE_URL -a ab-form-prototype-2)"
		dbPath = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
							configuration.Host, configuration.Port, configuration.User, configuration.Password, configuration.Dbname)
	}
	return dbPath, nil
}