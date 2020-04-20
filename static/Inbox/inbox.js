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
    let inSelect = e.target.matches(".filter-dropdown select");
    let inDropdown = e.target.matches(".filter-dropdown");
    let inLabel = e.target.matches(".filter-dropdown label");
    let inDiv = e.target.matches(".filter-dropdown div");
    let inClear = e.target.matches("#filter-clear");
    let inX = e.target.matches("#clear-x");
    if (!e.target.matches("#filter-input")) {
        if (!inInput && !inDropdown && !inLabel && !inDiv && !inClear && !inX && !inSelect) {
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

    let season = document.querySelector("#filter-season").value.toLowerCase();
    let yearNum = document.querySelector("#filter-year").value.toLowerCase(); year = '' + yearNum;
    let type = document.querySelector("#filter-type").value.toLowerCase();
    let subject = document.querySelector("#filter-subject").value.toLowerCase();
    let course = document.querySelector("#filter-course").value.toLowerCase();
    let waiting = document.querySelector("#filter-waiting").value.toLowerCase();
    let from = document.querySelector("#filter-from").value.toLowerCase();
    let groupChecked = document.querySelector("#filter-group").checked;

    if (season == "" && year == "" && type == "" && subject == "" && course == "" && waiting == "" && from == "" && !groupChecked) {
        loadTable(fullTable);
        return;
    }

    let newData = [];
    let groups = [];

    for (let action of fullTable) {

        let firstOfGroup = false;
        if (groupChecked && !groups.includes(action.groupId)) {
            groups.push(action.groupId); 
            firstOfGroup = true;
        }

        let thisSeason = action.season.toLowerCase();
        let thisyearNum = action.year; thisyear = '' + thisyearNum;
        let thisType = action.type.toLowerCase();
        let thisSubject = action.subject.toLowerCase();
        let thisCourse = action.number.toLowerCase();
        let thisWaiting = action.waiting.toLowerCase();
        let thisFrom = action.from.toLowerCase();

        if (thisSeason.includes(season) && thisyear.includes(year) && thisType.includes(type) && thisSubject.includes(subject) && 
            thisCourse.includes(course) && thisWaiting.includes(waiting) && thisFrom.includes(from)) {

            if (groupChecked && firstOfGroup) {
                newData.push(action);
            } 
            else if (!groupChecked) {
                newData.push(action);
            } 
        }
    }

    if (newData.length === 0) {
        newData.push({type: "None"});
    }
    
    loadTable(newData);
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


    loadTable(fullTable);
});




// Some dummy data for the table
let fullTable = [
    {type: "Add",    subject: "CS", number: "445", section: "002", CRN: "52030", from: "Robinson, Frank", waiting: "pending dean", season: "Summer", year: 2020, date: "4/12/2020", id: 1, groupId: 1},
    {type: "Change",    subject: "CS", number: "499", section: "002", CRN: "52189", from: "Gibson, Bob", waiting: "pending chair", season: "Summer", year: 2020, date: "4/12/2020", id: 5, groupId: 1},
    {type: "Add",    subject: "CS", number: "145", section: "002", CRN: "52739", from: "Brett, George", waiting: "pending dean", season: "Summer", year: 2020, date: "4/12/2020", id: 9, groupId: 1},
    {type: "Change", subject: "Art", number: "240", section: "001", CRN: "55432", from: "Killebrew, Harmon", waiting: "Approved", season: "Summer", year: 2020, date: "4/08/2020", id: 13, groupId: 5},
    {type: "Cancel", subject: "Art", number: "200", section: "001", CRN: "55472", from: "Damon, Johnny", waiting: "Approved", season: "Summer", year: 2019, date: "4/08/2019", id: 14, groupId: 5},
    {type: "Change", subject: "Math", number: "416", section: "001", CRN: "53633", from: "Koufax, Sandy", waiting: "pending chair", season: "Spring", year: 2020, date: "3/25/2020", id: 2, groupId: 2},
    {type: "Change", subject: "Math", number: "184", section: "001", CRN: "56639", from: "Thomas, Frank", waiting: "pending chair", season: "Spring", year: 2020, date: "3/25/2020", id: 6, groupId: 2},
    {type: "Change", subject: "Math", number: "284", section: "001", CRN: "51230", from: "McCarver, Tim", waiting: "pending chair", season: "Spring", year: 2020, date: "3/25/2020", id: 10, groupId: 2},
    {type: "Change", subject: "Phil", number: "324", section: "002", CRN: "51970", from: "Lajoie, Nap", waiting: "pending chair", season: "Fall", year: 2019, date: "9/22/2019", id: 3, groupId: 3},
    {type: "Change", subject: "Phil", number: "330", section: "002", CRN: "54281", from: "Boggs, Wade", waiting: "pending dean", season: "Fall", year: 2019, date: "9/22/2019", id: 7, groupId: 3},
    {type: "Change", subject: "Phil", number: "521", section: "002", CRN: "52437", from: "Wagner, Honus", waiting: "pending dean", season: "Fall", year: 2019, date: "9/22/2019", id: 11, groupId: 3},
    {type: "Cancel", subject: "Eng", number: "323", section: "001", CRN: "52470", from: "Williams, Ted", waiting: "pending chair", season: "Fall", year: 2019, date: "7/08/2019", id: 12, groupId: 4},
    {type: "Cancel", subject: "Eng", number: "212", section: "001", CRN: "58860", from: "Craig, Allen", waiting: "pending chair", season: "Fall", year: 2019, date: "7/08/2019", id: 8, groupId: 4},
    {type: "Cancel", subject: "Eng", number: "162", section: "001", CRN: "57764", from: "Kaline, Mickey", waiting: "pending dean", season: "Fall", year: 2019, date: "7/08/2019", id: 4, groupId: 4},
    {type: "Change", subject: "IS", number: "330", section: "003", CRN: "57904", from: "Buck, Jack", waiting: "Denied", season: "Spring", year: 2019, date: "3/23/2019", id: 15, groupId: 6}
]


// add a table row with the course content for each object element in the table
function loadTable(table) {
    const container = document.querySelector(".inbox-container");
    let containerHTML = `<div class="inbox-line"></div>`;
    container.innerHTML = containerHTML;

    for (let course of table) {

        let dataExists = false;
        let message = "";
        if (course.waiting === "Approved") { message = `<strong>Approved</strong>. Your schedule change request for CRN <strong>${course.CRN}</strong> was approved for <strong>${course.season} ${course.year}</strong>`; dataExists = true; }
        else if (course.waiting === "Denied") { message = `<strong>Denied</strong>. Your schedule change request for CRN <strong>${course.CRN}</strong> was denied for <strong>${course.season} ${course.year}</strong>`; dataExists = true; }
        else if (course.type === "Add") { message = `Your approval is required for Add submitted by ${course.from} in <strong>${course.season} ${course.year}</strong>`; dataExists = true; }
        else if (course.type === "None") { message = "No classes found with the given filter(s)"; }
        else { message = `Your approval is required for CRN <strong>${course.CRN}</strong> submitted by ${course.from} in <strong>${course.season} ${course.year}</strong>`; dataExists = true; }

        let inboxRow = document.createElement("div");
        inboxRow.setAttribute("class", "inbox-row");
        inboxRow.setAttribute("id", `inbox-row-${course.id}`);
        let rowHTML = "";

        if (dataExists) {
            rowHTML = 
                `<div class="inbox-icon"><i class="fa fa-star-o gray"></i></div>
                <div class="inbox-item inbox-left"><strong>${course.type}</strong> ${course.subject} ${course.number}-${course.section}</div>
                <div class="inbox-item inbox-middle">${message}</div>
                <div class="inbox-item inbox-right">${course.date}</div>`;
        } else {
            rowHTML = `<div class="inbox-item inbox-middle">${message}</div>`; 
        }
        inboxRow.innerHTML = rowHTML;
        container.appendChild(inboxRow);

        let star = inboxRow.querySelector(".inbox-row .inbox-icon");

        if (star) {
            star.addEventListener("click", e => {
                e.stopPropagation();

                if (star.classList.contains("starred")) {
                    star.innerHTML = `<i class="fa fa-star-o gray"></i>`;
                    star.classList.remove("starred");
                } else {
                    star.innerHTML = `<i class="fa fa-star yellow"></i>`;
                    star.classList.add("starred");
                }   
            });
        }

        inboxRow.addEventListener("click", e => {
            location.href = `/course/${course.id}`;
        });
    }
}