async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

function goodPopup() {
  var popup = document.getElementById("loginGood");
  popup.classList.toggle("show");

}

var popupLoginFail = document.getElementById("badPopup");
function badPopup() {
  console.log('code is funny');
  popupLoginFail.style.display = "block";

}

function hideErrorPopup() {
  popupLoginFail.style.display = "none";
}

closebuttonfail.addEventListener("click", hideErrorPopup);

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    console.log('response ok')
    window.location.href = "index.html";

    
    
  } else {
    const body = await response.json();
    console.log(`⚠ Error: ${body.msg}`);
    badPopup();
  }
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  let scores = [];
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

