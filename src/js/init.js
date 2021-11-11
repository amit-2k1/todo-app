import store from './store';
import { update } from './update';

export function createTodoLists(todoStore) {
  const todoListContainer = document.querySelector('ul#todo-list');
  const todoListTemplate = document.querySelector(
    'template#todo-list-template'
  );
  const liTemplate = todoListTemplate.content.querySelector('.item');

  todoStore.forEach((todo) => {
    const li = document.importNode(liTemplate, true);
    const a = li.querySelector('a');
    const p = a.querySelector('a p');

    li.setAttribute('id', 'list-' + todo.id);
    a.setAttribute('id', 'todos-' + todo.id);

    // trigger event when todo list clicked
    a.addEventListener('click', (event) => {
      store.setStore(update(event, 'linkClicked', store));
    });

    p.textContent = todo.listName;

    todoListContainer.appendChild(li);
  });
}

export function createTodos({ todos, id }) {
  const todosTemplate = document.querySelector('template#todos-template');
  const todosContainer = document.querySelector('div.todos');

  let ul = document.createElement('ul');
  const oldUl = todosContainer.querySelector(`#todos-${id}`);

  if (oldUl) {
    const lis = oldUl.querySelectorAll('.todo');
    lis.forEach((li) => oldUl.removeChild(li));
    ul = oldUl;
  } else {
    ul.setAttribute('id', 'todos-' + id);
    todosContainer.appendChild(ul);
  }

  const liTemplate = todosTemplate.content.querySelector('li');

  todos.forEach((todo, index) => {
    const li = document.importNode(liTemplate, true);
    const p = li.querySelector('p');

    const deleteTodoBtns = li.querySelector('.todo-btns .delete-btn');
    const tickTodoBtns = li.querySelector('.todo-btns .tick-btn');

    // trigger event when delete btn clicked
    deleteTodoBtns.addEventListener('click', (event) => {
      store.setStore(update(event, 'deleteTodoBtnClicked', store));
    });
    // triggeer event when tick btn clicked
    tickTodoBtns.addEventListener('click', (event) => {
      store.setStore(update(event, 'tickTodoBtnClicked', store));
    });

    li.setAttribute('id', 'todo-' + index);
    p.setAttribute('class', todo.completed ? 'completed' : '');
    p.textContent = todo.content;

    ul.appendChild(li);
  });

  if (oldUl) {
    ul.setAttribute('class', 'activeTodos');
  } else {
    todosContainer.appendChild(ul);
  }
}
