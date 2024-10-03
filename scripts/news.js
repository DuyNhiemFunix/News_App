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
let totalPages = 0;
const API_KEY = "94dd90de0ff14b4f9f16072d70756269";

const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
const currentUser = currentUserData ? parseUser(currentUserData) : null;

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Redirect to login if no current user is found
if (!currentUser) {
  showToast("You need to log in first", "error");
  setTimeout(() => showToast("Redirecting to login page..."), 1000);
  setTimeout(() => (window.location.href = "../index.html"), 3000);
  contentEl.style.display = "none"; // Hide content
} else {
  loadNewsData();

  // Pagination button click handlers
  btnPrevEl.addEventListener("click", () => changePage(page - 1));
  btnNextEl.addEventListener("click", () => changePage(page + 1));
  btnFirstEl.addEventListener("click", () => changePage(1));
  btnLastEl.addEventListener("click", () => changePage(totalPages));
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Load news and update pagination
function loadNewsData() {
  currentUser.getData(page);
  updatePagination();
}

// Load news when change pages
function changePage(newPage) {
  if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
    page = newPage;
    loadNewsData();
  }
}

// Prevent multiple API calls on rapid clicks
// Consider disabling the pagination buttons while a new page is being loaded to prevent multiple API calls in quick succession (hơi khó hiểu)
// function changePage(newPage) {
//   if (newPage >= 1 && newPage <= totalPages) {
//     btnPrevEl.disabled = true;
//     btnNextEl.disabled = true;
//     page = newPage;
//     loadNewsData().finally(() => {
//       btnPrevEl.disabled = page === 1;
//       btnNextEl.disabled = page === totalPages;
//     });
//   }
// }

// Update pagination controls
function updatePagination() {
  pageNumEl.textContent = page;
  const atFirstPage = page === 1;
  const atLastPage = page === totalPages;

  // Toggle button disabled states
  btnPrevEl.disabled = atFirstPage;
  btnFirstEl.disabled = atFirstPage;
  btnNextEl.disabled = atLastPage;
  btnLastEl.disabled = atLastPage;
}

////////THAO KHẢO LẠI CÁCH BẤM NÚT KHI CHƯA TỐI ƯU CODE NHƯNG DỄ HIỂU/////////////
// Handle button clicks for pagination
// btnPrevEl.addEventListener("click", () => {
//   if (page > 1) {
//     page--;
//     currentUser.getData(page); // Call getData on the current user
//   }
// });

// btnNextEl.addEventListener("click", () => {
//   if (page < totalPages) {
//     page++;
//     currentUser.getData(page); // Call getData on the current user
//   }
// });

// btnFirstEl.addEventListener("click", () => {
//   page = 1;
//   currentUser.getData(page); // Call getData on the current user
// });

// btnLastEl.addEventListener("click", () => {
//   page = totalPages;
//   currentUser.getData(page); // Call getData on the current user
// });
