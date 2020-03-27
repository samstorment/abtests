// all of this is performed after the page is loaded
document.addEventListener("DOMContentLoaded", () => { 
    let newDropdownnContent = document.querySelector("#new-dropdown");
    newDropdownnContent.style.display = "none";
    let termDropdownnContent = document.querySelector("#term-dropdown");
    termDropdownnContent.style.display = "none";
});

// just grabs the number off of an id and returns the number
function getIdNumber(id) {
    let array = id.split("-");
    return array[array.length - 1];
}

function toggleActionContent(id) {

    let num = getIdNumber(id);
    let actionContentContainer = document.querySelector(`#action-content-container-${num}`);
    let actionTopbar = document.querySelector(`#action-topbar-${num}`);

    if (actionContentContainer.style.display === "none") {
        actionContentContainer.style.display = "grid";
        actionTopbar.style.borderBottom = "1px solid gray";
        actionTopbar.style.borderBottomLeftRadius = "0px";
        actionTopbar.style.borderBottomRightRadius = "0px";
    } else {
        actionContentContainer.style.display = "none";
        actionTopbar.style.borderBottomLeftRadius = "10px";
        actionTopbar.style.borderBottomRightRadius = "10px";
        actionTopbar.style.borderBottom = "none";
    }
}

function deleteAction(id) {

    let num = getIdNumber(id);
    let actions = document.querySelector("#actions");
    let actionContainer = document.querySelector(`#action-container-${num}`);
    actions.removeChild(actionContainer);
}

let newActionButton = document.querySelector("#new-button");
newActionButton.addEventListener("click", e => {
    
    let dropdownContent = document.querySelector("#new-dropdown");

    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "flex";
    }
});

let termButton = document.querySelector("#term-button");
termButton.addEventListener("click", e => {
    
    let dropdownContent = document.querySelector("#term-dropdown");

    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "flex";
    }
});

// if the dropdown list is clicked off of, turn off its display
window.onclick = e => {
    if (!event.target.matches("#new-button")) {
        let dropdownContent = document.querySelector("#new-dropdown");
        dropdownContent.style.display = "none";
    }
    if (!event.target.matches("#term-button")) {
        let dropdownContent = document.querySelector("#term-dropdown");
        dropdownContent.style.display = "none";
    }

}

function changeTerm(term) {
    let termButton = document.querySelector("#term-button");
    termButton.value = term;
} 



let contentCounter = 1;
// create new action container for an add
let addButton = document.querySelector("#add");
addButton.addEventListener("click", e => {

    contentCounter++;
    let actions = document.querySelector("#actions");
    let actionContainer = document.createElement("div");

    actionContainer.setAttribute("class", "action-container");
    actionContainer.setAttribute("id", `action-container-${contentCounter}`);

    actionContainer.innerHTML = 
    `<div class="action-topbar" id="action-topbar-${contentCounter}">
        <span>Add</span>
        <button type="button" class="toggle-button" id="toggle-button-${contentCounter}" onclick="toggleActionContent(this.id)">Toggle</button>
        <button type="button" class="delete-button" id="delete-button-${contentCounter}" onclick="deleteAction(this.id)">Delete</button>
    </div>
    <div class="action-content-container" id="action-content-container-${contentCounter}">
        <div class="action-content">
            <h2>Section</h2>
            <div class="input"><label for="subject">Subject</label><input type="text" id="subject-${contentCounter}"></div>
            <div class="input"><label for="course">Course</label><input type="text" id="course-${contentCounter}"></div>
            <div class="input last"><label for="section">Section Number</label><input type="text" id="section-${contentCounter}"></div>
        </div>
        <div class="action-content">
            Content
        </div>
    </div>`;

    actions.appendChild(actionContainer);
});

// create new action container for a change
let changeButton = document.querySelector("#change");
changeButton.addEventListener("click", e => {

    contentCounter++;
    let actions = document.querySelector("#actions");
    let actionContainer = document.createElement("div");

    actionContainer.setAttribute("class", "action-container");
    actionContainer.setAttribute("id", `action-container-${contentCounter}`);

    actionContainer.innerHTML = 
    `<div class="action-topbar" id="action-topbar-${contentCounter}">
        <span>Change</span>
        <button type="button" class="toggle-button" id="toggle-button-${contentCounter}" onclick="toggleActionContent(this.id)">Toggle</button>
        <button type="button" class="delete-button" id="delete-button-${contentCounter}" onclick="deleteAction(this.id)">Delete</button>
    </div>
    <div class="action-content-container" id="action-content-container-${contentCounter}">
        <div class="action-content">
            <h2>Section</h2>
            <div class="input"><label for="subject">Subject</label><input type="text" id="subject-${contentCounter}"></div>
            <div class="input"><label for="course">Course</label><input type="text" id="course-${contentCounter}"></div>
            <div class="input last"><label for="section">Section Number</label><input type="text" id="section-${contentCounter}"></div>
        </div>
        <div class="action-content">
            Content
        </div>
    </div>`;

    actions.appendChild(actionContainer);

}); 

// create new action container for a cancel
let cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", e => {
    contentCounter++;
    let actions = document.querySelector("#actions");
    let actionContainer = document.createElement("div");

    actionContainer.setAttribute("class", "action-container");
    actionContainer.setAttribute("id", `action-container-${contentCounter}`);

    actionContainer.innerHTML = 
    `<div class="action-topbar" id="action-topbar-${contentCounter}">
        <span>Cancel</span>
        <button type="button" class="toggle-button" id="toggle-button-${contentCounter}" onclick="toggleActionContent(this.id)">Toggle</button>
        <button type="button" class="delete-button" id="delete-button-${contentCounter}" onclick="deleteAction(this.id)">Delete</button>
    </div>
    <div class="action-content-container" id="action-content-container-${contentCounter}">
        <div class="action-content">
            <h2>Section</h2>
            <div class="input"><label for="subject">Subject</label><input type="text" id="subject-${contentCounter}"></div>
            <div class="input"><label for="course">Course</label><input type="text" id="course-${contentCounter}"></div>
            <div class="input last"><label for="section">Section Number</label><input type="text" id="section-${contentCounter}"></div>
        </div>
        <div class="action-content">
            Content
        </div>
    </div>`;

    actions.appendChild(actionContainer);
});