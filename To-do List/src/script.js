window.onload = function () {
  //Variáves globais

  let lista = document.getElementById('lista-tarefas');
  let liTask = document.getElementsByTagName('li');

  //Adicionando Tarefas

  function createTask() {

    let li = document.createElement('li');
    let input = document.getElementById('texto-tarefa');
    let iValue = input.value;
    let text = document.createTextNode(iValue);

    li.appendChild(text);
    li.className = 'element';
    if (iValue === '') {
      alert("Prencha no quadro a tarefa!");
    } else {
      lista.appendChild(li);
    }
    document.getElementById("texto-tarefa").value = "";
  }

  let button = document.getElementById('criar-tarefa');
  button.addEventListener('click', createTask);

  //Adicionando background color para a tarefa selecionada

  let item = document.querySelectorAll('.element');

  function addGray(e) {
    let tasks = lista.children;
    for (let i = 0; i < tasks.length; i += 1) {
      let list = tasks[i];
      list.style.backgroundColor = '';
    }
    e.target.style.backgroundColor = 'gray';

  }
  lista.addEventListener('click', addGray);

  //Completando uma tarefa

  function taskCompleted(e) {
    let task = e.target;
    if (task.className.includes('completed')) {
      task.classList.remove('completed');
    } else {
      task.classList.add('completed');
    }
  }

  lista.addEventListener('dblclick', taskCompleted);

  //Limpando a lista

  function clear() {
    let e = document.querySelector("ol");
    let child = e.lastElementChild;
    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }
  let btnClear = document.getElementById(
    "apaga-tudo").onclick = function () {
      clear();
    }

  //Limpando as tarefas completadas

  function clearCompletedTask() {
    let e = document.querySelectorAll(".completed");
    for (const ele of e) {
      ele.remove();
    }
  }
  let btnClearCompletedTask = document.getElementById(
    "remover-finalizados").onclick = function () {
      clearCompletedTask();
    }

  //Salvando e carregando lista de tarefas
  function saveTask() {
    let list = lista.innerHTML;
    localStorage.setItem("taskList", JSON.stringify(list));
  }
  let btnSave = document.getElementById(
    "salvar-tarefas").onclick = function () {
      saveTask();
    }

  function loadTask() {
    let savedTasks = JSON.parse(localStorage.getItem("taskList"));
    lista.innerHTML = savedTasks;
  }
  loadTask();

  // Removendo task selecionada

  function taskSelected(e) {    
    for (let i = 0; i < liTask.length; i += 1) {
      liTask[i] = liTask[i].classList.remove('selected');
    }
    e.target.classList.add('selected');    
  }

  lista.addEventListener('click', taskSelected);
  function removeSelected() {
    let e = document.querySelectorAll(".selected");
    for (const ele of e) {
      ele.remove();
    }
  }
  let btnClearSelectedTask = document.getElementById(
    "remover-selecionado").onclick = function () {
      removeSelected();
    }

  //Movendo itens da lista

  const up = document.getElementById('mover-cima');
  const down = document.getElementById('mover-baixo');

  function moveUp() {
    const taskUp = document.querySelector('.selected');
    if (!taskUp || liTask[0].classList.contains('selected')) {
      return;
    }
    const upperPosition = taskUp.previousElementSibling;
    lista.insertBefore(taskUp, upperPosition);
  }

  function moveDown() {
    const taskDown = document.querySelector('.selected');
    if (!taskDown || liTask[liTask.length - 1].classList.contains('selected')) {
      return;
    }
    const inferiorPosition = taskDown.nextElementSibling;
    lista.insertBefore(taskDown, inferiorPosition.nextElementSibling);
  }
  up.addEventListener('click', moveUp);
  down.addEventListener('click', moveDown);
}