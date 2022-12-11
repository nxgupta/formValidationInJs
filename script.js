let username = document.getElementById("username");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let post = validateInput();
  if (post) {
    let body = {
      username: username.value.trim(),
      email: email.value.trim(),
    };
    sendData(body);
  }
});

function validateInput() {
  let validation = true;
  let usernameValue = username.value.trim();
  let emailValue = email.value.trim();
  let password1Value = password1.value.trim();
  let password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username cannot be empty");
    validation = false;
  } else {
    setSuccess(username);
  }
  if (emailValue === "") {
    setError(email, "Please enter a valid email");
    validation = false;
  } else {
    setSuccess(email);
  }
  if (password1Value == "") {
    setError(password1, "Please enter your password");
    validation = false;
  } else if (password1Value.length < 8) {
    setError(password1, "Password needs to be atleast 8 character's");
    validation = false;
  } else {
    setSuccess(password1);
  }
  if (password2Value == "") {
    setError(password2, "Please enter your password to match");
    validation = false;
  } else if (password2Value !== password1Value) {
    setError(password2, "Please enter a matching password");
    validation = false;
  } else {
    setSuccess(password2);
  }
  return validation;
}

function setError(element, message) {
  let inputControl = element.parentElement;
  let messageElement = inputControl.querySelector(".errors");
  messageElement.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  let inputControl = element.parentElement;
  let messageElement = inputControl.querySelector(".errors");
  messageElement.innerText = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

function sendData(body) {
  fetch("http://mockbin.org/bin/2d13407a-bae1-4611-b9cd-7fdb397f1e2e", {
    method: "POST",
    body: JSON.stringify(body),
    mode: "no-cors",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
