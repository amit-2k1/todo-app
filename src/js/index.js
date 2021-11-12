require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import store from './store';
import { createTodoLists, createTodos } from './init';
import { update } from './update';

store.createStore();
// Loading all todo lists
createTodoLists(store.todosLists);
// Loading all todos in DOM
store.todosLists.forEach((todos) => {
  createTodos(todos);
});

const profileNameEle = document.querySelector('#profile-name');
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

if (!store.user.name) {
  let name;
  do {
    name = prompt('Enter your name : ');
  } while (!name);

  store.setName(name);
  profileNameEle.textContent = store.user.name;
}

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
