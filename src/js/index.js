require('../css/style.css');
require('../css/index.css');
require('../css/form.css');

import { renderTodoLists } from './render';

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
  state: 'showTodoLists',
  todoStore: [
    {
      id: '1',
      listName: 'school',
      todos: ['todo 1.1', 'todo 1.2']
    },
    {
      id: '2',
      listName: 'personal',
      todos: ['todo 2.1', 'todo 2.2', 'todo 2.3', 'todo 2.4']
    },
    {
      id: '3',
      listName: 'home',
      todos: ['todo 3.1', 'todo 3.2', 'todo 3.3', 'todo 3.4']
    }
  ]
};

if (todoApp.state === 'showTodoLists') {
  renderTodoLists(todoApp.todoStore);
} else if (todoApp.state === 'showTodos') {
  console.log('rendering todos');
}
