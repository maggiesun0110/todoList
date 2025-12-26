/*
==== TODO ====
- fix the styling of edit and delete
- memory
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
        del.onclick = function() {
            delTodo(todos.indexOf(todo));
        };
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

window.editTodo = function(todoIndex, spanElement){
    const todo = lists[currListIndex].todos[todoIndex];
    
    // Create input for todo text
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = todo.text;
    textInput.style.flex = "1";
    textInput.style.width = "fit-content";
    textInput.style.marginRight = "0.5rem";
    
    //span with input
    spanElement.replaceWith(textInput);
    
    //txt input
    textInput.focus();
    textInput.select();
    
    const saveTodo = function() {
        const newText = textInput.value.trim();
        
        if(newText === "") {
            todo.text = todo.text;
        } else {
            todo.text = newText;
        }
        showList();
    };
    
    // Save on Enter key
    textInput.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            saveTodo();
        }
    });
    
    
    // Save on blur
    textInput.addEventListener("blur", saveTodo);
}

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
        "your future self will thank you for the work you do today"
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