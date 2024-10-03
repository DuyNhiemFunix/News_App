"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
    ----------------------------------------------------- */
const mainContainerEl = $("main");
const submitBtnEl = $("btn-submit");
const pageSizeEl = $("input-page-size");
const categoryEl = $("input-category");

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
const userArr = getFromStorage("userArr");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Check if currentUser exists
if (!currentUser) {
  showToast("You need to log in first!", "error");
  setTimeout(() => showToast("Redirecting to login page..."));
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 3000); // Chuyển trang sau 3 giây

  // Ẩn khối main
  mainContainerEl.style.display = "none"; // Ẩn phần tử main
} else {
  pageSizeEl.value = currentUser.pageSize || 10;

  // Assign click event to Save Settings button
  submitBtnEl.addEventListener("click", () => {
    const pageSizeValue = Number(pageSizeEl.value);

    if (pageSizeValue > 100) {
      pageSizeEl.value = 100;
      currentUser.pageSize = 100;
      showToast("Free API limit", "error");
      setTimeout(
        () => showToast("News per page set to 100 successfully"),
        1500
      );
    } else if (pageSizeValue <= 0) {
      pageSizeEl.value = 1;
      currentUser.pageSize = 1;
      showToast("News per page must be more than 0", "error");
      setTimeout(() => showToast("News per page set to 1 successfully"), 1500);
    } else {
      currentUser.pageSize = pageSizeValue;
      showToast("Settings saved successfully");
    }

    currentUser.category = categoryEl.value;

    // Update userArr with the new currentUser data
    const userIndex = userArr.findIndex(
      (user) => user.username === currentUser.username
    );
    if (userIndex !== -1) {
      userArr[userIndex] = currentUser; // Update the user in the array
    }

    // Save the updated currentUser and userArr to localStorage
    saveToStorage("currentUser", currentUser);
    saveToStorage("userArr", userArr);
  });
}
