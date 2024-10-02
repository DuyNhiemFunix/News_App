/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const $ = document.getElementById.bind(document);

class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Save data to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get data from localStorage
function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data) || [];
}

// Function to parse user data into User class instance
// Do khi lưu xuống LocalStorage chỉ có thể lưu được các JS Object chứ không phải Class Instance (chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được). Nên cần một hàm để chuyển từ JS Object sang Class Instance.
function parseUser(userData) {
  return new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
}
