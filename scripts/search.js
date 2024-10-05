"use strict";

/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const queryEl = $("input-query");
const submitBtnEl = $("btn-submit");
const newsContainerEl = $("news-container");
// const mainEl = $("main");

const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
const currentUser = currentUserData ? parseUser(currentUserData) : null;

let query;
// totalPages = 1;

/* ---------------------------------------------------
EVENT HANDLERS
----------------------------------------------------- */
// Hide the navigation page
navPageNumEl.style.display = "none";

if (!currentUser) {
  // mainEl.style.display = "none";
  goToLogin();
} else {
  const searchUrl = `https://newsapi.org/v2/everything?&pageSize=${currentUser.pageSize}&apiKey=${API_KEY}`;
  // Search button click event
  submitBtnEl.addEventListener("click", () => {
    query = queryEl.value.trim();
    // Validate if the user has entered a query
    if (!query) {
      showToast("Please enter a keyword to search.", "error");
      return;
    }

    // Fetch search results
    page = 1; // Reset page for new search
    currentUser.getData(searchUrl, page, query);
  });

  // Pagination button click handlers
  btnPrevEl.addEventListener("click", () =>
    changePage(searchUrl, page - 1, query)
  );
  btnNextEl.addEventListener("click", () =>
    changePage(searchUrl, page + 1, query)
  );
  btnFirstEl.addEventListener("click", () => changePage(searchUrl, 1, query));
  btnLastEl.addEventListener("click", () =>
    changePage(searchUrl, totalPages, query)
  );
}

/* ---------------------------------------------------
    FUNCTIONS
----------------------------------------------------- */

// async function displaySearch(query, page = 1) {
//   // const apiKey = "94dd90de0ff14b4f9f16072d70756269"; // Replace with your News API key
//   // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&pageSize=${this.pageSize}&page=${page}&apiKey=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.code === "maximumResultsReached") {
//       showToast("Free API limit: " + data.message, "error");
//       newsContainerEl.innerHTML = "";
//       return;
//     }
//     if (!data.articles || data.articles.length === 0) {
//       showToast("No results found for your search", "error");
//       newsContainerEl.innerHTML = "";
//       return;
//     }

//     renderData(data.articles);
//     totalPages = Math.ceil(data.totalResults / 20); // Assuming 10 articles per page
//     navPageNumEl.style.display = "block";

//     updatePagination();
//   } catch (error) {
//     showToast("Error fetching search results:", error);
//   }
// }
