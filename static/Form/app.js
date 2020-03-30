// Set the flex dropdowns to display nothing
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#new-dropdown").style.display = "none";
    document.querySelector("#term-dropdown").style.display = "none";
});

// move the action container down
function moveUp(actionContainer) {
    let topbar = actionContainer.querySelector(".action-topbar");
    let button = actionContainer.querySelector(".action-topbar #move-up");
    button.addEventListener("click", e => {
        if (actionContainer === actionContainer.parentNode.firstElementChild) {
            return;
        }
        let previous = findSwap(actionContainer, "up");
        actionContainer.parentNode.insertBefore(actionContainer, previous);
        topbar.classList.add("move");
    });
}

// move the action container down
function moveDown(actionContainer) {
    let topbar = actionContainer.querySelector(".action-topbar");
    let button = actionContainer.querySelector(".action-topbar #move-down");
    button.addEventListener("click", e => {
        if (actionContainer === actionContainer.parentNode.lastElementChild) {
            return;
        }
        let next = findSwap(actionContainer, "down");
        actionContainer.parentNode.insertBefore(actionContainer, next.nextSibling);
        if (next) { topbar.classList.add("move"); }
    });
}

// find the previous or next sibling based on the direction
function findSwap(actionContainer, direction) {
    do {
        if (direction == "up") { actionContainer = actionContainer.previousSibling; }
        if (direction == "down") { actionContainer = actionContainer.nextSibling; }
    } while (actionContainer && actionContainer.nodeType != 1);
    return actionContainer;
}

// toggle button
function toggleActionContent(actionContainer) {
    
    let contentContainer = actionContainer.querySelector(".action-content-container");
    let actionTopbar = actionContainer.querySelector(".action-topbar");
    let toggleButton = actionTopbar.querySelector(".toggle-button");

    toggleButton.addEventListener("click", e => {
        if (contentContainer.style.display === "none") {
            contentContainer.style.display = "grid";
            actionTopbar.classList.remove("collapse");
        } else {
            contentContainer.style.display = "none";
            actionTopbar.classList.add("collapse");
        }
    });
}


// delete button
function deleteAction(actions, actionContainer) {
    let deleteButton = actionContainer.querySelector(".action-topbar .delete-button");
    deleteButton.addEventListener("click", e => {
        actions.removeChild(actionContainer);
    });
}


// Setup the toggle button for the contact container
let contactContainer = document.querySelector("#contact-container");
toggleActionContent(contactContainer);

// scroll the page to the very bottom so that all of the new content is visible
function scrollToBottom() {
    let scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

// Event listener for new button's dropdown content
let newActionButton = document.querySelector("#new-button");
newActionButton.addEventListener("click", e => {
    let dropdownContent = document.querySelector("#new-dropdown");

    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "flex";
        scrollToBottom();
    }
});

// Event listener for term button's dropdown content
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

// Event listeners for Spring, Summer, and Fall buttons
let terms = document.querySelectorAll(".term");
terms.forEach(term => {
    term.addEventListener("click", e => {
        termButton.value = term.id;
    });
});

// returns the inner html for the appropriate action
function getActionHtml(action, id) {
    if (action === "add") {
        return `<div class="action-topbar">
                    <span>Add</span>
                    <button type="button" class="move-button" id="move-up">Up</button>
                    <button type="button" class="move-button" id="move-down">Down</button>
                    <button type="button" class="toggle-button">Toggle</button>
                    <button type="button" class="delete-button">Delete</button>
                </div>
                <div class="action-content-container">
                    <div class="action-descriptor">Enter changes</div>
                    <div class="action-content">
                        <h2>Section</h2>
                        <div class="input"><label for="subject-${id}">Subject</label><input type="text" id="subject-${id}" name="subject-${id}"></div>
                        <div class="input"><label for="course-${id}">Course Number</label><input type="text" id="course-${id}" name="course-${id}"></div>
                        <div class="input last"><label for="section-${id}">Section Number</label><input type="text" id="section-${id}" name="section-${id}"></div>
                    </div>
                    <div class="action-content">
                        Content
                    </div>
                </div>`;
    } 
    else if (action === "change") {
        return `<div class="action-topbar">
                    <span>Change</span>
                    <button type="button" class="move-button" id="move-up">Up</button>
                    <button type="button" class="move-button" id="move-down">Down</button>
                    <button type="button" class="toggle-button">Toggle</button>
                    <button type="button" class="delete-button">Delete</button>
                </div>
                <div class="action-content-container">
                    <div class="action-descriptor">Enter changes</div>
                    <div class="action-content">
                        <h2>Section</h2>
                        <div class="input"><label for="subject-${id}">Subject</label><input type="text" id="subject-${id}" name="subject-${id}"></div>
                        <div class="input"><label for="course-${id}">Course Number</label><input type="text" id="course-${id}" name="course-${id}"></div>
                        <div class="input last"><label for="section-${id}">Section Number</label><input type="text" id="section-${id}" name="section-${id}"></div>
                    </div>
                    <div class="action-content">
                        Content
                    </div>
                </div>`;
    }
    else if (action === "cancel") {
        return `<div class="action-topbar">
                    <span>Cancel</span>
                    <button type="button" class="move-button" id="move-up">Up</button>
                    <button type="button" class="move-button" id="move-down">Down</button>
                    <button type="button" class="toggle-button">Toggle</button>
                    <button type="button" class="delete-button">Delete</button>
                </div>
                <div class="action-content-container">
                    <div class="action-descriptor">Enter changes</div>
                    <div class="action-content">
                        <h2>Section</h2>
                        <div class="input"><label for="subject-${id}">Subject</label><input type="text" id="subject-${id}"></div>
                        <div class="input"><label for="course-${id}">Course Number</label><input type="text" id="course-${id}"></div>
                        <div class="input last"><label for="section-${id}">Section Number</label><input type="text" id="section-${id}"></div>
                    </div>
                    <div class="action-content">
                        Content
                    </div>
                </div>`;
    }
}

// Create an action. Event listeners for Add, Change, and Cancel buttons
let contentCounter = 1;
let actions = document.querySelectorAll(".action");
actions.forEach(action => {
    action.addEventListener("click", e => {
        contentCounter++;
        let actions = document.querySelector("#actions");
        let actionContainer = document.createElement("div");

        actionContainer.setAttribute("class", "action-container");

        actionContainer.innerHTML = getActionHtml(action.id, contentCounter);
        
        actions.appendChild(actionContainer);

        toggleActionContent(actionContainer);
        deleteAction(actions, actionContainer);
        moveUp(actionContainer);
        moveDown(actionContainer);

        scrollToBottom();
    });
});

