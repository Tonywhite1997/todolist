//selecting sliding navBar elements from the DOM.
const slideInBtn = document.querySelector("header .fa-bars");
const slideOutBtn = document.querySelector("header .fa-times");
const navBar = document.querySelector(".header__nav")

//navBar events listeners.
slideInBtn.addEventListener("click", ()=>{
    navBar.classList.add("slide-in")
    slideInBtn.style.display = "none"
    slideOutBtn.style.display = "flex"
});

slideOutBtn.addEventListener("click", ()=>{
    navBar.classList.remove("slide-in")
    slideInBtn.style.display = "flex"
    slideOutBtn.style.display = "none"
})

//writing the actions for my todolist app.

const inputField = document.querySelector(".main .main__add__input__field")
const taskList = document.querySelector(".main .main__task__lists")
const addBtn = document.querySelector(".main .main__add__input__button")

//saving user task to local storage

let today = new Date();
let date = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`

let userTask = {
    date: "",
    task: "",
    completedColor: "",
    completedStyle: "",
    completedDate: ""
}
function saveUserTasks(){
    let inputText = inputField.value
    userTask = {
        date,
        task: inputText,
        completedColor: "",
        completedStyle: "",
        completedDate: ""
    }
    if(!inputText || inputText[0] === " "){
        return alert("Not valid")
    }

    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
    oldTasks.push(userTask)
    localStorage.setItem("task", JSON.stringify(oldTasks))
    location.reload()
}

//writing a function to create dviv for each task i the local storage and showing it to the user
function showTasks(){
    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
    for(let task of oldTasks){
        let taskDiv = document.createElement("div")
        taskDiv.innerHTML = `
        <div class = "task" style="background-color:${task.completedColor}">
            <p class="task__date">Created on:${task.date}</p>
            <p class="task__task" style="text-decoration:${task.completedStyle}">${task.task}</p>
            <button class="task__complete">Mark Complete</button>
            
            <i class="fas fa-times task__exit"></i>
        </div>
        `

        taskList.appendChild(taskDiv)
    }

}
showTasks()

//function delete task from the list

function deleteTask(index){
    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
    let unMatched = oldTasks.filter((task, i)=>{
        return index !== i
    })

    if(oldTasks.length === 1){
        localStorage.removeItem("task");
        location.reload()
    }

    if(unMatched.length){
        localStorage.setItem("task", JSON.stringify(unMatched))
        location.reload()
    }
}

//adding event listener to add task button
addBtn.addEventListener("click", saveUserTasks)

//adding eveent listener to delete button 
const deleteBtns = document.querySelectorAll(".main__task__lists .task__exit")

deleteBtns.forEach((deleteBtn, index)=>{
    deleteBtn.addEventListener("click", ()=>{
        deleteTask(index)
    })
})

//writing a function to mark a task as complete
const tasks = document.querySelectorAll(".task__task")
function markComplete(index){
    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
    let matched = oldTasks.find((data, i)=>{
        return index === i
    })

    if(matched.completedDate !== ""){
        return
    }

    let newArray = oldTasks.filter((data, i)=>{
        return index !== i
    })
    if(matched){
        userTask = {
            date: matched.date,
            task: matched.task,
            completedColor: "lightgreen",
            completedStyle: "line-through",
            completedDate: date
        }
        if(confirm("This action cannot be reverted. Continue?")){
            newArray.push(userTask)
            localStorage.setItem("task", JSON.stringify(newArray))
        }
        else{
            return
        }
        location.reload()
    }
}

//adding event listener to mark complete button
const markCompleteBtns = document.querySelectorAll(".task__complete")

markCompleteBtns.forEach((markCompleteBtn, index)=>{
    markCompleteBtn.addEventListener("click", ()=>{
        markComplete(index)
    })
})

let completeMessage = document.querySelector(".main__task__lists__complete__message")
markCompleteBtns.forEach((button, index)=>{
    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
        if(oldTasks[index].completedDate !== ""){
            button.innerText = `Completed on ${oldTasks[index].completedDate}. Please Delete.`;
            button.style.backgroundColor = "green"
            
        }
})

const taskCompleted = document.querySelector(".task__counter__completed")
const taskUncompleted = document.querySelector(".task__counter__uncompleted")

function countTasks(){
    let completeCount = 0
    let uncompleteCount = 0
    let oldTasks = JSON.parse(localStorage.getItem("task")) || []
    for(let task of oldTasks){
        if(task.completedDate !== ""){
            completeCount += 1
        }
        taskCompleted.innerText = `Completed Tasks: ${completeCount}`
    }
    for(let task of oldTasks){
        if(task.completedDate === ""){
           uncompleteCount += 1
        }
        taskUncompleted.innerText = `Uncompleted Tasks: ${uncompleteCount}`
    }
}

window.addEventListener("load", countTasks)




