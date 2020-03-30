package main

import (
	"net/http"
	// "encoding/json"
	"fmt"
)

func parseForm(r *http.Request) {

	if err := r.ParseForm(); err != nil {
		fmt.Println("Something messed up", err)
	} else {
		// json, err := json.Marshal(r.PostForm)
		// if err != nil {
		// 	fmt.Println(err);
		// 	return
		// }
		// w.Write(json)
		fmt.Println(r.PostForm)
	}
}