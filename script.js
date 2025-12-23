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

    //currListIndex = lists.length-1;
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
        const checkbox = document.createElement("input");
        const span = document.createElement("span");

        checkbox.type = "checkbox";
        checkbox.checked = todo.done;

        checkbox.addEventListener("change", () => {
            todo.done = checkbox.checked;
            showList();
        });

        span.textContent = todo.text;
        if(todo.done){
            span.style.textDecoration = "line-through";
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        taskArea.appendChild(li);
    })
}

window.addTodo = function(){

}

window.motivateMe = function(){

}