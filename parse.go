package main

import (
)

func trimString(s string, numTrim int) string {
	return s[:len(s) - numTrim]
}