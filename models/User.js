/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const $ = document.getElementById.bind(document);
let totalPages;
const API_KEY = "840e07adb38d4dc69b7c6ab9c0172026";
// const API_KEY = "94dd90de0ff14b4f9f16072d70756269";

// User class
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "General"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }

  // Fetch news data from API as a method of User
  async getData(page) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&pageSize=${this.pageSize}&page=${page}&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      const totalResults = data.totalResults;

      // Calculate totalPages after fetching totalResults
      totalPages = Math.ceil(totalResults / this.pageSize);

      // Update Pagination status
      updatePagination();

      // Display the news articles
      displayNews(data.articles);
    } catch (error) {
      console.error(error.message);
    }
  }
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Function to parse user data into User class instance
// Khi lưu xuống LocalStorage chỉ lưu được các thuộc tính của Obj còn các hàm (phương thức) trong class đó sẽ không được lưu => Nên cần một hàm để chuyển từ JS Object sang Class Instance.
function parseUser(userData) {
  return new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
}

// Save data to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get data from localStorage
function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data) || [];
}

/////////////////////////////////////////////
// Create toast container if it doesn't exist
function createToastContainer() {
  let toastContainer = $("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

// Create and display a toast notification
function showToast(message, type = "success") {
  const toastContainer = createToastContainer();

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <span class="close-btn">&times;</span>
  `;

  // Append toast to the container
  toastContainer.appendChild(toast);

  // Show toast with animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500); // Fade-out animation
  }, 3000);

  // Close button functionality
  toast.querySelector(".close-btn").addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  });
}
