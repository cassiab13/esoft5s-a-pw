const taskKey = '@tasks';

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = taskId;
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      
  `;
  
  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));
  
  form.reset();
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p>
    <button class='task-button' title='Editar tarefa'>✏️</button></li>`)
    .join('');

  const editButtons = document.querySelectorAll('.task-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const taskId = event.target.parentElement.id;
      openModal();
      editTask(taskId);
    });
  });
});

function openModal() {
  const modal = document.getElementById('modal');
  modal.showModal();
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.closeModal();
}

function editTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  for (let i = 0; i < tasks.length; i++) {
    if (String(tasks[i].id) === String(taskId)) {
      const titulo = document.getElementById('titulo');
      const descricao = document.getElementById('descricao');
      titulo.value = tasks[i].title;
      descricao.value = tasks[i].description;
      break;
    }
  }
}

