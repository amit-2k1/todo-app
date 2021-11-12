const store = {
  state: 'showingTodoLists',
  activeTodos: -1,
  user: {
    name: null
  },
  todosLists: [
    {
      id: 0,
      listName: 'click me to see all todos inside me',
      todos: [
        {
          content: 'go back to todo list by clicking <- button',
          completed: false
        },
        {
          content: 'make new todo list and todo by clicking + button',
          completed: false
        },
        {
          content: 'mark todo as completed by clicking tick button',
          completed: false
        },
        {
          content: 'delete todo by clicking red cross button',
          completed: false
        }
      ]
    }
  ],
  createStore: function () {
    const haveLocalStorage = localStorage.getItem('haveLocalStorage');

    if (!haveLocalStorage) {
      this.createLocalStorage();
      return;
    }

    localStorage.setItem('state', 'showingTodoLists');

    const user = JSON.parse(localStorage.getItem('user'));
    const state = localStorage.getItem('state');
    const activeTodos = localStorage.getItem('activeTodos');
    const todosLists = JSON.parse(localStorage.getItem('todosLists'));

    this.user = user;
    this.state = state;
    this.activeTodos = activeTodos;
    this.todosLists = todosLists;
  },
  createLocalStorage: function () {
    localStorage.setItem('haveLocalStorage', true);
    localStorage.setItem('state', 'showingTodoLists');
    localStorage.setItem('user', JSON.stringify({ name: '' }));
    localStorage.setItem('activeTodos', -1);
    localStorage.setItem('todosLists', JSON.stringify(this.todosLists));
  },
  setStore: function (newStore) {
    if (!newStore) return;

    this.state = newStore.state;
    this.activeTodos = newStore.activeTodos;
    this.todosLists = newStore.todosLists;

    localStorage.setItem('state', this.state);
    localStorage.setItem('activeTodos', this.activeTodos);
    localStorage.setItem('todosLists', JSON.stringify(this.todosLists));
  },
  setUser: function (newName) {
    this.user.name = newName;

    JSON.parse(localStorage.getItem('user')).name = newName;
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
