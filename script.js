const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task));
};

// Add task on button click
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTask(taskText);
        taskInput.value = '';
    }
});

// Add task to UI
function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';

    // Delete task on click
    deleteBtn.addEventListener('click', function () {
        li.remove();
        deleteTask(taskText);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
