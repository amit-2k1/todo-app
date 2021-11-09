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
    a.setAttribute('href', 'todos-' + todo.id);

    p.textContent = todo.listName;

    todoListContainer.appendChild(li);
  });
}

export function createTodos({ todos, id }) {
  const todosTemplate = document.querySelector('template#todos-template');
  const todosContainer = document.querySelector('div.todos');

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'todos-' + id);
  todosContainer.appendChild(ul);

  const liTemplate = todosTemplate.content.querySelector('li');

  todos.forEach((todo, index) => {
    const li = document.importNode(liTemplate, true);
    const p = li.querySelector('p');

    li.setAttribute('id', 'todo-' + index);
    p.setAttribute('class', todo.completed ? 'completed' : '');
    p.textContent = todo.content;

    ul.appendChild(li);
  });

  todosContainer.appendChild(ul);
}
