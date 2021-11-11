const store = {
  state: 'showingTodoLists',
  activeTodos: -1,
  user: {
    name: null
  },
  todosLists: [
    {
      id: 0,
      listName: 'school',
      todos: [
        {
          content: 'todo 1.1',
          completed: true
        },
        {
          content: 'todo 1.2',
          completed: false
        }
      ]
    },
    {
      id: 1,
      listName: 'personal',
      todos: [
        {
          content: 'todo 2.1',
          completed: false
        },
        {
          content: 'todo 2.1',
          completed: true
        },
        {
          content: 'todo 2.1',
          completed: false
        },
        {
          content: 'todo 2.1',
          completed: false
        }
      ]
    },
    {
      id: 2,
      listName: 'home',
      todos: [
        {
          content: 'todo 3.1',
          completed: false
        },
        {
          content: 'todo 3.2',
          completed: true
        },
        {
          content: 'todo 3.3',
          completed: false
        },
        {
          content: 'todo 3.4',
          completed: true
        }
      ]
    }
  ],
  setStore: function (newStore) {
    this.state = newStore.state;
    this.activeTodos = newStore.activeTodos;
    this.todosLists = newStore.todosLists;
  },
  setName: function (newName) {
    this.user.name = newName;
  }
};

export default store;
