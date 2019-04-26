package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/categories", GetCategoriesAround).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

func GetCategoriesAround(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hey, listen")
	return
}