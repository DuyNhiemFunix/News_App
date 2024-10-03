"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
    ----------------------------------------------------- */
const contentEl = $("content");
const btnFirstEl = $("btn-first");
const btnPrevEl = $("btn-prev");
const pageNumEl = $("page-num");
const btnNextEl = $("btn-next");
const btnLastEl = $("btn-last");

let page = 1;
const API_KEY = "94dd90de0ff14b4f9f16072d70756269"; //2nd: 94dd90de0ff14b4f9f16072d70756269     1b6951e2832b4cf888bbac8b559611f8
// user: tommymaroon@rustyload.com - pass: funix123
let totalPages = 0;
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Check if currentUser exists
if (!currentUser) {
  showToast("You need to log in first!", "error");
  setTimeout(() => showToast("Redirecting to login page...!"), 1000);
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 3000); // Chuyển trang sau 3 giây

  // Ẩn khối main
  contentEl.style.display = "none"; // Ẩn phần tử main
} else {
  // Display news articles in the news container

  // Handle button clicks for pagination
  btnPrevEl.addEventListener("click", () => {
    if (page > 1) {
      page--;
      currentUser.getData(page); // Call getData on the current user
    }
  });

  btnNextEl.addEventListener("click", () => {
    if (page < totalPages) {
      page++;
      currentUser.getData(page); // Call getData on the current user
    }
  });

  btnFirstEl.addEventListener("click", () => {
    page = 1;
    currentUser.getData(page); // Call getData on the current user
  });

  btnLastEl.addEventListener("click", () => {
    page = totalPages;
    currentUser.getData(page); // Call getData on the current user
  });

  // Load user data from localStorage and initialize the app
  let currentUser; // Declare currentUser variable

  function initializeApp() {
    const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUserData) {
      currentUser = parseUser(currentUserData); // Initialize currentUser
      currentUser.getData(page); // Load news data
    } else {
      console.error("No current user found in localStorage.");
    }
  }

  // Initialize the application
  initializeApp();
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ""; // Clear previous articles

  articles.forEach((article) => {
    const description = article.description || "No description available.";
    const defaultImageUrl = "../src/404.png"; // Default image URL

    const card = `
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${
            article.urlToImage || defaultImageUrl
          }" class="card-img" alt="${article.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${description}</p>
            <a href="${
              article.url
            }" class="btn btn-primary" target="_blank">View</a>
          </div>
        </div>
      </div>
    </div>
  `;
    newsContainer.insertAdjacentHTML("beforeend", card);
  });
}

// Update pagination controls
function updatePagination() {
  // Update page number display
  pageNumEl.textContent = page;

  // Disable/Enable buttons based on the current page
  btnPrevEl.disabled = page === 1;
  btnNextEl.disabled = page === totalPages;

  // Disable/Enable First/Last buttons
  btnFirstEl.disabled = page === 1;
  btnLastEl.disabled = page === totalPages;
}
