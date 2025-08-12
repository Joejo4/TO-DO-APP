// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = 
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>;
    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = '';
}

// Toggle task completion
function toggleComplete(element) {
    element.classList.toggle('completed');
    updateTasks();
}

// Delete a task
function deleteTask(element) {
    element.parentElement.remove();
    updateTasks();
}

// Save task to localStorage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update tasks in localStorage
function updateTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('span').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = 
            <span onclick="toggleComplete(this)"${task.completed ? ' class="completed"' : ''}>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>;
        taskList.appendChild(li);
    });
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}