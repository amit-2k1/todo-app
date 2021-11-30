import { createTodoLists, createTodos, renderUsername } from './init';

const store = {
  state: 'showingTodoLists',
  activeTodos: null,
  user: {},
  todosLists: [],
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

    //display username
      renderUsername(name);
});
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
};

export default store;
