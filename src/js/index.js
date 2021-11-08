require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import { renderTodoLists, renderTodos } from './render';

/*
    TODO :  --------->
    1. render todo list - done
    2. render todos
    3. add todos list
    4. add todos
    5. mark todo as completed
    6. delete a todo
*/

const todoApp = {
  state: 'showTodos',
  store: [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
      listName: 'home',
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
          completed: true
        }
      ]
    }
  ]
};

if (todoApp.state === 'showTodoLists') {
  renderTodoLists(todoApp.store);
} else if (todoApp.state === 'showTodos') {
  renderTodos(todoApp.store, 3);
}
