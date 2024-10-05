"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const inputUsernameEl = $("input-username");
const inputPasswordEl = $("input-password");
const loginEl = $("btn-submit");

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
inputUsernameEl.focus();
// Get user array from local storage
// const userArr = getFromStorage("userArr").map(parseUser); -> cách ngắn gọn hơn cần xem lại hàm map
const userArr = getFromStorage("userArr").map((user) => parseUser(user));

// Assign click event to the login button
loginEl.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Validate form inputs
  if (validateLoginForm()) {
    const username = inputUsernameEl.value.trim();
    const password = inputPasswordEl.value.trim();

    // Check if the username and password match any user in userArr
    const currentUser = userArr.find(
      (user) => user.username === username && user.password === password
    );

    if (currentUser) {
      // Login successful
      // Save current user to localStorage
      saveToStorage("currentUser", currentUser);
      showToast("Login successful");

      // Redirect to home page
      setTimeout(() => (window.location.href = "../index.html"), 500);
      // window.location.href = "../index.html"
    } else {
      // Login failed
      showToast("Invalid username or password", "error");
    }
  }
});

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Validate login form function
function validateLoginForm() {
  const username = inputUsernameEl.value.trim();
  const password = inputPasswordEl.value.trim();

  // Check if both fields are filled
  if (!username || !password) {
    showToast("Please enter username and password", "error");
    return false;
  }

  return true;
}
