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

let newActionButton = document.querySelector("#new-action-button");
newActionButton.addEventListener("click", e => {
    
    let dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "block";

});

// if the dropdown list is clicked off of, turn of its display
window.onclick = e => {
    if (!event.target.matches("#new-action-button")) {
        let dropdownContent = document.querySelector(".dropdown-content");
        dropdownContent.style.display = "none";

    }
}

let contentCounter = 0;
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