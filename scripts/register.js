"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const firstNameEl = $("input-firstname");
const lastNameEl = $("input-lastname");
const usernameEl = $("input-username");
const passwordEl = $("input-password");
const passwordConfirmEl = $("input-password-confirm");
const registerEl = $("btn-submit");

// Get user array from local storage and convert to User instances
const userArr = getFromStorage("userArr").map(parseUser);

///////////////////////////////////////////////////////////
// // Function to get elements by IDs
// const getElements = (...ids) => ids.map((id) => document.getElementById(id));

// // Destructure the elements for easier access
// const [
//   firstNameEl,
//   lastNameEl,
//   usernameEl,
//   passwordEl,
//   passwordConfirmEl,
//   registerEl,
// ] = getElements(
//   "input-firstname",
//   "input-lastname",
//   "input-username",
//   "input-password",
//   "input-password-confirm",
//   "btn-submit"
// );
///////////////////////////////////////////////////////////

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */

// Assign click event to the register button
registerEl.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (validateForm()) {
    // Create a new instance of the User class
    const newUser = new User(
      firstNameEl.value.trim(),
      lastNameEl.value.trim(),
      usernameEl.value.trim(),
      passwordEl.value.trim() // Store password (you should hash the password before storing it)
    );

    // Add the new user to the userArr array and save it in localStorage
    userArr.push(newUser);
    saveToStorage("userArr", userArr);

    // Save username to localStorage for autofill in login page
    saveToStorage("savedUsername", newUser.username);

    alert(
      `Successful! Welcome ${
        newUser.lastName + " " + newUser.firstName
      }! Click OK to go to the login page.`
    );
    // Optionally redirect to another page if needed

    // Clear input fields
    clearFields();

    // Redirect to login.html after registration
    window.location.href = "../pages/login.html";
  }
});

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Form validation function
function validateForm() {
  // Get the values of the inputs
  const firstName = firstNameEl.value.trim();
  const lastName = lastNameEl.value.trim();
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  const passwordConfirm = passwordConfirmEl.value.trim();

  // Check if any field is empty
  if (!firstName || !lastName || !username || !password || !passwordConfirm) {
    alert("Please fill in all fields.");
    return false;
  }

  // Check if password is more than 8 characters
  if (password.length <= 8) {
    alert("Password must be more than 8 characters.");
    return false;
  }

  // Check if password and password confirmation match
  if (password !== passwordConfirm) {
    alert("Password and password confirmation do not match.");
    return false;
  }

  // Check if username already exists in userArr
  const userExists = userArr.some((user) => user.username === username);
  if (userExists) {
    alert("Username already exists.");
    return false;
  }

  // If all validations pass
  return true;
}

// Function to clear input fields
function clearFields() {
  firstNameEl.value = "";
  lastNameEl.value = "";
  usernameEl.value = "";
  passwordEl.value = "";
  passwordConfirmEl.value = "";
}
