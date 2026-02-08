/*
==== TODO ====
- fix the styling of edit and delete
- memory
*/
let listH2;
let taskArea;


window.addEventListener("DOMContentLoaded", () => {
  listH2 = document.getElementById("listName");
  taskArea = document.getElementById("taskArea");

  showList();
});

async function getCurrentList(){
    const res = await fetch("http://localhost:3000/api/list");
    return res.json();
}

window.addNewList = async function(){
    const name = prompt("enter new list name:");

    if(!name || name.trim() === "") return;

    await fetch("http://localhost:3000/api/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    showList();
}

window.deleteList = async function(){
    await fetch(`http://localhost:3000/api/list`, {
        method: "DELETE"
    });

    showList();
}

window.previousList = async function(){
    await fetch("http://localhost:3000/api/list/prev", {
        method: "POST"
    });
    showList();
}

window.nextList = async function(){
    await fetch("http://localhost:3000/api/list/next", {
        method: "POST"
    });
    showList();
}

function getDeadlineForPriorityColor(deadline)
{
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = (deadlineDate - today) / (1000 * 60 * 60 * 24);

    if(diffDays < 2) return "high";
    if(diffDays < 4) return "medium";
    return "low";
}

function getDeadlineForPriorityDays(deadline)
{
    if(deadline === "") return "no";
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    return diffDays;
}

function formatDeadline(deadline)
{
    if(deadline === "") return "";
    const deadlineDate = new Date(deadline);
    const month = deadlineDate.toLocaleDateString('en-US', { month: 'short' });
    const day = deadlineDate.getDate();
    const weekday = deadlineDate.toLocaleDateString('en-US', { weekday: 'short' });
    return `${month} ${day}, ${weekday}`;
}

async function showList(){
    const data = await getCurrentList();
    const todos = data.list.todos;

    listH2.textContent = data.list.name;
    taskArea.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const edit = document.createElement("button");
        const priority = document.createElement("badge");
        const del = document.createElement("button");
        const deadlineSpan = document.createElement("p");
        
        deadlineSpan.textContent = formatDeadline(todo.deadline);
        //do priority based on date later and style later
        priority.textContent = `⚠︎ ${getDeadlineForPriorityDays(todo.deadline)} days`;
        priority.className = getDeadlineForPriorityColor(todo.deadline);
        span.textContent = todo.text;
        del.textContent = "del"
        del.onclick = () => delTodo(index);
        edit.onclick = () => editTodo(index, span);
        del.className = "delBtn";

        edit.textContent = "✎";
        edit.onclick = function() {
            editTodo(todos.indexOf(todo), span);
        };
        edit.className = "editBtn";

        li.appendChild(span);
        li.appendChild(priority);
        li.appendChild(edit);
        li.appendChild(del);
        li.appendChild(deadlineSpan);
        taskArea.appendChild(li);
    })
}

window.addTodo = async function(){
    const todoInput = document.getElementById("todoInput");
    const deadlineInput = document.getElementById("deadlineInput");

    const text = todoInput.value.trim();
    const deadline = deadlineInput.value.trim();

    if (text === "") return;

    await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, deadline })
    });

    todoInput.value = "";
    deadlineInput.value = "";

    showList();
}

window.delTodo = async function(todoIndex){
    await fetch(`http://localhost:3000/api/todo/${todoIndex}`, {
        method: "DELETE"
    });

    showList();
}
window.editTodo = async function(todoIndex, spanElement) {
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = spanElement.textContent;

    spanElement.replaceWith(textInput);
    textInput.focus();
    textInput.select();

    const saveTodo = async () => {
        const newText = textInput.value.trim();
        if (newText === "") return showList();

        await fetch(`http://localhost:3000/api/todo/${todoIndex}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
        });

        showList();
    };

    textInput.addEventListener("keydown", e => {
        if (e.key === "Enter") saveTodo();
    });

    textInput.addEventListener("blur", saveTodo);
};

window.motivateMe = function(){
    const motivations = [
        "bored again?? don't you want to achieve your goals?",
        "oh my god, remember that person? they're not bored right now like you",
        "i thought you had it in you...",
        "every minute you waste is a minute closer to your goals slipping away",
        "make. it. happen. think about the glory afterwards",
        "can't believe you need motivation to do your own tasks",
        "you got this! just do the thing you've been putting off",
        "imagine how accomplished you'll feel after finishing your tasks",
        "stop procrastinating and start dominating your to-do list",
        "your future self will thank you for the work you do today",
        "seriously, just do it. it's not that hard.",
    ]

    const randomIndex = Math.floor(Math.random() * motivations.length);
    alert(motivations[randomIndex]);
}

window.addEventListener("keydown", function(e){
    if(e.key === "Enter" && (document.activeElement.id === "deadlineInput" || document.activeElement.id === "todoInput"))
    {
        addTodo();
    }
})