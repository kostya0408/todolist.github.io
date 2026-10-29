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





button.addEventListener("click", () => {
    const text = input.value.trim();
    const time = inputTime.value;
     const check = new Date(time);
    const now = new Date();

    // if (text !== "") {
    //     const li = document.createElement("li");
    //     li.textContent = text;
    //     taskslist.appendChild(li);
    //     input.value = " ";
    // }
    if (text !== "" && time !== "" && check > now) {
        const li = document.createElement("li");
        const taskInfo = document.createElement("div");
        taskInfo.classList.add("taskInfo");


        const textSpan = document.createElement("span")
        textSpan.textContent = text;
        textSpan.classList.add("taskName")
        taskInfo.appendChild(textSpan);




        const timeSpan = document.createElement("span")
        const reversed = time.split('-').reverse().join('.');
        timeSpan.textContent = reversed;
        li.dataset.date = time;
        timeSpan.classList.add("deadline")




        if (document.getElementById('low').checked === true) {
            li.dataset.priority = "low";
            const prioritySpan = document.createElement("span")
            prioritySpan.textContent = "low";
            prioritySpan.classList.add("spanLow")
            taskInfo.appendChild(prioritySpan);

        }
        if (document.getElementById('medium').checked === true) {
            li.dataset.priority = "medium";
            const prioritySpan = document.createElement("span")
            prioritySpan.textContent = "medium";
            prioritySpan.classList.add("spanMedium")
            taskInfo.appendChild(prioritySpan);

        }
        if (document.getElementById('high').checked === true) {
            li.dataset.priority = "high";
            const prioritySpan = document.createElement("span")
            prioritySpan.textContent = "high";
            prioritySpan.classList.add("spanHigh")
            taskInfo.appendChild(prioritySpan);

        }


        const buttonSpan = document.createElement("button")
        buttonSpan.textContent = "Delete";
        buttonSpan.classList.add("buttonDelete");


        buttonSpan.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(taskInfo);
        li.appendChild(timeSpan);
        li.appendChild(buttonSpan);

        taskslist.appendChild(li);

        input.value = "";
        inputTime.value = "";
    }


});
const popup = document.getElementById("popup");

document.getElementById("openPopup").addEventListener("click", () => {
    popup.classList.add("is-open");
});


document.getElementById("closePopup").addEventListener("click", () => {
    popup.classList.remove("is-open");
});

popup.addEventListener("click", (event) => {

    if (event.target === popup) {
        popup.classList.remove("is-open");
    }
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









