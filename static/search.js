const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const optionsList = document.querySelectorAll(".option");

// when you click the "Select Video Category" button
selected.addEventListener("click", () => {
    // add active to the container's class if it is not in class list. Remove active if it is there
    let isOpen = optionsContainer.classList.toggle("active");

    // clear the search
    searchBox.value = "";
    // all options contain the empty string at index 0, so all options will be displayed
    filterList("");

    // if the options container is active
    if (optionsContainer.classList.contains("active")) {
        // focus the cursor on the searchBox
        searchBox.focus();
    }
});

// for each option in the list
optionsList.forEach(o => {
    // when an option is clicked
    o.addEventListener("click", () => {
        // set the "Select Video Category" text to the text of the chosen option
        selected.innerHTML = o.querySelector("label").innerHTML;
        // remove active so the list of options becomes hidden
        optionsContainer.classList.remove("active");
    });
});

// When a key is released in the searchbox input
searchBox.addEventListener("keyup", function(e) {
    // e.target.value returns the value of the option element that triggered the event
    filterList(e.target.value);
});

const filterList = (searchTerm) => {
    // Whatever the user types in, converted to lowercase
    searchTerm = searchTerm.toLowerCase();

    // for each option in the list of options, 
    optionsList.forEach(option => {
        // get the label text for each option and convert it to lowercase
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();

        // If the searcg term is contained in an option's label, show that option
        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
};