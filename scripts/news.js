"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
// const contentEl = $("content");

const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
const currentUser = currentUserData ? parseUser(currentUserData) : null;

/* ---------------------------------------------------
PROCESS FLOW
----------------------------------------------------- */
// // Hide the navigation page
// navPageNumEl.style.display = "none";

// Redirect to login if no current user is found
if (!currentUser) {
  goToLogin();
} else {
  const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${currentUser.category}&pageSize=${currentUser.pageSize}&apiKey=${API_KEY}`;
  page = 1;
  currentUser.getData(newsUrl, page);

  // Pagination button click handlers
  btnPrevEl.addEventListener("click", () => changePage(newsUrl, page - 1));
  btnNextEl.addEventListener("click", () => changePage(newsUrl, page + 1));
  btnFirstEl.addEventListener("click", () => changePage(newsUrl, 1));
  btnLastEl.addEventListener("click", () => changePage(newsUrl, totalPages));
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */

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
