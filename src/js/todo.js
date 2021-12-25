import { update } from './update';
import uniqid from 'uniqid';

// create or add todo to DOM
export function createTodos({ todos, id }) {
  const todosTemplate = document.querySelector('template#todos-template');
  const todosContainer = document.querySelector('div.todos');

  let ul = document.createElement('ul');
  const oldUl = todosContainer.querySelector(`#${id}`);

  if (oldUl) {
    const lis = oldUl.querySelectorAll('.todo');
    lis.forEach((li) => oldUl.removeChild(li));
    ul = oldUl;
  } else {
    ul.setAttribute('id', id);
    todosContainer.appendChild(ul);
  }

  const liTemplate = todosTemplate.content.querySelector('li');

  todos.forEach(({ id, content, completed }) => {
    const li = document.importNode(liTemplate, true);
    const p = li.querySelector('p');

    const deleteTodoBtn = li.querySelector('.todo-btns .delete-btn');
    const tickTodoBtn = li.querySelector('.todo-btns .tick-btn');

    // trigger event when delete btn clicked
    deleteTodoBtn.addEventListener('click', (event) => {
      update(event, 'deleteTodoBtnClicked');
    });
    // trigger event when tick btn clicked
    tickTodoBtn.addEventListener('click', (event) => {
      update(event, 'tickTodoBtnClicked');
    });

    let todoId;

    if (!id) todoId = uniqid();
    else todoId = id;

    li.setAttribute('id', todoId);
    p.setAttribute('class', completed ? 'completed' : '');
    p.textContent = content;

    ul.appendChild(li);
  });

  if (oldUl) {
    ul.setAttribute('class', 'activeTodos');
  } else {
    todosContainer.appendChild(ul);
  }
}
