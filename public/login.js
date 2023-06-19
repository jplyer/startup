async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

function goodPopup() {
  var popupLoginTrue = document.getElementById("loginGood");
  console.log('code is funny');
  popupLoginTrue.style.display = "block";
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
    goodPopup();

    
    
  } else {
    const body = await response.json();
    console.log(`⚠ Error: ${body.msg}`);
    badPopup();
  }
}
let displayPref = false;
async function setDisplayPref(value) {
  if (value === true) {
    displayPref = true;
  } else {
    displayPref = false;
  }
}

async function blogCreateControl(value) {
  if (value === true) {
    document.getElementById('blogCreateFields').style.display = 'block';
    document.getElementById('createOrNo').style.display = 'none';
    console.log('true');
  } else {
    window.location.href = "/login.html";
    console.log('else');
  }
  
}

function goToUserBlog (user) {
  const blogUrl = '/blog/' + user;
  window.location.href = blogUrl;
}

async function blogCreate(endpoint) {
  const userName = localStorage.getItem('userName');
  const headerInput = document.querySelector('#blogHeader');
  //const username = JSON.parse(userName);

  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, headerInput: headerInput, 
      userPref: displayPref}),

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    console.log('it worked!');
    console.log(userName);
    //console.log(username);
    goToUserBlog(userName);

  } else {
    const body = await response.json();
    console.log('BAD')
    badPopup();
  }
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}


