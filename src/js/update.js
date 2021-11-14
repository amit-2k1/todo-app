import { isActiveContainer } from './utils';
import { createTodoLists, createTodos } from './init';
import uniqid from 'uniqid';

export function update(event, eventType, { state, activeTodos, todosLists }) {
  const todoListsContainer = document.querySelector('#todo-lists-container');
  const todosContainer = document.querySelector('#todos-container');
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
          const id = event.currentTarget.id;
          const todosListEle = todoListsContainer.querySelector(`#${id}`);
          const todosEle = todosContainer.querySelector(`#${id}`);

          if (!todosListEle) {
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
            todosEle.classList.add('activeTodos');
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
          }

          const curActiveContainer = todosContainer.querySelector(
            `#${newActiveTodos}`
          );

          todosContainer.classList.remove('activeContainer');
          curActiveContainer.classList.remove('activeTodos');
          newActiveTodos = null;

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
          const path = event.path || event.composedPath();
          const ul = path[4];
          const li = path[3];
          const todoId = li.id;

          const listIndex = newTodosLists.findIndex(
            ({ id }) => id === newActiveTodos
          );

          newTodosLists[listIndex].todos = newTodosLists[
            listIndex
          ].todos.filter(({ id }) => id != todoId);

          ul.removeChild(li);

          return {
            state: 'showingTodos',
            activeTodos: newActiveTodos,
            todosLists: newTodosLists
          };
        }
        case 'tickTodoBtnClicked': {
          const path = event.path || event.composedPath();
          const li = path[3];
          const p = li.querySelector('p');
          const todoId = li.id;

          const listIndex = newTodosLists.findIndex(
            ({ id }) => id === newActiveTodos
          );
          const todoIndex = newTodosLists[listIndex].todos.findIndex(
            ({ id }) => id === todoId
          );

          newTodosLists[listIndex].todos[todoIndex].completed =
            !newTodosLists[listIndex].todos[todoIndex].completed;
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
            return {
              state: 'showingTodoLists',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            };
          }

          const newTodosList = {
            id: uniqid(),
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
            return {
              state: 'showingTodoLists',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            };
          }

          const newTodo = {
            id: uniqid(),
            content: todo,
            completed: false
          };

          const id = newTodosLists.findIndex(({ id }) => id === newActiveTodos);

          newTodosLists[id].todos.push(newTodo);
          createTodos(newTodosLists[id]);

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
