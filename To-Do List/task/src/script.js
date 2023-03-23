const inputTask = document.getElementById("input-task");
const addButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
        createTask(task);
    })
}

addButton.addEventListener("click", function() {
    const inputValue = inputTask.value;
    if (inputValue === "") {
        alert("Warning: input field is empty.");
        return;
    }
    const task = {
        id : new Date().getTime(),
        name : inputValue,
        isCompleted: false
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    inputTask.value = "";
})

taskList.addEventListener("click", (e) => {
    if (e.target.className === "delete-btn"){
        const taskId = e.target.closest("li").id;
        removeTask(taskId);
    }
})

taskList.addEventListener("input", (e) =>{
    const taskId = e.target.closest("li").id;
    updateTask(taskId);
})

function createTask(task){
    const listItem = document.createElement("li");
    listItem.id = task.id;
    if (task.isCompleted){
        listItem.className = "complete";
    }
    const listItemHTML = `
                    <input type="checkbox" class="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
                    <span class="task">${task.name}</span>
                    <button class="delete-btn">Delete</button>
    `;
    listItem.innerHTML = listItemHTML;
    taskList.appendChild(listItem);
}

function removeTask(taskId){
    tasks = tasks.filter((task) => task.id !== parseInt(taskId))
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(taskId).remove();
}

function updateTask(taskId){
    const task = tasks.find((task) => task.id === parseInt(taskId));
    task.isCompleted = !task.isCompleted;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}