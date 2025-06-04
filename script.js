const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);
renderTasks();
