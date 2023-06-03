let statuses = [];

function statusClick() {
    var popup = document.getElementById("statusPopup");
    popup.classList.toggle("show");
}

var statusButton = document.getElementById("statusButton");
statusButton.addEventListener("click", statusClick);

function loadStatus() {
    
    let username = getUser();

    let input = prompt("Enter your Status!")

    let userStatus = {
        status: username + '-' + input
    };

    statuses.push(userStatus);
}

loadStatus();

