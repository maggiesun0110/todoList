/*
==== TODO ====
- add edit func
- add deadline functionality
- add priority symbol
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
        
        deadlineSpan.textContent = todo.deadline;
        //do priority based on date later and style later
        priority.textContent = "⚠︎";
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