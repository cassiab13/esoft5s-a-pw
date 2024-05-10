function enviar(e) {
    e.preventDefault()
    
    const formulario = document.getElementById("form");
    const formData = new FormData(formulario);
    const tarefa = formData.get('tarefa');
    const descricao = formData.get('description');
    
    let tarefas = {
        tarefa,
        descricao
    }
    console.log(tarefas)
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(tarefas);

    localStorage.setItem("tasks", JSON.stringify(tasks));
      
    let addedTasks = JSON.stringify(localStorage.getItem("tasks"));

    limparInputs();
}

function limparInputs(){
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.delete();
}

