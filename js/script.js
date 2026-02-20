const inputBox = document.getElementById("input-box");
const datePicker = document.getElementById("date-picker");
const todoBody = document.getElementById("todo-body");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteBtn = document.getElementById("delete-btn");
const showingText = document.getElementById("filter-text");
const statusInfo = document.getElementById("status-info");
let currentFilter = "all";
let todos = [];


function renderTodos(data = todos) {
todoBody.innerHTML = "";
    
    
    let filteredData = todos;
    if (currentFilter === "pending") filteredData = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredData = todos.filter(t => t.completed);

    
    showingText.innerText = `Showing ${currentFilter}`;

    
    if (currentFilter === "all") {
        statusInfo.style.display = "none"; 
    } else {
        statusInfo.style.display = "block"; 
        const label = currentFilter === "completed" ? "completed task(s)" : "pending task(s)";
        statusInfo.innerHTML = `<span>${filteredData.length}</span> ${label}`;
    }

    if (filteredData.length === 0) {
        todoBody.innerHTML = `<tr class="empty-row"><td colspan="4">No task found</td></tr>`;
        return;
    }

    
    filteredData.forEach((item) => {
        const realIndex = todos.indexOf(item); 
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="${item.completed ? 'text-decoration: line-through; color: rgba(190, 222, 247, 0.5);' : ''}">${item.task}</td>
            <td>${item.date}</td>
            <td>${item.completed ? 'Completed' : 'Pending'}</td>
            <td>
                <button class="action-btn" onclick="toggleStatus(${realIndex})">${item.completed ? 'Undo' : 'Done'}</button>
                <button class="action-btn" style="background: #ff4d4d;" onclick="deleteTask(${realIndex})">Delete</button>
            </td>
        `;
        todoBody.appendChild(row);
    });
}


addBtn.addEventListener("click", () => {
    const taskValue = inputBox.value.trim();
    const dateValue = datePicker.value;

    if (taskValue === "" || dateValue === "") {
        alert("Please fill in both task and date fields.");
        return;
    }

    todos.push({
        task: taskValue,
        date: dateValue,
        completed: false
    });

    inputBox.value = "";
    datePicker.value = "";
    renderTodos();
});


function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}


function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}


deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure want to clear all todo list?")) {
        todos = [];
        renderTodos();
    }
});


let isFiltered = false;
filterBtn.addEventListener("click", () => {
    if (currentFilter === "all") currentFilter = "pending";
    else if (currentFilter === "pending") currentFilter = "completed";
    else currentFilter = "all";
    renderTodos();
});