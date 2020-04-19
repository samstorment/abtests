document.addEventListener("DOMContentLoaded", () => { 


    let profileButton = document.querySelector("#profile");
    let profileDropdown = document.querySelector("#profile-dropdown");
    profileButton.addEventListener("click", e => {
        if (profileDropdown.classList.contains("invisible")) {
            profileDropdown.classList.remove("invisible");
        } else {
            profileDropdown.classList.add("invisible");
        }
    });

});