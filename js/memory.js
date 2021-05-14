localStorage.setItem("lang", "AZ");
localStorage.setItem("theme", "Light");

sessionStorage.setItem("username", "nurmahammadCode");
sessionStorage.setItem("fullname", "Nurmehemmed Nebiyev");

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + ";";
}

createCookie("token", "gdtS66_bsdh", 1);
