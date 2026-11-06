const input = document.getElementById('addTaskField')
const inputTime = document.getElementById('addTaskTime')
const button = document.getElementById('addTaskButton')
const taskslist = document.getElementById('todolists')
const sortDateUp = document.getElementById('up')
const sortDateDown = document.getElementById('down')
const sortStatusUp = document.getElementById('stUp')
const sortStatusDown = document.getElementById('stDown')
const lowCheck = document.getElementById('low')
const mediumCheck = document.getElementById('medium')
const highCheck = document.getElementById('high')
const inputEdit = document.getElementById("addTaskFieldE");
const timeEdit = document.getElementById("addTaskTimeE");
const lowEdit = document.getElementById("lowE");
const mediumEdit = document.getElementById("mediumE");
const highEdit = document.getElementById("highE");
const saveButton = document.getElementById('saveButton')
const buttons = document.querySelectorAll("button");
const popupE = document.getElementById("popupE");

let editIndex = null;


var mouseclick = new Audio();
mouseclick.src = "mouseClick.mp3";



buttons.forEach(button => {
    button.onmousedown = () => mouseclick.play();
});

function getTodos() {
    return JSON.parse(
        localStorage.getItem("demo_todos_uk") || "[]"
    );
}

function saveTodos(todos) {
    localStorage.setItem(
        "demo_todos_uk",
        JSON.stringify(todos)
    );

    render();
}

function deleteTodo(index) {
    const todos = getTodos();

    todos.splice(index, 1);

    saveTodos(todos);
}

function render() {
    taskslist.innerHTML = "";

    const todos = getTodos();

    todos.forEach((todo, index) => {

        const li = document.createElement("li");
        li.dataset.date = todo.date;
        li.dataset.priority = todo.priority;

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("taskInfo");

        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        textSpan.classList.add("taskName");

        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = todo.priority;

        if (todo.priority === "low") {
            prioritySpan.classList.add("spanLow");
        }

        if (todo.priority === "medium") {
            prioritySpan.classList.add("spanMedium");
        }

        if (todo.priority === "high") {
            prioritySpan.classList.add("spanHigh");
        }

        const timeSpan = document.createElement("span");
        timeSpan.textContent = todo.date.split("-").reverse().join(".");
        timeSpan.classList.add("deadline");

        const editSpan = document.createElement("button")
        editSpan.textContent = "👻";
        editSpan.classList.add("buttonEdit");

        const deleteSpan = document.createElement("button");
        deleteSpan.textContent = "Delete";
        deleteSpan.classList.add("buttonDelete");

        editSpan.addEventListener("click", () => {

            editIndex = index;

            inputEdit.value = todo.text;
            timeEdit.value = todo.date;

            if (todo.priority === "low") {
                lowEdit.checked = true;
            }

            if (todo.priority === "medium") {
                mediumEdit.checked = true;
            }

            if (todo.priority === "high") {
                highEdit.checked = true;
            }

            popupE.classList.add("is-open");
        });

        deleteSpan.addEventListener("click", () => {
            deleteTodo(index);
        });

        taskInfo.appendChild(textSpan);
        taskInfo.appendChild(prioritySpan);

        li.appendChild(taskInfo);
        li.appendChild(timeSpan);
        li.appendChild(editSpan);
        li.appendChild(deleteSpan);

        taskslist.appendChild(li);
    });
}
button.addEventListener("click", () => {
    const text = input.value.trim();
    const time = inputTime.value;
    const check = new Date(time);
    const now = new Date();

    const priority = document.querySelector(
        'input[name="priority"]:checked'
    );

    if (text !== "" && time !== "" && check > now) {

        const todos = getTodos();

        todos.push({
            text: text,
            date: time,
            priority: priority.value
        });

        saveTodos(todos);

        popup.classList.remove("is-open");

        input.value = "";
        inputTime.value = "";


    }
});

const popup = document.getElementById("popup");

document.getElementById("openPopup").addEventListener("click", () => {
    const text = input.value.trim();
    if(text !== "") {
        popup.classList.add("is-open");
    }
});


document.getElementById("closePopup").addEventListener("click", () => {
    popup.classList.remove("is-open");
});

popup.addEventListener("click", (event) => {

    if (event.target === popup) {
        popup.classList.remove("is-open");
    }
});
saveButton.addEventListener("click", () => {

    if (editIndex === null) return;

    const todos = getTodos();

    todos[editIndex].text = inputEdit.value;
    todos[editIndex].date = timeEdit.value;

    if (lowEdit.checked) {
        todos[editIndex].priority = "low";
    }

    if (mediumEdit.checked) {
        todos[editIndex].priority = "medium";
    }

    if (highEdit.checked) {
        todos[editIndex].priority = "high";
    }

    saveTodos(todos);

    popupE.classList.remove("is-open");

    editIndex = null;
});






sortDateUp.addEventListener("click", () => {
    const items = document.querySelectorAll("ol li");
    const arr = Array.from(items);

    console.log(...arr)
    arr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.dataset.date) - new Date(b.dataset.date);
    });
    arr.forEach(a => {
        taskslist.appendChild(a);
    });
});
sortDateDown.addEventListener("click", () => {
    const items = document.querySelectorAll("ol li");
    const arr = Array.from(items);
    console.log(...arr)

    arr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.dataset.date) - new Date(a.dataset.date);


    });
    arr.forEach(a => {
        taskslist.appendChild(a);
    });
});
sortStatusDown.addEventListener("click", () => {
    const items = document.querySelectorAll("li");
    const arr = Array.from(items);
    const p = { high: 3, medium: 2, low: 1 };
    arr.sort((a, b) => p[b.dataset.priority] - p[a.dataset.priority]);
    console.log("test");
    arr.forEach(a => {
        taskslist.appendChild(a);
    });

});
sortStatusUp.addEventListener("click", () => {
    const items = document.querySelectorAll("li");
    const arr = Array.from(items);
    const p = { high: 1, medium: 2, low: 3 };
    arr.sort((a, b) => p[b.dataset.priority] - p[a.dataset.priority]);
    console.log("test");
    arr.forEach(a => {
        taskslist.appendChild(a);
    });

});
render();
