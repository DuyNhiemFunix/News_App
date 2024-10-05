"use strict";

const todoContainerEl = $("todo-container");
const inputTaskEl = $("input-task");
const btnAddEl = $("btn-add");
const todoListEl = $("todo-list");

// Lấy thông tin người dùng hiện tại từ LocalStorage
const todoArr = getFromStorage("todoArr");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Kiểm tra nếu người dùng đã đăng nhập
if (currentUser) {
  displayTasks();
} else {
  todoContainerEl.style.display = "none";
  showToast("You need to log in first", "error");
  setTimeout(() => showToast("Redirecting to login page..."), 1000);
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 3000); // Chuyển trang sau 3 giây
}

btnAddEl.addEventListener("click", () => {
  const taskContent = inputTaskEl.value.trim();
  if (taskContent) {
    // Tạo mới Task với owner là currentUser.username
    const newTask = new Task(taskContent, currentUser.username);
    todoArr.push(newTask);
    saveToLocalStorage();
    displayTasks();
    inputTaskEl.value = ""; // Xóa nội dung input sau khi thêm
  }
});

// Hàm lưu todoArr vào LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}

function displayTasks() {
  todoListEl.innerHTML = ""; // Xóa danh sách cũ
  todoArr.forEach((task, index) => {
    if (task.owner === currentUser.username) {
      // Chỉ hiển thị task của user hiện tại
      const li = document.createElement("li");
      li.textContent = task.task;

      // Đánh dấu hoàn thành
      if (task.isDone) {
        li.classList.add("checked");
      }

      li.addEventListener("click", () => {
        task.isDone = !task.isDone; // Toggle trạng thái
        saveToLocalStorage();
        displayTasks(); // Cập nhật hiển thị
      });

      // Nút xóa
      const spanClose = document.createElement("span");
      spanClose.className = "close";
      spanClose.textContent = "×";

      spanClose.addEventListener("click", (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click trên li
        todoArr.splice(index, 1); // Xóa Task
        saveToLocalStorage();
        displayTasks(); // Cập nhật hiển thị
      });

      li.appendChild(spanClose);
      todoListEl.appendChild(li);
    }
  });
}
