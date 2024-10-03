/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const $ = document.getElementById.bind(document);

// User class
class User {
  constructor(firstName, lastName, username, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize || 10;
    this.category = category || "general";
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

      // Display the news articles
      displayNews(data.articles);

      // Update pagination controls
      updatePagination();
    } catch (error) {
      console.error(error.message);
    }
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
    userData.password,
    userData.pageSize,
    userData.category
  );
}

/////////////////////////////////////////////
// Create toast container if it doesn't exist
function createToastContainer() {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
}

// Function to create and display a toast notification
function showToast(message, type = "success") {
  createToastContainer(); // Ensure the toast container exists

  const toastContainer = document.getElementById("toast-container");

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
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 500); // Allow time for fade-out animation
  }, 3000);

  // Close button functionality
  toast.querySelector(".close-btn").addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 500);
  });
}
