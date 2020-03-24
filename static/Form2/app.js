let dropdownButton = document.querySelector(".topbar-dropdown");
dropdownButton.addEventListener("click", e => {

    let formContent = document.querySelector(".form-content-container");

    console.log("Yeet");

    if (formContent.style.display === "none") {
        formContent.style.display = "block";
    } else {
        formContent.style.display = "none";
    }
});