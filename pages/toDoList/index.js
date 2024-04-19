function enviar(e) {
    e.preventDefault()
    
    const formulario = document.getElementById("form");
    console.log(formulario)
    const formData = new FormData(formulario);
    console.log(formData)
    const texto = formData.get('tarefa');
    console.log(texto)
    let addedTasks = []
    addedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(addedTasks){
    addedTasks.push(texto);
    localStorage.setItem("tasks", JSON.stringify(addedTasks));
}
}

function addTask() {

}

