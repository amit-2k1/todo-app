import { createTodoLists, createTodos } from './init';

const store = {
  state: 'showingTodoLists',
  activeTodos: null,
  user: {},
  todosLists: [
    {
      id: 'todos1',
      listName: 'click me to see all todos inside me',
      todos: [
        {
          id: 'todo1',
          content: 'go back to todo list by clicking <- button',
          completed: false
        },
        {
          id: 'todo2',
          content: 'make new todo list and todo by clicking + button',
          completed: false
        },
        {
          id: 'todo3',
          content: 'mark todo as completed by clicking tick button',
          completed: false
        },
        {
          id: 'todo4',
          content: 'delete todo by clicking red cross button',
          completed: false
        }
      ]
    }
  ],
  createStore: async function () {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) window.location.href = '/signin'

    const res = await fetch('/data', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    
    const { name, todosLists } = await res.json()

    console.log(name, todosLists)
    
    this.setUser(name);
    this.setTodosLists(todosLists);

    // Loading all todo lists
    createTodoLists(store.todosLists);
    // Loading all todos in DOM
    store.todosLists.forEach((todos) => {
      createTodos(todos);
});
  },
  createLocalStorage: function () {
    localStorage.setItem('haveLocalStorage', true);
    localStorage.setItem('state', 'showingTodoLists');
    localStorage.setItem('user', JSON.stringify({ name: '' }));
    localStorage.setItem('activeTodos', -1);
    localStorage.setItem('todosLists', JSON.stringify(this.todosLists));
  },
  setTodosLists: function (todosLists) {
    if (!todosLists) return;

    this.todosLists = todosLists;
  },
  setUser: function (newName) {
    if (!newName) return null;

    this.user.name = newName;
  },
  setStore: function ({state, activeTodos, todosLists}) {
    this.state = state;
    this.activeTodos = activeTodos;
    this.todosLists = todosLists;
  },
  logLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const state = localStorage.getItem('state');
    const activeTodos = localStorage.getItem('activeTodos');
    const todosLists = JSON.parse(localStorage.getItem('todosLists'));

    console.log(user, state, activeTodos, todosLists);
  }
};

export default store;
