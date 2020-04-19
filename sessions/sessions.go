package sessions

import (
	"github.com/gorilla/sessions"
)

// Sessions stored in cookies. the byte array is a key to sign cookies, the package only accepts cookies signed with our key
// Real key should not be pushed to github?
var Store = sessions.NewCookieStore([]byte("dsjfsidfj4898e8rfe"))