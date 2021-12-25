import { update } from './update';

// create or add todolist to DOM
export function createTodoLists(todoStore) {
  const todoListContainer = document.querySelector('ul#todo-list');
  const todoListTemplate = document.querySelector(
    'template#todo-list-template'
  );
  const liTemplate = todoListTemplate.content.querySelector('.item');

  todoStore.forEach(({ id, listName }) => {
    const li = document.importNode(liTemplate, true);
    const a = li.querySelector('a');
    const p = a.querySelector('a p');
    const deleteListBtn = li.querySelector('.del-list-btn');

    li.setAttribute('id', id);
    a.setAttribute('id', id);

    // trigger event when todo list clicked
    a.addEventListener('click', (event) => {
      update(event, 'linkClicked');
    });

    // trigger event when delete btn clicked
    deleteListBtn.addEventListener('click', (event) => {
      update(event, 'deleteListBtnClicked');
    });

    p.textContent = listName;

    todoListContainer.appendChild(li);
  });
}
