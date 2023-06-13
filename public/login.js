async function loginUser() {
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;

  const userData = {
    username: userName,
    password: password
  };
  console.log(userData)
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

  
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      const errorData = await response.json();
      const errorMessage = document.getElementById('msgError');
      
      displayPopup(errorMessage);
    }
  
  } catch (error) {
    console.error(error);
  }
};


