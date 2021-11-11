import { isActiveContainer } from './utils';
import { createTodoLists, createTodos } from './init';

export function update(event, eventType, { state, activeTodos, todosLists }) {
  const todoListsContainer = document.querySelector('#todo-lists-container');
  const todosContainer = document.querySelector('#todos-container');
  const todosEles = document.querySelectorAll('.todos ul');
  const addTodoListForm = todoListsContainer.querySelector(
    '#add-todo-list-form'
  );
  const addTodoForm = todosContainer.querySelector('#add-todo-form');

  let newState = state;
  let newActiveTodos = activeTodos;
  let newTodosLists = todosLists;

  switch (newState) {
    case 'showingTodoLists': {
      switch (eventType) {
        case 'linkClicked': {
          const id = parseInt(event.target.id.split('-')[1]);

          if (id === NaN) {
            return {
              state: 'showingTodoLists',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            };
          }

          if (isActiveContainer(todoListsContainer)) {
            todoListsContainer.classList.remove('activeContainer');
          }

          if (!isActiveContainer(todosContainer)) {
            todosContainer.classList.add('activeContainer');
            todosEles[id].classList.add('activeTodos');
            newActiveTodos = id;
          }

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'addListBtnClicked': {
          if (!addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.add('activeForm');
          }

          return {
            state: 'showingAddListForm',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
      }
    }
    case 'showingTodos': {
      switch (eventType) {
        case 'backBtnClicked': {
          if (!isActiveContainer(todosContainer) && !newActiveTodos) {
            return {
              state: 'showingTodos',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            };
          } else {
            todosContainer.classList.remove('activeContainer');
            todosEles[newActiveTodos].classList.remove('activeTodos');
            newActiveTodos = -1;
          }

          if (!isActiveContainer(todoListsContainer)) {
            todoListsContainer.classList.add('activeContainer');
          }

          return {
            state: 'showingTodoLists',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'addTodoBtnClicked': {
          if (!addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.add('activeForm');
          }

          return {
            state: 'showingAddTodoForm',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'deleteTodoBtnClicked': {
          const ul = event.path[4];
          const li = event.path[3];
          const id = parseInt(li.id.split('-')[1]);

          newTodosLists[id].todos = newTodosLists[id].todos.filter(
            (_, index) => index != id
          );

          ul.removeChild(li);

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'tickTodoBtnClicked': {
          const li = event.path[3];
          const p = li.querySelector('p');
          const id = parseInt(li.id.split('-')[1]);

          newTodosLists[id].todos.completed =
            !newTodosLists[id].todos.completed;
          p.classList.toggle('completed');

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
      }
    }
    case 'showingAddListForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          // closing the form
          if (addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.remove('activeForm');
          }

          return {
            state: 'showingTodoLists',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'submitBtnClicked': {
          const listNameField =
            addTodoListForm.querySelector('#list-name-field');
          const listName = listNameField.value;

          if (!listName) {
            return 'showingTodoLists';
          }

          const newTodosList = {
            id: newTodosLists.length,
            listName: listName,
            todos: []
          };

          createTodoLists([newTodosList]);
          createTodos(newTodosList);
          newTodosLists.push(newTodosList);

          // closing the form after the new todo list added
          addTodoListForm.classList.remove('activeForm');

          return {
            state: 'showingTodoLists',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
      }
    }
    case 'showingAddTodoForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          // closing the form
          if (addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.remove('activeForm');
          }

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'submitBtnClicked': {
          const todoField = addTodoForm.querySelector('#todo-field');
          const todo = todoField.value;

          if (!todo) {
            return 'showingTodoLists';
          }

          const newTodo = {
            content: todo,
            completed: false
          };

          newTodosLists[activeTodos].todos.push(newTodo);
          createTodos(newTodosLists[activeTodos]);

          // closing the form after the new todo added
          addTodoForm.classList.remove('activeForm');

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
      }
    }
  }
}
