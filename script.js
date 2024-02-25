const tasks = []
const taskInput = document.getElementById('taskInput')
const todoForm = document.getElementById('todoForm')
const taskList = document.getElementById('taskList')


class Task {
    constructor(task, id) {
        this.task = task
        this.id = id
    }
    render() {
        const listItem = document.createElement('li')
        listItem.className = 'flex justify-between items-center py-2 px-4'
        listItem.innerHTML = `
                <span class="mr-auto">${this.task}</span>
                <button id="${this.id}" class="text-red-500">❌</button>`

        return listItem

    }

}

todoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const taskValue = taskInput.value.trim()

    if (taskValue == '') {
        alert('Il campo task non può essere vuoto')
        return
    }

    const newTask = new Task(taskValue, generateId())

    if (taskExists(taskValue)) {
        alert('Task gia inserita, modifica il contenuto')
    } else {
        tasks.push(newTask)
        renderTasks()
        taskInput.value = ""
    }


})

taskList.addEventListener('click', function (event) {
    const target = event.target
    if (target.classList.contains("text-red-500")) {
        const taskId = target.dataset.id
        deleteTask(taskId)

    }
})

function generateId() {
    const dateString = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2)
    return dateString + random
}

function renderTasks() {
    taskList.innerHTML = ""
    tasks.forEach(task => {
        const listItem = task.render()
        taskList.appendChild(listItem)

    });
}

function deleteTask(taskId) {
    const taskIndex = tasks.find((task) => task.id === taskId)
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1)
        renderTasks()
    }
}

function taskExists(taskText) {
    return tasks.some(task => task.task.toLowerCase() === taskText.toLowerCase());
}
