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
const closeTodoListFormBtn = addTodoListForm.querySelector('.close-btn');
const openAddTodoFormBtn = todosContainer.querySelector('.add-todo-btn');
const addTodoForm = todosContainer.querySelector('#add-todo-form');
const closeTodoFormBtn = addTodoForm.querySelector('.close-btn');
const deleteTodoBtns = todosContainer.querySelectorAll(
  '.todo-btns .delete-btn'
);
const tickTodoBtns = todosContainer.querySelectorAll('.todo-btns .tick-btn');
const addTodoListSubmitBtn = addTodoListForm.querySelector(
  '.add-list-submit-btn'
);

function render(event, eventType, { state, activeTodos, store }) {
  switch (state) {
    case 'showingTodoLists': {
      switch (eventType) {
        case 'linkClicked': {
          const id = parseInt(event.target.id.split('-')[1]);

          if (id !== 0 && !id) return 'showingTodoLists';

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
        case 'addTodoBtnClicked': {
          if (!addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.add('activeForm');
          }

          return 'showingAddTodoForm';
        }
        case 'deleteTodoBtnClicked': {
          const ul = event.path[4];
          const li = event.path[3];
          const id = parseInt(li.id.split('-')[1]);

          todoApp.store[id].todos = store[id].todos.filter(
            (_, index) => index != id
          );

          ul.removeChild(li);

          console.log(todoApp.store[id].todos);
          return 'showingTodos';
        }
        case 'tickTodoBtnClicked': {
          const li = event.path[3];
          const p = li.querySelector('p');
          const id = parseInt(li.id.split('-')[1]);

          todoApp.store[id].todos.completed = !store[id].todos.completed;
          p.classList.toggle('completed');

          return 'showingTodos';
        }
      }
    }
    case 'showingAddListForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          if (addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.remove('activeForm');
          }

          return 'showingTodoLists';
        }
        case 'submitBtnClicked': {
          const listNameField =
            addTodoListForm.querySelector('#list-name-field');
          const listName = listNameField.value;

          if (!listName) {
            return 'showingTodoLists';
          }

          const newTodoList = {
            id: store.length,
            listName: listName,
            todos: [
              {
                content: 'make new todo',
                completed: false
              }
            ]
          };

          createTodoLists([newTodoList]);
          createTodos(newTodoList);
          store.push(newTodoList);

          addTodoListForm.classList.remove('activeForm');

          return 'showingTodoLists';
        }
      }
    }
    case 'showingAddTodoForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          if (addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.remove('activeForm');
          }

          return 'showingTodos';
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
closeTodoListFormBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'closeBtnClicked', todoApp);
});
openAddTodoFormBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'addTodoBtnClicked', todoApp);
});
closeTodoFormBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'closeBtnClicked', todoApp);
});

deleteTodoBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    todoApp.state = render(event, 'deleteTodoBtnClicked', todoApp);
  });
});
tickTodoBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    todoApp.state = render(event, 'tickTodoBtnClicked', todoApp);
  });
});
addTodoListSubmitBtn.addEventListener('click', (event) => {
  todoApp.state = render(event, 'submitBtnClicked', todoApp);
  console.log(todoApp.store);
});
