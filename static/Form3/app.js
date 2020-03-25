let toggle = document.querySelector("#toggle");

toggle.addEventListener("click", e => {
    let content = document.querySelector("#content");
    let topbar = document.querySelector("#topbar");

    if (content.style.display === "none") {
        content.style.display = "grid";
        topbar.style.borderBottom = "1px solid gray";
    } else {
        content.style.display = "none";
        topbar.style.borderBottom = "none";
    }
});
