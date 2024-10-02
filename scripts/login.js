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
      alert(
        `Welcome back ${currentUser.lastName + " " + currentUser.firstName}!`
      );

      // Save current user to localStorage
      saveToStorage("currentUser", currentUser);

      // Redirect to home page
      window.location.href = "../index.html";
    } else {
      // Login failed
      alert("Invalid username or password. Please try again.");
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
    alert("Please enter both username and password.");
    return false;
  }

  return true;
}
