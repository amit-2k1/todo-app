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

export function renderTodos(todoStore, id) {
  const todosTemplate = document.querySelector('template#todos-template');
  const todoContainer = document.querySelector('ul.todos');
  const liTemplate = todosTemplate.content.querySelector('li');

  todoStore[id - 1].todos.forEach((todo, index) => {
    const li = document.importNode(liTemplate, true);
    const p = li.querySelector('p');

    li.setAttribute('id', 'todo-' + index);
    p.setAttribute('class', todo.completed ? 'completed' : '');
    p.textContent = todo.content;

    todoContainer.appendChild(li);
  });
}
