
const yearEl = document.getElementById("year")

if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

function updateLiveComplaints() {

  fetch("/api/location")
    .then(res => res.json())
    .then(data => {

      const activeStatuses = ["Pending", "In Progress"]

      const liveCount = data.filter(c =>
        activeStatuses.includes(c.status)
      ).length

      document.getElementById("liveCount").textContent = liveCount

    })

}

// run immediately
updateLiveComplaints()

// auto refresh every 5 seconds
setInterval(updateLiveComplaints, 5000)

// THEME HANDLING
console.log("script loaded")

var THEME_STORAGE_KEY = "civicflow-theme";

function getPreferredTheme() {
  try {
    var stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (e) {
    // ignore storage errors
  }

  if (window.matchMedia) {
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) return "dark";
  }
  return "light";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
}

function initTheme() {
  var theme = getPreferredTheme();
  applyTheme(theme);
}

function setupThemeToggle() {
  var toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var current = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (e) {
      // ignore storage errors
    }
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initTheme();

  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  initializeNavToggle();
  initializePage();
  setupThemeToggle();
});

// Mobile navbar toggle for landing page
function initializeNavToggle() {
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".navbar__links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    links.classList.toggle("navbar__links--open");
  });
}

// Page-specific initialization
function initializePage() {
  var page = document.body.getAttribute("data-page");
  switch (page) {
    case "login":
      initLoginPage();
      break;
    case "register":
      initRegisterPage();
      break;
    case "dashboard":
      initCitizenDashboard();
      break;
    case "admin":
      initAdminDashboard();
      break;
    default:
      break;
  }
}

/* --------------------
   AUTH: LOGIN
-------------------- */

function initLoginPage() {
  var form = document.getElementById("loginForm");
  if (!form) return;

  var emailInput = document.getElementById("loginEmail");
  var passwordInput = document.getElementById("loginPassword");
  var emailError = document.getElementById("loginEmailError");
  var passwordError = document.getElementById("loginPasswordError");
  var successMessage = document.getElementById("loginSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    var hasError = false;

    if (!email) {
      emailError.textContent = "Email is required.";
      hasError = true;
    } else if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = "Password is required.";
      hasError = true;
    } else if (password.length < 6) {
      passwordError.textContent =
        "Password should be at least 6 characters long.";
      hasError = true;
    }

    if (hasError) return;

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {

        successMessage.textContent = data.message
        if (data.message === "Login successful") {
          // store user info
          localStorage.setItem("loggedInUser", data.name)
          window.location.href = "dashboard.html"

        }

      })
  });
}

/* --------------------
   AUTH: REGISTER
-------------------- */

function initRegisterPage() {
  var form = document.getElementById("registerForm");
  if (!form) return;

  var nameInput = document.getElementById("registerName");
  var emailInput = document.getElementById("registerEmail");
  var passwordInput = document.getElementById("registerPassword");
  var nameError = document.getElementById("registerNameError");
  var emailError = document.getElementById("registerEmailError");
  var passwordError = document.getElementById("registerPasswordError");
  var successMessage = document.getElementById("registerSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    var hasError = false;

    if (!name) {
      nameError.textContent = "Name is required.";
      hasError = true;
    }

    if (!email) {
      emailError.textContent = "Email is required.";
      hasError = true;
    } else if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = "Password is required.";
      hasError = true;
    } else if (password.length < 6) {
      passwordError.textContent =
        "Password should be at least 6 characters long.";
      hasError = true;
    }

    if (hasError) return;

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {

        console.log(data)   // VERY IMPORTANT (debug)

        if (data.message === "Registration successful") {

          successMessage.style.color = "green"
          successMessage.textContent = "Registration Successful ✔"

          setTimeout(() => {
            window.location.href = "login.html"
          }, 2000)

        }
        else {

          successMessage.style.color = "red"
          successMessage.textContent = data.message

        }

      })
      .catch(err => {
        console.error(err)
        successMessage.textContent = "Server error"
      })
  });
}

// Simple email validation helper
function validateEmail(value) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
}
