let signature = document.getElementById("signature");
let currentList = document.getElementById("schoolList");
let lists = [document.getElementById("schoolList"), document.getElementById("dailyNecessitiesList")];
let currListIndex = 0;
//need a more scalable way to do this, use one h2 and one array to store the names of the lists
//js need a funciton to showList by just getting the list and putting in <ul>

//add the customizability of the name later
function addNewList(){
    signature.innerHTML += `
        <h2 id = "${name}">new list</h2>
    `;
    lists.push(`new list`);
}

function deleteList(){
    lists.splice(currListIndex, 1);
    if (currListIndex >= lists.length){
        currListIndex = lists.length - 1;
    }
}

function previousList(){

}

function nextList(){
    currListIndex += 1;
    if(currListIndex >= lists.length){
        currListIndex = 0;
    }
    currentList = lists[currListIndex+1];
    signature
}

function addTodo(){

}

function motivateMe(){

}