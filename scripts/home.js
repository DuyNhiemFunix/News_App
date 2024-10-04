"use strict";
/* ---------------------------------------------------
    VARIABLE DECLARATION
----------------------------------------------------- */
const loginModalEl = $("login-modal");
const mainContentEl = $("main-content");
const welcomeMessageEl = $("welcome-message");
const logoutBtnEl = $("btn-logout");

/* ---------------------------------------------------
    PROCESS FLOW
----------------------------------------------------- */
// Lấy currentUser từ localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// Không dùng getFromStorage vì khi ko tồn tại currentUser sẽ trả về [] => phải check thêm đk

if (currentUser) {
  // Nếu đã đăng nhập
  loginModalEl.style.display = "none"; // Ẩn các nút Login/Register
  mainContentEl.style.display = "block"; // Hiển thị thông điệp chào mừng và nút Logout

  // Hiển thị thông điệp chào mừng
  welcomeMessageEl.textContent = `Welcome ${currentUser.firstName}!`;
} else {
  // Nếu chưa đăng nhập
  loginModalEl.style.display = "block"; // Hiển thị các nút Login/Register
  mainContentEl.style.display = "none"; // Ẩn thông điệp chào mừng và nút Logout
}

// Xử lý sự kiện Logout
logoutBtnEl.addEventListener("click", function () {
  // Xóa thông tin người dùng khỏi localStorage
  localStorage.removeItem("currentUser");

  // Chuyển hướng đến trang login
  window.location.href = "../index.html";
});
