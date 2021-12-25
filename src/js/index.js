require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import store from './store';
import { update } from './update';
import { signout } from './user';

store.createStore();

const todoListsContainer = document.querySelector('#todo-lists-container');
const todosContainer = document.querySelector('#todos-container');
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
const singoutBtn = document.querySelector('.sign-out-btn');

backBtn.addEventListener('click', (event) => {
  update(event, 'backBtnClicked');
});

addTodoListBtn.addEventListener('click', (event) => {
  update(event, 'addListBtnClicked');
});

closeTodoListFormBtn.addEventListener('click', (event) => {
  update(event, 'closeBtnClicked');
});

openAddTodoFormBtn.addEventListener('click', (event) => {
  update(event, 'addTodoBtnClicked', store);
});

closeTodoFormBtn.addEventListener('click', (event) => {
  update(event, 'closeBtnClicked', store);
});

addTodoListSubmitBtn.addEventListener('click', (event) => {
  update(event, 'submitBtnClicked', store);
});

addTodoSubmitBtn.addEventListener('click', (event) => {
  update(event, 'submitBtnClicked', store);
});

singoutBtn.addEventListener('click', signout);
