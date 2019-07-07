///defining ui varaibles

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
loadEventListener();


function loadEventListener(){
    form.addEventListener('submit',addTask);

    // remove taskevents
    taskList.addEventListener('click',removeTask);
// clear task events
clearBtn.addEventListener('click',clearTasks);
// filtering task events
filter.addEventListener('keyup',filterTasks);



}
// -------------------------------------
//add tasks
function addTask(e){
    if(taskInput.value===''){
        alert('Add the Task');
    }
///creating li element
const li = document.createElement('li');
//adding class
li.className = 'collection-item';
// creating textnoede and append to li
li.appendChild(document.createTextNode(taskInput.value));
///create new link element
const link = document.createElement('a');
// adding class
link.className ='delete-item secondary-content';
link.innerHTML= '<i class = "fa fa-remove"></i>';
li.appendChild(link);

///append li to the ul
taskList.appendChild(li);

// storing in local storage
storeTaskInLocalStorage(taskInput.value);
///clear the input
taskInput.value = '';


e.preventDefault();
}

//store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// ----------------------------------
// removeTask
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
    //  console.log(e.target);
    if(confirm('are you sure')){
    e.target.parentElement.parentElement.remove();
    // remove tsk from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    }

}
//remove from ls

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( function(task,index){
        if(taskItem.textContent=== task){
             task.splice(index,1);
        }
    }
    );
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// --------------------
// clear task on click of clearBtn   /alll tasks at ounce


function clearTasks(){
    // slower methord--------------
    // taskList.innerHTML = '';
    // faster--------------------
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    ////clearing from ls
  clearTasksFromLocalStorage();
}
//clear Task from Ls
function ClearTasksFromLocalStorage(){
    localStorage.clear();
}
      

// filtering the tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                task.style.display = 'block';

            }else{
                task.style.display = 'none';
            }

        }
    );


}
