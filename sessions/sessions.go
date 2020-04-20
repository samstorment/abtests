package sessions

import (
	"github.com/gorilla/sessions"
	"net/http"
)

// Sessions stored in cookies. the byte array is a key to sign cookies, the package only accepts cookies signed with our key
// Real key should not be pushed to github?
var Store = sessions.NewCookieStore([]byte("dsjfsidfj4898e8rfe"))



// This is a temporary function just for testing two users
func GetUsername(r *http.Request) string {
	session, _ := Store.Get(r, "session")
	userId := session.Values["user_id"]

	// this is where we SHOULD look up the username by the id in the database
	var username string
	if (userId == 1) {
		username = "Babe Ruth"
	} else if (userId == 2) {
		username = "Mario Mendoza"
	}
	return username
}