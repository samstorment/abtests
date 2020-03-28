// Set the flex dropdowns to display nothing
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#new-dropdown").style.display = "none";
    document.querySelector("#term-dropdown").style.display = "none";
});

// toggle button
function toggleActionContent(id) {

    let toggleButton = document.querySelector(`#toggle-button-${id}`);
    toggleButton.addEventListener("click", e => {
    
        let actionContainer = document.querySelector(`#action-container-${id}`);
        let actionContentContainer = document.querySelector(`#action-content-container-${id}`);
        let actionTopbar = document.querySelector(`#action-topbar-${id}`);

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
    });
}

// Setup the toggle button for the contact container
toggleActionContent(0);

// delete button
function deleteAction(id, actions, actionContainer) {
    let deleteButton = document.querySelector(`#delete-button-${id}`);
    deleteButton.addEventListener("click", e => {
        actions.removeChild(actionContainer);
    });
}

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
function getActionHtml(action) {
    if (action === "add") {
        return `<div class="action-topbar" id="action-topbar-${contentCounter}">
                    <span>Add</span>
                    <button type="button" class="toggle-button" id="toggle-button-${contentCounter}">Toggle</button>
                    <button type="button" class="delete-button" id="delete-button-${contentCounter}">Delete</button>
                </div>
                <div class="action-content-container" id="action-content-container-${contentCounter}">
                    <div class="action-descriptor">Enter new class info</div>
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
    } 
    else if (action === "change") {
        return `<div class="action-topbar" id="action-topbar-${contentCounter}">
                    <span>Change</span>
                    <button type="button" class="toggle-button" id="toggle-button-${contentCounter}">Toggle</button>
                    <button type="button" class="delete-button" id="delete-button-${contentCounter}">Delete</button>
                </div>
                <div class="action-content-container" id="action-content-container-${contentCounter}">
                    <div class="action-descriptor">Enter changes</div>
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
    }
    else if (action === "cancel") {
        return `<div class="action-topbar" id="action-topbar-${contentCounter}">
                    <span>Cancel</span>
                    <button type="button" class="toggle-button" id="toggle-button-${contentCounter}">Toggle</button>
                    <button type="button" class="delete-button" id="delete-button-${contentCounter}">Delete</button>
                </div>
                <div class="action-content-container" id="action-content-container-${contentCounter}">
                    <div class="action-descriptor">Enter cancellation reason</div>
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
    }
}

// Event listeners for Add, Change, and Cancel buttons
let contentCounter = 1;
let actions = document.querySelectorAll(".action");
actions.forEach(action => {
    action.addEventListener("click", e => {
        contentCounter++;
        let actions = document.querySelector("#actions");
        let actionContainer = document.createElement("div");

        actionContainer.setAttribute("class", "action-container draggable");
        actionContainer.setAttribute("draggable", "true");
        actionContainer.setAttribute("id", `action-container-${contentCounter}`);

        actionContainer.innerHTML = getActionHtml(action.id);
        
        actions.appendChild(actionContainer);

        toggleActionContent(contentCounter);
        deleteAction(contentCounter, actions, actionContainer);

        handleDrag(actionContainer);

        scrollToBottom();
    });
});

function handleDrag(actionContainer) {

    actionContainer.addEventListener("dragstart", () => {
        actionContainer.classList.add("dragging");

        // DUMMY
        let actionContentContainer = actionContainer.querySelector(".action-content-container");
        let contentContainerHeight = actionContentContainer.offsetHeight;
        actionContentContainer.style.display = "none";

        let dummyContainer = document.createElement("div");
        dummyContainer.setAttribute("class", "action-content-container dummy");

        dummyContainer.style.height = `${contentContainerHeight}px`;

        actionContainer.appendChild(dummyContainer);

        console.log("Added Dummy");       
    });


    actionContainer.addEventListener("dragend", () => {

        let contentContainer = actionContainer.querySelector(".action-content-container");
        let topbar = actionContainer.querySelector(".action-topbar");
        // we want to display the contentContainer as grid ONLY if the container was open when we started dragging
        contentContainer.style.display = "grid";
        topbar.style.borderBottom = "1px solid gray";
        topbar.style.borderBottomLeftRadius = "0px";
        topbar.style.borderBottomRightRadius = "0px";
        actionContainer.classList.remove("dragging");

        console.log(actionContainer.lastChild);

        let dummy = actionContainer.querySelector(".dummy");

        actionContainer.removeChild(dummy);
        console.log("Removed Dummy");
    });

    actions = document.querySelector("#actions");

    actions.addEventListener("dragover", e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(actions, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            actions.appendChild(draggable)
        } else {
            actions.insertBefore(draggable, afterElement)
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();

        // normally, midpoint would be calculated as height / 2 but we want to always ue the height of the topbar since we can toggle the box's height to a variable number
        // const midpoint = box.height / 2;
        const midpoint = 55 / 2; // topbar has a height of 55

        const offset = y - box.top - midpoint;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}