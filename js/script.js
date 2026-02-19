const inputBox = document.getElementById("input-box");
const datePicker = document.getElementById("date-picker");
const todoBody = document.getElementById("todo-body");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteBtn = document.getElementById("delete-btn");

let todos = [];

// Fungsi untuk nampilin list ke tabel
function renderTodos(data = todos) {
    todoBody.innerHTML = "";

    if (data.length === 0) {
        todoBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="4">No task found</td>
            </tr>`;
        return;
    }

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td><span class="status-label">${item.completed ? 'Completed' : 'Pending'}</span></td>
            <td>
                <button class="action-btn" onclick="toggleStatus(${index})">Done</button>
                <button class="action-btn" style="background: #ff4d4d;" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        todoBody.appendChild(row);
    });
}

// Fungsi Tambah Task & Validasi
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

// Fungsi Hapus Satu Task
function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Fungsi Ganti Status
function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Fitur Clear All
deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure want to clear all todo list?")) {
        todos = [];
        renderTodos();
    }
});

// Fitur Filter (Menampilkan yang belum selesai saja / toggle)
let isFiltered = false;
filterBtn.addEventListener("click", () => {
    isFiltered = !isFiltered;
    if (isFiltered) {
        const pendingTasks = todos.filter(t => !t.completed);
        renderTodos(pendingTasks);
        filterBtn.innerText = "Show All";
    } else {
        renderTodos();
        filterBtn.innerText = "Filter";
    }
});