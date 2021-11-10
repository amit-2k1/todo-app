import { isActiveContainer } from './utils';
import { createTodoLists, createTodos } from './init';
import todoApp from './store';

export function update(event, eventType, { state, activeTodos, store }) {
  const todoListsContainer = document.querySelector('#todo-lists-container');
  const todosContainer = document.querySelector('#todos-container');
  const todosEles = document.querySelectorAll('.todos ul');
  const addTodoListForm = todoListsContainer.querySelector(
    '#add-todo-list-form'
  );
  const addTodoForm = todosContainer.querySelector('#add-todo-form');

  switch (state) {
    case 'showingTodoLists': {
      switch (eventType) {
        case 'linkClicked': {
          const id = parseInt(event.target.id.split('-')[1]);

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
            todos: []
          };

          createTodoLists([newTodoList]);
          createTodos(newTodoList);
          store.push(newTodoList);

          const a = todoListsContainer.querySelector(
            `#todo-list li a#todos-${newTodoList.id}`
          );

          a.addEventListener('click', (event) => {
            todoApp.state = update(event, 'linkClicked', todoApp);
          });

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
        case 'submitBtnClicked': {
          const todoField = addTodoForm.querySelector('#todo-field');
          const todo = todoField.value;
          console.log(activeTodos);
          if (!todo) {
            return 'showingTodoLists';
          }

          const newTodo = {
            content: todo,
            completed: false
          };

          todoApp.store[activeTodos].todos.push(newTodo);
          createTodos(todoApp.store[activeTodos]);

          addTodoForm.classList.remove('activeForm');

          return 'showingTodos';
        }
      }
    }
  }
}
