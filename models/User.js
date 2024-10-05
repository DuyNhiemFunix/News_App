/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const $ = document.getElementById.bind(document);
let page;
let totalPages;

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
  async getData(baseUrl, page, query) {
    // Construct the URL using the provided base URL and page number
    const url = `${baseUrl}&page=${page}${query ? `&q=${query}` : ""}`; //${ query ? `&q=${query}` : "" }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      console.log(data.code);

      //No results found
      if (!data.totalResults) {
        showToast("No results found for your search", "error");
        navPageNumEl.style.display = "none";
        newsContainerEl.innerHTML = "";
        queryEl.focus();
        queryEl.select();
        return;
      }

      // Calculate totalPages after fetching totalResults
      totalPages = Math.ceil(data.totalResults / this.pageSize);

      // Update Pagination status
      updatePagination();

      // Display the news articles
      renderData(data.articles);

      return;
    } catch (error) {
      console.error(error.message);

      newsContainerEl.innerHTML = ""; // Clear previous articles

      if (error.message == 426)
        showToast("Free API limit (Upgrade Required)", "error");

      if (error.message == 429)
        showToast("Free API limit (Too Many Requests)", "error");
    }
  }
}

/* ---------------------------------------------------
    FUNCTION AREA
----------------------------------------------------- */
