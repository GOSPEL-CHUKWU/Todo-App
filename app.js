'use strict';

window.addEventListener('load', () => {
  //Stored variable
  const errorMsg = document.querySelector('.error-msg');
  const inputField = document.querySelector('.text');
  const todoList = document.querySelector('.container');
  const submitBtn = document.querySelector('.sub-btn');
  const openModal = document.querySelector('.info-btn');
  const closeModal = document.querySelector('.close-modal');
  const clearAll = document.querySelector('.clear-btn');

  //event listeners
  document.addEventListener('DOMContentLoaded', getTodos());
  submitBtn.addEventListener('click', addTodo);
  openModal.addEventListener('click', open);
  todoList.addEventListener('click', deleteCheck);
  closeModal.addEventListener('click', close);
  clearAll.addEventListener('click', clear);

  //functions

  //submit add event listener function
  function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();

    //value in it
    let incomingTodo = inputField.value;

    if (!incomingTodo) {
      //add error-message
      errorMsg.classList.remove('hidden');
    } else if (incomingTodo) {
      //remove error-message
      errorMsg.classList.add('hidden');

      //add to local storage
      saveLocalTodos(inputField.value);

      //clear todo input value
      inputField.value = '';

      //todo ul
      const todoUl = document.createElement('ul');

      //todo div
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('list');
      //append div to ul
      todoUl.appendChild(todoDiv);

      //create li
      const newTodo = document.createElement('li');
      newTodo.innerText = incomingTodo;
      newTodo.classList.add('todo-item');
      //append li to div
      todoDiv.appendChild(newTodo);

      //completed button
      const completedBtn = document.createElement('button');
      completedBtn.innerHTML = '<i class="fa-solid fa-check-double"></i>';
      completedBtn.classList.add('done-btn');
      //append done button to div
      todoDiv.appendChild(completedBtn);

      //remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      removeBtn.classList.add('remove-btn');
      //append remove button to div
      todoDiv.appendChild(removeBtn);

      //Append ul to the source (div) in container (todo list)
      todoList.appendChild(todoUl);
    }
  }

  //function for open and close of the info button
  function open(e) {
    errorMsg.classList.add('hidden');
    e.preventDefault();
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
  }
  function close(e) {
    e.preventDefault();
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  }

  //clear all the added to dos
  function clear() {
    const todo = document.querySelector('ul');
    errorMsg.classList.add('hidden');
    clearLocalStorageTodos(todo);
  }

  //delete a particular todo from list
  function deleteCheck(e) {
    const item = e.target;

    //Delete Todo
    if (item.classList[0] === 'remove-btn') {
      const todo = item.parentElement;
      //animation
      todo.classList.add('fall');
      removeLocalStorageTodos(todo);
      todo.addEventListener('transitionend', function () {
        todo.remove();
      });
    }

    //check mark
    if (item.classList[0] === 'done-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
    }
  }

  //store to local storage
  function saveLocalTodos(todo) {
    //CHECK: Hey Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //get back from local storage
  function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
      //todo ul
      const todoUl = document.createElement('ul');

      //todo div
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('list');
      //append div to ul
      todoUl.appendChild(todoDiv);

      //create li
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      //append li to div
      todoDiv.appendChild(newTodo);

      //completed button
      const completedBtn = document.createElement('button');
      completedBtn.innerHTML = '<i class="fa-solid fa-check-double"></i>';
      completedBtn.classList.add('done-btn');
      //append done button to div
      todoDiv.appendChild(completedBtn);

      //remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      removeBtn.classList.add('remove-btn');
      //append remove button to div
      todoDiv.appendChild(removeBtn);

      //Append ul to the source (div) in container (todo list)
      todoList.appendChild(todoUl);
    });
  }

  //delete only one item from the local storage
  function removeLocalStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    // const todoIndex
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //clear all item in the local storage
  function clearLocalStorageTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    // const todoIndex
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 100);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
