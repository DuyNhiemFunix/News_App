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
  currentUser.getData(page);

  // Pagination button click handlers
  btnPrevEl.addEventListener("click", () => changePage(page - 1));
  btnNextEl.addEventListener("click", () => changePage(page + 1));
  btnFirstEl.addEventListener("click", () => changePage(1));
  btnLastEl.addEventListener("click", () => changePage(totalPages));
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
// Load news when change pages
function changePage(newPage) {
  if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
    page = newPage;
    currentUser.getData(page);
  }
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
// function displayNews(articles) {
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
function displayNews(articles) {
  const newsContainer = $("news-container");
  newsContainer.innerHTML = articles
    .map(
      (article) => `
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${
            article.urlToImage || "../src/404.png"
          }" class="card-img" alt="${article.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${
              article.description || "No description available."
            }</p>
            <a href="${
              article.url
            }" class="btn btn-primary" target="_blank">View</a>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join(""); // Kết hợp thành một chuỗi và gán một lần
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
