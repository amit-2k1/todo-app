require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import { createTodoLists, createTodos } from './init';
import { isActiveContainer } from './utils';

const todoApp = {
  state: 'showTodoLists',
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

function render(event, { state, store }) {
  switch (state) {
    case 'showTodoLists': {
      const id = parseInt(event.target.id.split('-')[1]);
      console.log(id);
      if (id === NaN) return;

      if (isActiveContainer(todoListsContainer)) {
        todoListsContainer.classList.remove('activeContainer');
      }

      if (!isActiveContainer(todosContainer)) {
        todosContainer.classList.add('activeContainer');
        todosEles[id].classList.add('activeTodos');
      }
    }
  }
}

todoListLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    render(event, todoApp);
  });
});
