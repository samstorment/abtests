document.addEventListener("DOMContentLoaded", () => { 
    loadTable(tableData);
});

let filterButton = document.querySelector("#filter-button");
let filterDropdown = document.querySelector(".filter-dropdown");
filterButton.addEventListener("click", e => {
    filterDropdown.style.display = "block";
});


window.addEventListener("click", e => {

    let inInput = e.target.matches(".filter-dropdown input");
    let inDropdown = e.target.matches(".filter-dropdown");
    let inLabel = e.target.matches(".filter-dropdown label");
    let inDiv = e.target.matches(".filter-dropdown div");

    if (!e.target.matches("#filter-button")) {
        if (!inInput && !inDropdown && !inLabel && !inDiv) {
            filterDropdown.style.display = "none";
        }
    }
});

let sortDirection = false;
let tableData = [
    {type: "Add", subject: "CS", course: 445, section: 002, instructor: "Crk, Igor", from: "Robinson, Frank", term: "Spring 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", course: 416, section: 001, instructor: "Wazowski, Mike", from: "Koufax, Sandy", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", course: 324, section: 002, instructor: "Thome, Jim", from: "Lajoie, Nap", term: "Spring 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", course: 162, section: 001, instructor: "Abbott, Jim", from: "Kaline, Mickey", term: "Spring 2020", date: "3/24/2020"},
    {type: "Add", subject: "CS", course: 499, section: 002, instructor: "Feller, Bob", from: "Gibson, Bob", term: "Spring 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", course: 184, section: 001, instructor: "Herzog, Whitey", from: "Thomas, Frank", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", course: 330, section: 002, instructor: "Maris, Roger", from: "Boggs, Wade", term: "Spring 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", course: 212, section: 001, instructor: "Paige, Satchel", from: "Craig, Allen", term: "Spring 2020", date: "3/24/2020"},
    {type: "Add", subject: "CS", course: 145, section: 002, instructor: "Mulder, Mark", from: "Brett, George", term: "Spring 2020", date: "4/2/2020"},
    {type: "Change", subject: "Math", course: 284, section: 001, instructor: "Justice, David", from: "McCarver, Tim", term: "Spring 2020", date: "4/1/2020"},
    {type: "Change", subject: "Phil", course: 521, section: 002, instructor: "Walker, Larry", from: "Wagner, Honus", term: "Spring 2020", date: "3/30/2020"},
    {type: "Cancel", subject: "Eng", course: 323, section: 001, instructor: "Jackson, Reggie", from: "Williams, Ted", term: "Spring 2020", date: "3/24/2020"}
]

function loadTable(tableData) {
    const tableBody = document.querySelector("#table-data");
    let tableHtml = "";

    for (let action of tableData) {
        tableHtml += 
        `<tr>
            <td>${action.type}</td><td>${action.subject}</td><td>${action.course}</td><td>${action.section}</td>
            <td>${action.instructor}</td><td>${action.from}</td><td>${action.term}</td><td>${action.date}</td>
        </tr>`;
    }

    tableBody.innerHTML = tableHtml;
}

function sortColumn(columnName) {

    // arbitrarily select the first one, and check the data type of the 
    const type = typeof tableData[0][columnName];
    sortDirection = !sortDirection;

    switch(type) {
        case("number"):
        sortNumberColumn(sortDirection, columnName);
        break;
    }
    loadTable(tableData);
}

function sortNumberColumn(sort, columnName) {
    tableData = tableData.sort((a1, a2) => {
        // action1[action] - action2[action]
        return sort ? a1[columnName] - a2[columnName] : a2[columnName] - a1[columnName];
    });
} 


let filterSearch = document.querySelector("#search-button");
filterSearch.addEventListener("click", e => {

    e.preventDefault();
    filterDropdown.style.display = "none";

    let fromInput = document.querySelector("#from");
    let from = fromInput.value;

    let newData = [];

    for (let action of tableData) {

        let thisFrom = action.from;

        console.log(thisFrom);

        if (thisFrom.includes(from)) {
            newData.push(action);
        }
    }

    if (newData.length === 0) {
        newData.push({type: "No Data", subject: "No Data", course: 0, section: 0, instructor: "No Data", from: "No Data", term: "No Data", date: "No Data"});
    }

    loadTable(newData);
});