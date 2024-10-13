// app.js
let tasks = [];

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task when the user clicks the "Add Task" button
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Load tasks from localStorage and display them
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => displayTask(task));
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task to the list
function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    const task = { id: Date.now(), text: taskText };
    tasks.push(task);
    displayTask(task);
    saveTasks();
    taskInput.value = ''; // Clear input field
  }
}

// Display a task in the list
function displayTask(task) {
  const taskList = document.getElementById('task-list');
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;

  // Edit task event listener
  li.querySelector('.edit').addEventListener('click', () => editTask(task.id));

  // Delete task event listener
  li.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));

  taskList.appendChild(li);
}

// Edit an existing task
function editTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  const newTaskText = prompt("Edit task:", tasks[taskIndex].text);

  if (newTaskText !== null && newTaskText.trim() !== '') {
    tasks[taskIndex].text = newTaskText.trim();
    saveTasks();
    updateTaskList();
  }
}

// Delete a task from the list
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  updateTaskList();
}

// Update the displayed task list
function updateTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear current tasks
  tasks.forEach(task => displayTask(task)); // Re-display updated tasks
}
