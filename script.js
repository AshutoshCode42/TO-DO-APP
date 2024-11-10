let tasks = [];

document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => displayTask(task));
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    const task = { id: Date.now(), text: taskText };
    tasks.push(task);
    displayTask(task);
    saveTasks();
    taskInput.value = '';
  }
}

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
  li.querySelector('.edit').addEventListener('click', () => editTask(task.id));
  li.querySelector('.delete').addEventListener('click', () => deleteTask(task.id));
  taskList.appendChild(li);
}

function editTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  const newTaskText = prompt("Edit task:", tasks[taskIndex].text);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    tasks[taskIndex].text = newTaskText.trim();
    saveTasks();
    updateTaskList();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => displayTask(task));
}
