const form = document
  .getElementById("form")
  .addEventListener("submit", logSubmit);

const object = {
  username: "nurmehemmed",
  password: "1234560",
};

function logSubmit(event) {
  event.preventDefault();
  const loginValue = document.getElementById("login").value;
  const passwordValue = document.getElementById("password").value;
  if (loginValue.length > 0) {
    if (passwordValue.length > 0) {
      if (loginValue === object.username && passwordValue === object.password) {
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "index.html";
      } else {
        alert("Login or password is incorrect");
      }
    } else {
      alert("Please fill password value");
    }
  } else {
    alert("Please fill login value");
  }
}
