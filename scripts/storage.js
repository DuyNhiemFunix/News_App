"use strict";

const contentEl = $("content");
// Nav Pagination
const navPageNumEl = $("nav-page-num");

const btnFirstEl = $("btn-first");
const btnPrevEl = $("btn-prev");
const pageNumEl = $("page-num");
const btnNextEl = $("btn-next");
const btnLastEl = $("btn-last");

const API_KEY = "132c171cfc594a4b99c474f1c62c21f3";
// const API_KEY = "b5b77b628b474fb2a52413fb560a59d4";

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

function goToLogin() {
  contentEl.style.display = "none";

  showToast("You need to log in first", "error");
  setTimeout(() => showToast("Redirecting to login page..."), 1000);
  setTimeout(() => (window.location.href = "../index.html"), 3000);
}

// Update pagination controls
function updatePagination() {
  pageNumEl.textContent = `${page}/${totalPages}`;
  const atFirstPage = page === 1;
  const atLastPage = page === totalPages;

  // Toggle button disabled states
  btnPrevEl.disabled = atFirstPage;
  btnFirstEl.disabled = atFirstPage;
  btnNextEl.disabled = atLastPage;
  btnLastEl.disabled = atLastPage;
}

// Display news articles
// function renderData(articles) {
//   const newsContainer = $("news-container");
//   newsContainer.innerHTML = ""; // Clear previous articles
//   articles.forEach((article) => {
//     const card = `
//       <div class="card mb-3">
//         <div class="row no-gutters">
//           <div class="col-md-4">
//             <img src="${
//               article.urlToImage || "../src/404.png"
//             }" class="card-img" alt="${article.title}">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h5 class="card-title">${article.title}</h5>
//               <p class="card-text">${
//                 article.description || "No description available."
//               }</p>
//               <a href="${
//                 article.url
//               }" class="btn btn-primary" target="_blank">View</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     newsContainer.insertAdjacentHTML("beforeend", card);
//   });
// }

//Cách hay nhưng nó trả về 1 cục html và render => thấy lag lag check lai
function renderData(articles) {
  const newsContainerEl = $("news-container");
  newsContainerEl.innerHTML = articles
    .map(
      (article) => `
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img 
          src="${article.urlToImage || "../src/404.png"}" 
          class="card-img" 
          alt="${article.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">
            ${article.description || "No description available."}
            </p>
            <a 
            href="${article.url}" 
            class="btn btn-primary" 
            target="_blank"
            >View</a>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join(""); // Kết hợp thành một chuỗi và gán một lần
  navPageNumEl.style.display = "block"; // Show Nav pages
}

// Load news when change pages
function changePage(url, newPage, query) {
  if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
    page = newPage;
    currentUser.getData(url, page, query);
    updatePagination();
  }
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
