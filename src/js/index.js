require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import store from './store';
import { createUser } from './init';
import { update } from './update';

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
const addUserBtn = document.querySelector('.add-user-btn');

addUserBtn.addEventListener('click', (event) => {
  store.setUser(createUser(event, store));
});

backBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'backBtnClicked', store));
});

addTodoListBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'addListBtnClicked', store));
});

closeTodoListFormBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'closeBtnClicked', store));
});

openAddTodoFormBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'addTodoBtnClicked', store));
});

closeTodoFormBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'closeBtnClicked', store));
});

addTodoListSubmitBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'submitBtnClicked', store));
});

addTodoSubmitBtn.addEventListener('click', (event) => {
  store.setStore(update(event, 'submitBtnClicked', store));
});
