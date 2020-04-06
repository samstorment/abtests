// load the fulltable when the page initially loads
document.addEventListener("DOMContentLoaded", () => { 
    loadTable(fullTable);
});

// show the filter dropdown when the button is clicked
let filterButton = document.querySelector("#filter-input");
let filterDropdown = document.querySelector(".filter-dropdown");
filterButton.addEventListener("click", e => {
    filterDropdown.style.display = "block";
});

// close the filter drop down if none of the following items are clicked. This seems like a bad way to solve this problem
window.addEventListener("click", e => {

    let inInput = e.target.matches(".filter-dropdown input");
    let inDropdown = e.target.matches(".filter-dropdown");
    let inLabel = e.target.matches(".filter-dropdown label");
    let inDiv = e.target.matches(".filter-dropdown div");
    let inClear = e.target.matches("#filter-clear");
    let inX = e.target.matches("#clear-x")

    if (!e.target.matches("#filter-input")) {
        if (!inInput && !inDropdown && !inLabel && !inDiv && !inClear && !inX) {
            filterDropdown.style.display = "none";
        }
    }
});

// Some dummy data for the table
let sortDirection = false;
let fullTable = [
    {type: "Add", subject: "CS", number: "445", section: "002", instructor: "Crk, Igor", from: "Robinson, Frank", status: "pending dean", term: "Fall 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", number: "416", section: "001", instructor: "Wazowski, Mike", from: "Koufax, Sandy", status: "pending chair", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", number: "324", section: "002", instructor: "Thome, Jim", from: "Lajoie, Nap", status: "pending chair", term: "Summer 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", number: "162", section: "001", instructor: "Abbott, Jim", from: "Kaline, Mickey", status: "pending dean", term: "Fall 2020", date: "3/24/2020"},
    {type: "Add", subject: "CS", number: "499", section: "002", instructor: "Feller, Bob", from: "Gibson, Bob", status: "pending chair", term: "Fall 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", number: "184", section: "001", instructor: "Herzog, Whitey", from: "Thomas, Frank", status: "pending chair", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", number: "330", section: "002", instructor: "Maris, Roger", from: "Boggs, Wade", status: "pending dean", term: "Summer 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", number: "212", section: "001", instructor: "Paige, Satchel", from: "Craig, Allen", status: "pending chair", term: "Spring 2020", date: "3/24/2020"},
    {type: "Add", subject: "CS", number: "145", section: "002", instructor: "Mulder, Mark", from: "Brett, George", status: "pending dean", term: "Spring 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", number: "284", section: "001", instructor: "Justice, David", from: "McCarver, Tim", status: "pending chair", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", number: "521", section: "002", instructor: "Walker, Larry", from: "Wagner, Honus", status: "pending dean", term: "Fall 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", number: "323", section: "001", instructor: "Jackson, Reggie", from: "Williams, Ted", status: "pending chair", term: "Spring 2020", date: "3/24/2020"}
]

// keep track of the table to sort since it can be different from the full table if filters are applied
let tableToSort = fullTable;

// add a table row with the course content for each object element in the table
function loadTable(table) {
    const tableBody = document.querySelector("#table-data");
    let tableHtml = "";

    for (let course of table) {
        tableHtml += 
        `<tr>
            <td>${course.type}</td><td>${course.subject} ${course.number}-${course.section}</td><td>${course.instructor}</td>
            <td>${course.from}</td><td>${course.status}</td><td>${course.term}</td><td>${course.date}</td>
        </tr>`;
    }
    tableBody.innerHTML = tableHtml;
}

// sort the table opposite the direction of the current direction and load the new sorted table
function sortColumn(table, columnName) {

    sortDirection = !sortDirection;
    sortStringColumn(table, sortDirection, columnName);
    loadTable(table);
}

// sort the table by the selected column
function sortStringColumn(table, sortDirection, columnName) {
    tableToSort = table.sort((a, b) => {

        if (columnName == "course") {
            let y = `${a["subject"]} ${a["course"]}-${a["section"]}`;
            let z = `${b["subject"]} ${b["course"]}-${b["section"]}`;
            return sortDirection ? (y > z) - (y < z) : (z > y) - (z < y);
        } else {
            let y = a[columnName];
            let z = b[columnName];
            return sortDirection ? (y > z) - (y < z) : (z > y) - (z < y);
        }
    });
} 

// when a table header is clicked, sort the table by that header
let headers = document.querySelectorAll(".table-head th");
headers.forEach(head => {
    head.addEventListener("click", e => {
        sortColumn(tableToSort, head.id);
    });
});

// this is bad but shows an example
let filterSearch = document.querySelector("#filter-search");
filterSearch.addEventListener("click", e => {

    // This method SHOULD send the filter data to the server, then the server should query the db 
    // with the filter data, and return and array of filtered objects. But i just want to see it work

    e.preventDefault();
    filterDropdown.style.display = "none";

    let type = document.querySelector("#filter-type").value.toLowerCase();
    let term = document.querySelector("#filter-term").value.toLowerCase();
    let from = document.querySelector("#filter-from").value.toLowerCase();
    let subject = document.querySelector("#filter-subject").value.toLowerCase();
    let course = document.querySelector("#filter-course").value.toLowerCase();
    let instructor = document.querySelector("#filter-instructor").value.toLowerCase();

    if (type == "" && term == "" && from == "" && subject == "" && course == "" && instructor == "") {
        tableToSort = fullTable;
        loadTable(fullTable);
        return;
    }

    let newData = [];

    for (let action of fullTable) {

        let thisType = action.type.toLowerCase();
        let thisTerm = action.term.toLowerCase();
        let thisFrom = action.from.toLowerCase();
        let thisSubject = action.subject.toLowerCase();
        let thisCourse = action.number.toLowerCase();
        let thisInstructor = action.instructor.toLowerCase();

        if (thisType.includes(type) && thisTerm.includes(term) && thisFrom.includes(from) && 
            thisSubject.includes(subject) && thisCourse.includes(course) && thisInstructor.includes(instructor)) {
            newData.push(action);
        }
    }

    if (newData.length === 0) {
        newData.push({type: "None", subject: "None", number: "None", section: "None", instructor: "None", from: "None", status: "None", term: "None", date: "None"});
    }
    
    tableToSort = newData;
    loadTable(tableToSort);
});

// clear all the filter search terms and load the full tabel again
let filterClear = document.querySelector("#filter-clear");
filterClear.addEventListener("click", e => {
    
    // set all input values to 0
    let filterInputs = document.querySelectorAll(".filter-dropdown div input");
    filterInputs.forEach(input => {
        if (input.id !== "filter-search")  
            input.value = "";
    });

    // default back to the default table
    tableToSort = fullTable;
    loadTable(fullTable);
});