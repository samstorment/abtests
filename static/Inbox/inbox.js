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

// this is bad but shows an example
let filterSearch = document.querySelector("#filter-search");
filterSearch.addEventListener("click", e => {

    // This method SHOULD send the filter data to the server, then the server should query the db 
    // with the filter data, and return and array of filtered objects. But i just want to see it work

    e.preventDefault();
    filterDropdown.style.display = "none";

    let term = document.querySelector("#filter-term").value.toLowerCase();
    let type = document.querySelector("#filter-type").value.toLowerCase();
    let subject = document.querySelector("#filter-subject").value.toLowerCase();
    let course = document.querySelector("#filter-course").value.toLowerCase();
    let status = document.querySelector("#filter-status").value.toLowerCase();
    let from = document.querySelector("#filter-from").value.toLowerCase();

    if (term == "" && type == "" && subject == "" && course == "" && status == "" && from == "") {
        tableToSort = fullTable;
        loadTable(fullTable);
        return;
    }

    let newData = [];

    for (let action of fullTable) {

        let thisTerm = action.term.toLowerCase();
        let thisType = action.type.toLowerCase();
        let thisSubject = action.subject.toLowerCase();
        let thisCourse = action.number.toLowerCase();
        let thisStatus = action.status.toLowerCase();
        let thisFrom = action.from.toLowerCase();

        if (thisTerm.includes(term) && thisType.includes(type) && thisSubject.includes(subject) && 
            thisCourse.includes(course) && thisStatus.includes(status) && thisFrom.includes(from)) {
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


// Some dummy data for the table
let fullTable = [
    {type: "Add", subject: "CS", number: "445", section: "002", CRN: "52030", from: "Robinson, Frank", status: "pending dean", term: "Fall 2020", date: "4/2/2020", id: 1, groupId: 1},
    {type: "Change", subject: "Math", number: "416", section: "001", CRN: "53633", from: "Koufax, Sandy", status: "pending chair", term: "Spring 2020", date: "4/1/2020", id: 2, groupId: 2},
    {type: "Change", subject: "Phil", number: "324", section: "002", CRN: "51970", from: "Lajoie, Nap", status: "pending chair", term: "Summer 2020", date: "3/30/2020", id: 3, groupId: 3},
    {type: "Cancel", subject: "Eng", number: "162", section: "001", CRN: "57764", from: "Kaline, Mickey", status: "pending dean", term: "Fall 2020", date: "3/24/2020", id: 4, groupId: 4},
    {type: "Add", subject: "CS", number: "499", section: "002", CRN: "52189", from: "Gibson, Bob", status: "pending chair", term: "Fall 2020", date: "4/2/2020", id: 5, groupId: 1},
    {type: "Change", subject: "Math", number: "184", section: "001", CRN: "56639", from: "Thomas, Frank", status: "pending chair", term: "Spring 2020", date: "4/1/2020", id: 6, groupId: 2},
    {type: "Change", subject: "Phil", number: "330", section: "002", CRN: "54281", from: "Boggs, Wade", status: "pending dean", term: "Summer 2020", date: "3/30/2020", id: 7, groupId: 3},
    {type: "Cancel", subject: "Eng", number: "212", section: "001", CRN: "58860", from: "Craig, Allen", status: "pending chair", term: "Spring 2020", date: "3/24/2020", id: 8, groupId: 4},
    {type: "Add", subject: "CS", number: "145", section: "002", CRN: "52739", from: "Brett, George", status: "pending dean", term: "Spring 2020", date: "4/2/2020", id: 9, groupId: 1},
    {type: "Change", subject: "Math", number: "284", section: "001", CRN: "51230", from: "McCarver, Tim", status: "pending chair", term: "Spring 2020", date: "4/1/2020", id: 10, groupId: 2},
    {type: "Change", subject: "Phil", number: "521", section: "002", CRN: "52437", from: "Wagner, Honus", status: "pending dean", term: "Fall 2020", date: "3/30/2020", id: 11, groupId: 3},
    {type: "Cancel", subject: "Eng", number: "323", section: "001", CRN: "52470", from: "Williams, Ted", status: "pending chair", term: "Spring 2020", date: "3/24/2020", id: 12, groupId: 4}
]


// add a table row with the course content for each object element in the table
function loadTable(table) {
    const container = document.querySelector(".inbox-container");
    let containerHTML = "";

    for (let course of table) {
        containerHTML += 
        `<div id="inbox-row-${course.id}" class="inbox-row">
            <div class="inbox-item inbox-left"><strong>${course.type}</strong> ${course.subject} ${course.number}-${course.section}</div>
            <div class="inbox-item inbox-middle">Your approval required. Please act soon to process this form</div>
            <div class="inbox-item inbox-right">Date</div>
        </div>`;
    }
    container.innerHTML = containerHTML;
}