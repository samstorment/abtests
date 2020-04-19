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
        let buttons = actionContainer.querySelectorAll(".action-topbar-button");
        buttons.forEach(button => {
            button.classList.add("move");
        });
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
        if (next) { 
            topbar.classList.add("move"); 
            let buttons = actionContainer.querySelectorAll(".action-topbar-button");
            buttons.forEach(button => {
                button.classList.add("move");
            });
        }
    });
}

// find the previous or next actionConatiner sibling based on the direction
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

    // when button is clicked, show the content if the content wasn't displayed, hide it if it was displayed
    toggleButton.addEventListener("click", e => {
        if (contentContainer.style.display === "none") {
            toggleButton.innerHTML = `<i class="fa fa-chevron-up"></i>`;
            contentContainer.style.display = "grid";
            actionTopbar.classList.remove("collapse");
        } else {
            toggleButton.innerHTML = `<i class="fa fa-chevron-down"></i>`;
            contentContainer.style.display = "none";
            actionTopbar.classList.add("collapse");
        }
    });
}

function commentAction(actionConatiner, id) {
    let commentButton = actionConatiner.querySelector(".action-topbar .comment-button");
    let commentDropdown = actionConatiner.querySelector(".comment-dropdown");
    commentDropdown.style.display = "none";

    commentButton.addEventListener("click", e => {
        if (commentDropdown.style.display === "none") {
            commentDropdown.style.display = "block";
        } 
    });

    window.addEventListener("click", e => {
        let inDropdown = e.target.matches(`#comment-dropdown-${id}`);
        let inComment = e.target.matches(`#comment-${id}`);
        let inIcon = e.target.matches(`#comment-icon-${id}`);
        if (!e.target.matches(`#comment-button-${id}`)) {
            if (!inDropdown && !inComment && !inIcon) { commentDropdown.style.display = "none"; }
        }
    });
}


// delete button, delete the Add/drop/change when delete button is clicked
function deleteAction(actions, actionContainer) {
    let deleteButton = actionContainer.querySelector(".action-topbar .delete-button");
    deleteButton.addEventListener("click", e => {
        actions.removeChild(actionContainer);
    });
}

// Setup the toggle button for the contact container
let contactContainer = document.querySelector("#contact-container");
toggleActionContent(contactContainer);

// adds the class info to the top of the Add, Change, Cancel container 1 second after user stops typing.
// This function is currently a sloppy mess with some stupid use of if statements
function setActionText(type, actionContainer) {
    
    let textToEdit = actionContainer.querySelector(".action-topbar span");

    let subjectInput = actionContainer.querySelector(".action-content-container .action-content div .subject-input")
    let courseInput = actionContainer.querySelector(".action-content-container .action-content div .course-input")
    let sectionInput = actionContainer.querySelector(".action-content-container .action-content div .section-input")

    let subjectText = "";
    let courseText = "";
    let sectionText = "";

    let currentText = textToEdit.innerHTML;

    let timeout = null;

    let textChangeListener = e => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            subjectText = subjectInput.value;
            courseText = courseInput.value;
            sectionText = sectionInput.value;
  
            if (subjectText == "") {
                textToEdit.innerHTML =  currentText;
            } else {
                textToEdit.innerHTML = currentText + " " + subjectText + " " + courseText + " "  + sectionText + "</em>";
            }
        }, 1000);
    }

    subjectInput.addEventListener("keyup", textChangeListener);
    courseInput.addEventListener("keyup", textChangeListener);
    sectionInput.addEventListener("keyup", textChangeListener); 
}

// scroll the page to the very bottom so that all of the new content is visible
function scrollToBottom() {
    let scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

// Event listener for new button's dropdown content (Add, change, cancel)
let newActionButton = document.querySelector("#new-button");
newActionButton.addEventListener("click", e => {
    let dropdownContent = document.querySelector("#new-dropdown");

    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "flex";
    }
});

// Event listener for term button's dropdown content (Spring, summer, fall)
let termButton = document.querySelector("#term-button");
termButton.addEventListener("click", e => {

    e.preventDefault();

    let dropdownContent = document.querySelector("#term-dropdown");

    let terms = dropdownContent.querySelectorAll(".term");
    terms.forEach(term => {
        term.innerHTML = term.id + " " + getYearForTerm(term.id);
    });

    if (dropdownContent.style.display === "none") {
        dropdownContent.style.display = "flex";
    }
});

// if a dropdown list is clicked off of, turn off its display
window.onclick = e => {
    if (!event.target.matches("#new-button")) {
        let dropdownContent = document.querySelector("#new-dropdown");
        dropdownContent.style.display = "none";
    }
    if (!event.target.matches("#term-button")) {
        let dropdownContent = document.querySelector("#term-dropdown");
        dropdownContent.style.display = "none";
    }
    if (!event.target.matches("#username")) {
        let dropdownContent = document.querySelector("#term-dropdown");
        dropdownContent.style.display = "none";
    }

    console.log(window.innerHeight);
    

}

// Event listeners for Spring, Summer, and Fall buttons
let terms = document.querySelectorAll(".term");
terms.forEach(term => {
    term.addEventListener("click", e => {
        // make the term button's value spring, summer, or fall. This button is actually a form input so it gets sent to the server
        termButton.value = term.innerHTML;
    });
});


function getYearForTerm(term) {

    today = new Date();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    let spring, summer, fall;

    // this should be corrected down to the exact DAY
    if (mm >= 1 && mm <= 5) {
        spring = yyyy;
        summer = yyyy;
        fall = yyyy;
    } else if (mm >= 6 && mm <= 7 ) {
        spring = yyyy + 1;
        summer = yyyy;
        fall = yyyy;
    } else {
        spring = yyyy + 1;
        summer = yyyy + 1;
        fall = yyyy;
    }

    if (term == "Spring") { return spring; }
    else if (term == "Summer") { return summer; }
    else { return fall; }
}

getYearForTerm("spring");

// THIS DOES NOTHING, but it'll be useful in the future
function printDate() {
    today = new Date();

    sp = "-";

    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    let full = mm+sp+dd+sp+yyyy;
    console.log(full);
}


// returns the inner html for the appropriate action. This is a damn mess, idk how to do it better
function getActionHtml(action, id) {
    if (action === "add") {
        return `<div class="action-topbar">
                    <span>Add</span>
                    <button type="button" class="delete-button action-topbar-button"><i class="fa fa-trash-o"></i></button>
                    <button type="button" class="comment-button action-topbar-button" id="comment-button-${id}"><i class="fa fa-comment-o" id="comment-icon-${id}"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-up"><i class="fa fa-arrow-up"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-down"><i class="fa fa-arrow-down"></i></button>
                    <button type="button" class="toggle-button action-topbar-button"><i class="fa fa-chevron-up"></i></button>
                </div>

                <div>
                    <div class="comment-dropdown" id="comment-dropdown-${id}">
                        <textarea form="ab-form" class="comment" id="comment-${id}" name="comment-${id}" placeholder="Add comments about this section"></textarea>
                    </div>
                </div>

                <div class="action-content-container">
                    <div class="action-descriptor">Enter new class info</div>
                    <div class="action-content">
                        <h2>Section</h2>
                        <div class="input">
                            <datalist id="subject-list">
                                <option>Art</option>
                                <option>Computer Science</option>
                                <option>English</option>
                                <option>Math</option>
                            </datalist>
                            <label for="subject-${id}">Subject</label>
                            <input class="subject-input" id="subject-${id}" name="subject-${id}" list="subject-list">
                        </div>
                        <div class="input"><label for="course-${id}">Course Number</label><input class="course-input" id="course-${id}" name="course-${id}"></div>
                        <div class="input"><label for="section-${id}">Section Number</label><input class="section-input" id="section-${id}" name="section-${id}"></div>
                        <div class="input"><label for="schedule-type-${id}">Schedule Type</label><input id="schedule-type-${id}" name="schedule-type-${id}"></div>
                        <div class="input"><label for="instruction-method-${id}">Instruction Method</label><input id="instruction-method-${id}" name="instruction-method-${id}"></div>
                        <div class="input last"><label for="special-topics-${id}">Special Topics Title</label><input id="special-topics-${id}" name="special-topics-${id}" placeholder="optional"></div>
                    </div>
                    <div class="action-content">
                        <h2>Enrollment</h2>
                        <div class="input"><label for="enrollment-max-${id}">Enrollment Max</label><input id="enrollment-max-${id}" name="enrollment-max-${id}"></div>
                        <div class="input last"><label for="waitlist-seats-${id}">Waitlist Seats</label><input id="waitlist-seats-${id}" name="waitlist-seats-${id}"></div>
                    </div>
                    <div class="action-content">
                        <h2>Location and Time</h2>
                        <div class="input"><label for="session-length-${id}">Session Length</label><input id="session-length-${id}" name="session-length-${id}"></div>
                        <div class="input last"><label for="meetings-${id}">Meetings</label><input id="meetings-${id}" name="meetings-${id}"></div>
                    </div>
                    <div class="action-content">
                        <h2>Instructor</h2>
                        <div class="input"><label for="instructor-name-${id}">Name</label><input id="instructor-name-${id}" name="instructor-name-${id}"></div>
                        <div class="input last"><label for="instructor-id-${id}">ID</label><input id="instructor-id-${id}" name="instructor-id-${id}"></div>
                    </div>
                </div>`;
    } 
    else if (action === "change") {
        return `<div class="action-topbar">
                    <span>Change</span>
                    <button type="button" class="delete-button action-topbar-button"><i class="fa fa-trash-o"></i></button>
                    <button type="button" class="comment-button action-topbar-button" id="comment-button-${id}"><i class="fa fa-comment-o" id="comment-icon-${id}"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-up"><i class="fa fa-arrow-up"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-down"><i class="fa fa-arrow-down"></i></button>
                    <button type="button" class="toggle-button action-topbar-button"><i class="fa fa-chevron-up"></i></button>
                </div>

                <div>
                    <div class="comment-dropdown" id="comment-dropdown-${id}">
                        <textarea form="ab-form" class="comment" id="comment-${id}" name="comment-${id}" placeholder="Add comments about this section"></textarea>
                    </div>
                </div>
                
                <div class="action-content-container">
                    <div class="action-descriptor">Choose a class to change</div>
                    <div class="action-content">
                        <h2>Class</h2>
                        <div class="input"><label for="crn-${id}">CRN</label><input id="crn-${id}" name="crn-${id}"></div>
                        <div class="input"><label for="subject-${id}">Subject</label><input class="subject-input" id="subject-${id}" name="subject-${id}"></div>
                        <div class="input"><label for="course-${id}">Course Number</label><input class="course-input" id="course-${id}" name="course-${id}"></div>
                        <div class="input last"><label for="section-lookup-${id}">Section Number</label><input class="section-input" id="section-lookup-${id}" name="section-lookup-${id}"></div>
                    </div>

                    <div class="divider-line"></div>
                    <div class="action-descriptor">Enter changes</div>

                    <div class="action-content">
                        <h2>Section</h2>
                        <div class="input"><label for="section-${id}">Section Number</label><input id="section-${id}" name="section-${id}"></div>
                        <div class="input"><label for="schedule-type-${id}">Schedule Type</label><input id="schedule-type-${id}" name="schedule-type-${id}"></div>
                        <div class="input "><label for="instruction-method-${id}">Instruction Method</label><input id="instruction-method-${id}" name="instruction-method-${id}"></div>
                        <div class="input last"><label for="special-topics-${id}">Special Topics Title</label><input id="special-topics-${id}" name="special-topics-${id}" placeholder="optional"></div>
                    </div>
                    <div class="action-content">
                        <h2>Enrollment</h2>
                        <div class="input"><label for="enrollment-max-${id}">Enrollment Max</label><input id="enrollment-max-${id}" name="enrollment-max-${id}"></div>
                        <div class="input last"><label for="waitlist-seats-${id}">Waitlist Seats</label><input id="waitlist-seats-${id}" name="waitlist-seats-${id}"></div>
                    </div>
                    <div class="action-content">
                        <h2>Location and Time</h2>
                        <div class="input"><label for="session-length-${id}">Session Length</label><input id="session-length-${id}" name="session-length-${id}"></div>
                        <div class="input last"><label for="meetings-${id}">Meetings</label><input id="meetings-${id}" name="meetings-${id}"></div>
                    </div>
                    <div class="action-content">
                        <h2>Instructor</h2>
                        <div class="input"><label for="instructor-name-${id}">Name</label><input id="instructor-name-${id}" name="instructor-name-${id}"></div>
                        <div class="input last"><label for="instructor-id-${id}">ID</label><input id="instructor-id-${id}" name="instructor-id-${id}"></div>
                    </div>
                </div>`;
    }
    else if (action === "cancel") {
        return `<div class="action-topbar">
                    <span>Cancel</span>
                    <button type="button" class="delete-button action-topbar-button"><i class="fa fa-trash-o"></i></button>
                    <button type="button" class="comment-button action-topbar-button" id="comment-button-${id}"><i class="fa fa-comment-o" id="comment-icon-${id}"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-up"><i class="fa fa-arrow-up"></i></button>
                    <button type="button" class="move-button action-topbar-button" id="move-down"><i class="fa fa-arrow-down"></i></button>
                    <button type="button" class="toggle-button action-topbar-button"><i class="fa fa-chevron-up"></i></button>
                </div>

                <div>
                    <div class="comment-dropdown" id="comment-dropdown-${id}">
                        <textarea form="ab-form" class="comment" id="comment-${id}" name="comment-${id}" placeholder="Add comments about this section"></textarea>
                    </div>
                </div>

                <div class="action-content-container">
                    <div class="action-descriptor">Choose a class to cancel</div>
                    <div class="action-content">
                        <h2>Class</h2>
                        <div class="input"><label for="crn-${id}">CRN</label><input id="crn-${id}" name="crn-${id}"></div>
                        <div class="input"><label for="subject-${id}">Subject</label><input class="subject-input" id="subject-${id}" name="subject-${id}"></div>
                        <div class="input"><label for="course-${id}">Course Number</label><input class="course-input" id="course-${id}" name="course-${id}"></div>
                        <div class="input last"><label for="section-lookup-${id}">Section Number</label><input class="section-input" id="section-lookup-${id}" name="section-lookup-${id}"></div>
                    </div>

                    <div class="divider-line"></div>
                    <div class="action-descriptor">Enter cancellation reason</div>

                    <div class="action-content">

                        <div class="input last"><label for="reason-${id}">Reason</label><input class="reason-input" id="reason-${id}" name="reason-${id}"></div>
                    </div>
                </div>`;
    }
}

// Create an action. Event listeners for Add, Change, and Cancel buttons in the new dropdown
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
        commentAction(actionContainer, contentCounter);
        moveUp(actionContainer);
        moveDown(actionContainer);
        setActionText(action.id, actionContainer);
        actionContainer.scrollIntoView();
    });
});

