let arrayTasks = [];

let taskId, TaskName, check = false;

function load(){

    if(localStorage.getItem("Tasks") != "[]"){
        arrayTasks = JSON.parse(localStorage.getItem("Tasks"));
        taskId = arrayTasks[arrayTasks.length - 1].TaskId;
        taskId++;
    } 

    else{
        taskId = 1; 
    }
    
    for(let i = 0; i < arrayTasks.length; i++){
        let div = document.createElement("div");
        div.setAttribute("id", "task");
        div.setAttribute("ondblclick", "TaskDelete(this)");

        let center = document.createElement("center");
        
        let p = document.createElement("p");
        p.setAttribute("id", "taskName");
        p.innerHTML = arrayTasks[i].TaskName;
        p.setAttribute("onclick", "TaskRename(this)");

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "check");
        input.setAttribute("value", arrayTasks[i].TaskId.toString());

        if(arrayTasks[i].Check == true) input.setAttribute("checked", true);

        input.setAttribute("onchange", "CheckChange(this)");

        center.append(p);
        center.append(input);

        div.append(center);

        document.getElementById('AllTasks').append(div);
    }

}

function add(){
    TaskName = document.getElementById("taskText").value;
    document.getElementById("taskText").value = "";
    if(TaskName != ""){

        let div = document.createElement("div");
        div.setAttribute("id", "task");
        div.setAttribute("ondblclick", "TaskDelete(this)");

        let center = document.createElement("center");
        
        let p = document.createElement("p");
        p.setAttribute("id", "taskName");
        p.innerHTML = TaskName;
        p.setAttribute("onclick", "TaskRename(this)");

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "check");
        input.setAttribute("value", taskId);
        input.setAttribute("onchange", "CheckChange(this)");

        center.append(p);
        center.append(input);

        div.append(center);

        document.getElementById('AllTasks').append(div);

        ArrayPush();
    }
}

window.onunload = function() {
    localStorage.removeItem("Tasks");

    localStorage.setItem("Tasks", JSON.stringify(arrayTasks));
}

function ArrayPush(){
    arrayTasks.push({TaskId: taskId, TaskName: TaskName, Check: false});
    taskId++;
}

function CheckChange(OBJ){
    check = OBJ.checked;
    arrayTasks[OBJ.value - 1].Check = check;
}

function TaskRename(OBJ){
    let parent = OBJ.parentNode.parentNode;
    let result = prompt("Введіть нову назву завдання: ");
    if(result) {
        TaskName = result;
        if (TaskName != "") {

            for (let i = 0; i < arrayTasks.length; i++) {
                if (arrayTasks[i].TaskId == parent.childNodes[0].childNodes[1].value) {
                    arrayTasks[i].TaskName = TaskName;
                }
            }

        } else {
            alert("Ви не ввели нічого");
        }
    }
     location.reload();
}

function TaskDelete(OBJ){
    if(confirm("Видалити завдання '" + OBJ.childNodes[0].childNodes[0].innerHTML +"'")){

        for(let i = 0; i < arrayTasks.length; i++){
            if(arrayTasks[i].TaskId == OBJ.childNodes[0].childNodes[1].value){
                arrayTasks.splice(i, 1);
            }
        }

    }

    location.reload();
}