export function renderTodoLists(todoStore) {
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
    a.setAttribute('href', 'todos-' + todo.id);

    p.textContent = todo.listName;

    todoListContainer.appendChild(li);
  });
}
