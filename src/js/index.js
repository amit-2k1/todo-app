require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import { createTodoLists, createTodos } from './init';
import { isActiveContainer } from './utils';

const todoApp = {
  state: 'showingTodoLists',
  activeTodos: -1,
  store: [
    {
      id: 0,
      listName: 'school',
      todos: [
        {
          content: 'todo 1.1',
          completed: true
        },
        {
          content: 'todo 1.2',
          completed: false
        }
      ]
    },
    {
      id: 1,
      listName: 'personal',
      todos: [
        {
          content: 'todo 2.1',
          completed: false
        },
        {
          content: 'todo 2.1',
          completed: true
        },
        {
          content: 'todo 2.1',
          completed: false
        },
        {
          content: 'todo 2.1',
          completed: false
        }
      ]
    },
    {
      id: 2,
      listName: 'home',
      todos: [
        {
          content: 'todo 3.1',
          completed: false
        },
        {
          content: 'todo 3.2',
          completed: true
        },
        {
          content: 'todo 3.3',
          completed: false
        },
        {
          content: 'todo 3.4',
          completed: true
        }
      ]
    }
  ]
};

// Loading all todo lists
createTodoLists(todoApp.store);
// Loading all todos in DOM
todoApp.store.forEach((todos) => {
  createTodos(todos);
});

const todoListsContainer = document.querySelector('#todo-lists-container');
const todosContainer = document.querySelector('#todos-container');
const todosEles = document.querySelectorAll('.todos ul');
const todoListLinks = document.querySelectorAll('#todo-list li a');
const backBtn = todosContainer.querySelector('button.back-btn');
const addTodoListBtn = todoListsContainer.querySelector('.add-todo-list-btn');
const addTodoListForm = todoListsContainer.querySelector('#add-todo-list-form');

function render(event, eventType, { state, activeTodos }) {
  switch (state) {
    case 'showingTodoLists': {
      switch (eventType) {
        case 'linkClicked': {
          const id = parseInt(event.target.id.split('-')[1]);
          console.log(id, event.target.id);
          if (id !== 0 && !id) return;

          if (isActiveContainer(todoListsContainer)) {
            todoListsContainer.classList.remove('activeContainer');
          }

          if (!isActiveContainer(todosContainer)) {
            todosContainer.classList.add('activeContainer');
            todosEles[id].classList.add('activeTodos');
            todoApp.activeTodos = id;
          }

          return 'showingTodos';
        }
        case 'addListBtnClicked': {
          if (!addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.add('activeForm');
          }

          return 'showingAddListForm';
        }
      }
    }
    case 'showingTodos': {
      switch (eventType) {
        case 'backBtnClicked': {
          if (isActiveContainer(todosContainer)) {
            todosContainer.classList.remove('activeContainer');
            todosEles[activeTodos].classList.remove('activeTodos');
            todoApp.activeTodos = -1;
          }

          if (!isActiveContainer(todoListsContainer)) {
            todoListsContainer.classList.add('activeContainer');
          }

          return 'showingTodoLists';
        }
      }
    }
  }
}

todoListLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    todoApp.state = render(event, 'linkClicked', todoApp);
  });
});

backBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'backBtnClicked', todoApp);
});

addTodoListBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'addListBtnClicked', todoApp);
});
