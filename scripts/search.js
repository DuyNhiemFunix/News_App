"use strict";

/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const queryEl = $("input-query");
const submitBtnEl = $("btn-submit");
const newsContainerEl = $("news-container");
const navPageNumEl = $("nav-page-num");
const pageNumEl = $("page-num");
const btnPrevEl = $("btn-prev");
const btnNextEl = $("btn-next");
const btnFirstEl = $("btn-first");
const btnLastEl = $("btn-last");

let page = 1;
// let totalPages = 1; // Khai báo biến totalPages để theo dõi tổng số trang

/* ---------------------------------------------------
    EVENT HANDLERS
----------------------------------------------------- */
navPageNumEl.style.display = "none";

// Search button click event
submitBtnEl.addEventListener("click", () => {
  const query = queryEl.value.trim();

  // Validate if the user has entered a query
  if (!query) {
    showToast("Please enter a keyword to search.", "error");
    return;
  }

  // Reset page number to 1 for new searches
  page = 1;

  // Fetch search results
  fetchSearchResults(query, page);
});

// Previous page button event
btnPrevEl.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchSearchResults(queryEl.value.trim(), page);
    updatePagination();
  }
});

// Next page button event
btnNextEl.addEventListener("click", () => {
  if (page < totalPages) {
    page++;
    fetchSearchResults(queryEl.value.trim(), page);
    updatePagination();
  }
});

// First page button event
btnFirstEl.addEventListener("click", () => {
  page = 1;
  fetchSearchResults(queryEl.value.trim(), page);
  updatePagination();
});

// Last page button event
btnLastEl.addEventListener("click", () => {
  page = totalPages;
  fetchSearchResults(queryEl.value.trim(), page);
  updatePagination();
});

/* ---------------------------------------------------
    FUNCTIONS
----------------------------------------------------- */

// Fetch search results from News API
async function fetchSearchResults(query, page = 1) {
  // const apiKey = "94dd90de0ff14b4f9f16072d70756269"; // Replace with your News API key
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&page=${page}&pageSize=20`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.code === "maximumResultsReached") {
      showToast(data.message, "error");
      newsContainerEl.innerHTML = "";
      return;
    }
    if (!data.articles || data.articles.length === 0) {
      showToast("No results found for your search", "error");
      newsContainerEl.innerHTML = "";
      return;
    }

    displaySearchResults(data.articles);
    totalPages = Math.ceil(data.totalResults / 20); // Assuming 10 articles per page
    navPageNumEl.style.display = "block";

    updatePagination();
  } catch (error) {
    showToast("Error fetching search results:", error);
  }
}

// Display search results in the news container
function displaySearchResults(articles) {
  newsContainerEl.innerHTML = articles
    .map((article) => {
      return `
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="${article.urlToImage || "../src/404.png"}"
                  class="card-img"
                  alt="${article.title}"
                />
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
      `;
    })
    .join("");
}

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
