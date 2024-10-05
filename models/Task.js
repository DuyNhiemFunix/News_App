class Task {
  constructor(task, owner) {
    this.task = task;
    this.owner = owner; // Gán chủ sở hữu dựa trên username của User hiện tại
    this.isDone = false; // Mặc định là chưa hoàn thành
  }
}
