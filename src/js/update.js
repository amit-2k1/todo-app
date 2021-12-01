import { createTodoLists, createTodos } from './init';
import uniqid from 'uniqid';
import store from './store';

export async function update(
  event,
  eventType,
  { state, activeTodos, todosLists }
) {
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
            store.setStore({
              state: 'showingTodoLists',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });

            return;
          }

          if (todoListsContainer.classList.contains('activeContainer')) {
            todoListsContainer.classList.remove('activeContainer');
          }

          if (!todosContainer.classList.contains('activeContainer')) {
            todosContainer.classList.add('activeContainer');
            todosEle.classList.add('activeTodos');
            newActiveTodos = id;
          }

          newState = 'showingTodos';

          break;
        }
        case 'addListBtnClicked': {
          if (!addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.add('activeForm');
          }

          newState = 'showingAddListForm';

          break;
        }
      }
      break;
    }
    case 'showingTodos': {
      switch (eventType) {
        case 'backBtnClicked': {
          if (
            !todosContainer.classList.contains('activeContainer') &&
            !newActiveTodos
          ) {
            store.setStore({
              state: 'showingTodos',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });

            return;
          }

          const curActiveContainer = todosContainer.querySelector(
            `#${newActiveTodos}`
          );

          todosContainer.classList.remove('activeContainer');
          curActiveContainer.classList.remove('activeTodos');
          newActiveTodos = null;

          if (!todoListsContainer.classList.contains('activeContainer')) {
            todoListsContainer.classList.add('activeContainer');
          }

          newState = 'showingTodoLists';

          break;
        }
        case 'addTodoBtnClicked': {
          if (!addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.add('activeForm');
          }

          newState = 'showingAddTodoForm';

          break;
        }
        case 'deleteTodoBtnClicked': {
          const path = event.path || event.composedPath();
          const ulIndex = path.findIndex(({ tagName }) => tagName === 'UL');
          const ul = path[ulIndex];
          const li = ul.querySelector('li');
          const todoId = li.id;

          const listIndex = newTodosLists.findIndex(
            ({ id }) => id === newActiveTodos
          );

          newTodosLists[listIndex].todos = newTodosLists[
            listIndex
          ].todos.filter(({ id }) => id != todoId);

          ul.removeChild(li);

          const { message } = await fetch('/deletetodo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              store: {
                todoId: todoId
              }
            })
          });

          newState = 'showingTodos';

          break;
        }
        case 'tickTodoBtnClicked': {
          const path = event.path || event.composedPath();
          const liIndex = path.findIndex(({ tagName }) => tagName === 'LI'); // get the li element Index
          const li = path[liIndex];
          const p = li.querySelector('p');
          const todoId = li.id;

          const listIndex = newTodosLists.findIndex(
            ({ id }) => id === newActiveTodos
          );
          const todoIndex = newTodosLists[listIndex].todos.findIndex(
            ({ id }) => id === todoId
          );

          const completed =
            !newTodosLists[listIndex].todos[todoIndex].completed;

          newTodosLists[listIndex].todos[todoIndex].completed = completed;
          p.classList.toggle('completed');

          const { message } = await fetch('/marktodo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              store: {
                todoId: todoId,
                completed: completed
              }
            })
          });

          newState = 'showingTodos';

          break;
        }
      }

      break;
    }
    case 'showingAddListForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          // closing the form
          if (addTodoListForm.classList.contains('activeForm')) {
            addTodoListForm.classList.remove('activeForm');
          }

          newState = 'showingTodoLists';

          break;
        }
        case 'submitBtnClicked': {
          const listNameField =
            addTodoListForm.querySelector('#list-name-field');
          const listName = listNameField.value;

          listNameField.value = '';

          if (!listName) {
            store.setStore({
              state: 'showingAddListForm',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });

            return;
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

          const { listId, message } = await fetch('/addtodolist', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
              store: {
                listId: newTodosList.id,
                listName: newTodosList.listName
              }
            })
          });

          newState = 'showingTodoLists';

          break;
        }
      }

      break;
    }
    case 'showingAddTodoForm': {
      switch (eventType) {
        case 'closeBtnClicked': {
          // closing the form
          if (addTodoForm.classList.contains('activeForm')) {
            addTodoForm.classList.remove('activeForm');
          }

          newState = 'showingTodos';

          break;
        }
        case 'submitBtnClicked': {
          const todoField = addTodoForm.querySelector('#todo-field');
          const todo = todoField.value;

          todoField.value = '';

          if (!todo) {
            store.setStore({
              state: 'showingAddTodoForm',
              activeTodos: newActiveTodos,
              todosLists: newTodosLists
            });

            return;
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

          const { todoId, message } = await fetch('/addtodo', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              store: {
                todoId: newTodo.id,
                content: newTodo.content,
                completed: newTodo.completed,
                listId: newTodosLists[id].id
              }
            })
          });

          newState = 'showingTodos';

          break;
        }
      }

      break;
    }
  }

  store.setStore({
    state: newState,
    activeTodos: newActiveTodos,
    todosLists: newTodosLists
  });
}

export async function signout() {
  localStorage.removeItem('token');

  window.location.href = '/signin';
}
