const taskKey = '@tasks'

let selectedTaskId = null

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <div class="button-container">
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
    <button title="Excluir tarefa" onClick="removeTask(${taskId})">❌</button>
    </div>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]

  const dialog = document.querySelector('dialog')

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')

  editTitle.value = task.title
  editDescription.value = task.description

  dialog.showModal()
}

function editarTask(event) {
  event.preventDefault();
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')
  const updatedTask = {
    id: tasks[selectedTaskId].id,
    title: editTitle.value,
    description: editDescription.value
  }

  tasks[selectedTaskId] = updatedTask
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  const taskItem = document.getElementById(`id-${updatedTask.id}`)
  taskItem.querySelector('h2').innerText = updatedTask.title
  taskItem.querySelector('p').innerText = updatedTask.description
  closeDialog()
}

function closeDialog() {
  const dialog = document.querySelector('dialog')
  dialog.close()
}

function removeTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  tasks.splice(selectedTaskId, 1);
  localStorage.setItem(taskKey, JSON.stringify(tasks));
  const ul = document.getElementById('taskList');
  const selectedTask = document.getElementById(`id-${taskId}`);
  ul.removeChild(selectedTask);
}
// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <div class="button-container">
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
        <button title="Excluir tarefa" onClick="removeTask(${task.id})">❌</button>
        </div>
        </li>
    `
    )
    .join('')
})