/*
==== TODO ====
- add edit func
- add motivation functionality
*/


let listH2 = document.getElementById("listName");
let taskArea = document.getElementById("taskArea");

let lists = [
    {
       name: "school",
       todos: []
    },
    {
        name: "personal", 
        todos: []
    },
    {
        name: "locked out", 
        todos: []
    }
];

let currListIndex = 0;

showList();

window.addNewList = function(){
    const name = prompt("enter new list name:");

    if(!name || name.trim() === "") return;

    lists.push({name: name, todos: []});

    showList();
}

window.deleteList = function(){
    lists.splice(currListIndex, 1);
    if (currListIndex >= lists.length){
        currListIndex = lists.length - 1;
    }
    showList();
}

window.previousList = function(){
    currListIndex = (currListIndex - 1 + lists.length) % lists.length;
    showList()
}

window.nextList = function(){
    currListIndex = (currListIndex+1) % lists.length;
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

function showList(){
    taskArea.innerHTML = "";

    const todos = lists[currListIndex].todos;
    listH2.textContent = lists[currListIndex].name;

    todos.forEach((todo) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const priority = document.createElement("badge");
        const del = document.createElement("button");
        const deadlineSpan = document.createElement("p");
        
        deadlineSpan.textContent = formatDeadline(todo.deadline);
        //do priority based on date later and style later
        priority.textContent = `⚠︎ ${getDeadlineForPriorityDays(todo.deadline)} days`;
        priority.className = getDeadlineForPriorityColor(todo.deadline);
        span.textContent = todo.text;
        del.textContent = "del"
        del.onclick = function() {
            delTodo(todos.indexOf(todo));
        };

        li.appendChild(span);
        li.appendChild(priority);
        li.appendChild(del);
        li.appendChild(deadlineSpan);
        taskArea.appendChild(li);
    })
}

window.addTodo = function(){
    let todoInput = document.getElementById("todoInput");
    let deadlineInput = document.getElementById("deadlineInput");
    const text = todoInput.value.trim();
    const deadline = deadlineInput.value.trim();

    if(text === "") return;

    lists[currListIndex].todos.push({text: text, done: false, deadline: deadline});
    deadlineInput.value = "";
    todoInput.value = "";
    showList();
}

window.delTodo = function(todoIndex){
    lists[currListIndex].todos.splice(todoIndex, 1);
    showList();
}

window.motivateMe = function(){

}

window.addEventListener("keydown", function(e){
    if(e.key === "Enter" && (document.activeElement.id === "deadlineInput" || document.activeElement.id === "todoInput"))
    {
        addTodo();
    }
})