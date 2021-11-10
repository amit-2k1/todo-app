require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import todoApp from './store';
import { createTodoLists, createTodos } from './init';
import { update } from './update';

// Loading all todo lists
createTodoLists(todoApp.store);
// Loading all todos in DOM
todoApp.store.forEach((todos) => {
  createTodos(todos);
});

const todoListsContainer = document.querySelector('#todo-lists-container');
const todosContainer = document.querySelector('#todos-container');
const todoListLinks = document.querySelectorAll('#todo-list li a');
const backBtn = todosContainer.querySelector('button.back-btn');
const addTodoListBtn = todoListsContainer.querySelector('.add-todo-list-btn');
const addTodoListForm = todoListsContainer.querySelector('#add-todo-list-form');
const closeTodoListFormBtn = addTodoListForm.querySelector('.close-btn');
const openAddTodoFormBtn = todosContainer.querySelector('.add-todo-btn');
const addTodoForm = todosContainer.querySelector('#add-todo-form');
const closeTodoFormBtn = addTodoForm.querySelector('.close-btn');
const addTodoListSubmitBtn = addTodoListForm.querySelector(
  '.add-list-submit-btn'
);
const addTodoSubmitBtn = addTodoForm.querySelector('.add-todo-submit-btn');

backBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'backBtnClicked', todoApp);
});

addTodoListBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'addListBtnClicked', todoApp);
});
closeTodoListFormBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'closeBtnClicked', todoApp);
});
openAddTodoFormBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'addTodoBtnClicked', todoApp);
});
closeTodoFormBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'closeBtnClicked', todoApp);
});

addTodoListSubmitBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'submitBtnClicked', todoApp);
});
addTodoSubmitBtn.addEventListener('click', (event) => {
  todoApp.state = update(event, 'submitBtnClicked', todoApp);
});
