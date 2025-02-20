// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true를 false로
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안 끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝난탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine =document.getElementById("under-line");
let underMenus = document.querySelectorAll(".task-tabs:first-child div");
let taskList = [];
let mode='all'
let filterList=[]

console.log(underMenus);

underMenus.forEach((menu)=>
    menu.addEventListener("click", (e) => underIndicator(e)));

function underIndicator(e){
    underLine.style.left=e.currentTarget.offsetLeft+"px";
    underLine.style.width=e.currentTarget.offsetWidth+"px";
    underLine.style.top=e.currentTarget.offsetTop + e.currentTarget.offsetHeight+"px";

}



for(let i =1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
    filter(event);
    });
}

function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }

    if(taskInput.value.trim() === "") return;

    taskList.push(task);
    taskInput.value = ""; 
    render();
}

function render(){
    let list=[]
    if(mode==='all'){
        list = taskList;
    }else if(mode == 'ongoing' || mode==="done"){
        list = filterList
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task check-task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-clock-rotate-left"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser"></i></button>
                </div>
            </div>`
        }else{
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser"></i></button>
                </div>
            </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
}
function deleteTask(id){
    taskList = taskList.filter(task => task.id !== id);

    if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
    }

    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
}

function filter(event){
    mode = event.target.id;
    filterList = []
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}


addButton.addEventListener("click",addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        addTask();
    }
});