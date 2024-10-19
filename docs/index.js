const input = document.getElementById("todo");
const submitButton = document.getElementById("submit");
const list = document.getElementById("result");
const messsage = document.getElementById("alert");
const dailyButton = document.getElementById("daily");
const dailyTasks = document.getElementById("dailyTasks");
const clearButton = document.getElementById("clear");

loadSaved();
loadDailyes();

submitButton.onclick = function(){
    const ToDo = input.value.trim();     

    if(ToDo != ""){
        createElement(ToDo);

        input.value = "";
        messsage.textContent = "";

        saveToDoItems();
    }
    else{
        //messsage.textContent = "Please insert a To Do";
        alert("Please insert a valid task\nYou can't enter an empty one")
    }

    return ToDo;
}

dailyButton.onclick = function(){
    const ToDo = input.value.trim();

    if(ToDo != ""){
        createElementDaily(ToDo);

        input.value = "";
        messsage.textContent = "";

        saveDailyes();
    }
    else{
        //messsage.textContent = "Please insert a To Do";
        alert("Please insert a valid task\nYou can't enter an empty one")
    }
}

function createElement(ToDo){
    const element = document.createElement('li');
    const text = document.createElement("div");

    text.textContent = ToDo;
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.className = "Delete";

    list.appendChild(element);
    element.appendChild(text);
    element.appendChild(deleteButton);
    

    deleteButton.onclick = function(){
        list.removeChild(element);
        saveToDoItems();
    }

    return element;

}

function createElementDaily(ToDo){
    const element = document.createElement('li');
    const text = document.createElement("div");
    //const check = document.createElement("input");
    //const state = check.checked;

    text.textContent = ToDo;
    const deleteButton = document.createElement("button");

    //check.classList = "check";
    //check.type = "checkbox"

    deleteButton.textContent = "Delete";
    deleteButton.className = "Delete";

    dailyTasks.appendChild(element);
    element.appendChild(text);
    //element.appendChild(check);
    element.appendChild(deleteButton);
    

    deleteButton.onclick = function(){
        dailyTasks.removeChild(element);
        saveDailyes();
    }

    //return check;
}


function saveToDoItems(){

    let ToDos = [];
    list.querySelectorAll('li').forEach(function(ToDo){
        ToDos.push(ToDo.textContent.replace("Delete", "").trim());
    });
     
    localStorage.setItem('ToDos', JSON.stringify(ToDos));

}

function saveDailyes(){
    let Dailyes = [];
    dailyTasks.querySelectorAll('li').forEach(function(daily){
        Dailyes.push(daily.textContent.replace("Delete", "").trim());
    });

    localStorage.setItem('Dailyes', JSON.stringify(Dailyes));
}


function loadSaved(){

    const ToDos = JSON.parse(localStorage.getItem('ToDos')) || [];

    ToDos.forEach(createElement);

}

function loadDailyes(){

    const Daylies = JSON.parse(localStorage.getItem('Dailyes')) || [];

    Daylies.forEach(createElementDaily);

}


clearButton.onclick = function(){
    dailyTasks.innerHTML = "";
    list.innerHTML = "";
    saveDailyes();
    saveToDoItems();
}

