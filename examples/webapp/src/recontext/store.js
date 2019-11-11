import createContext from "react-recontext";

const { dispatch, Context, Provider } = createContext({
  displayName: "AppContext",
  initState: {
    todos: [
      {
        id: 1,
        content: "Drink water",
        completed: true
      },
      {
        id: 2,
        content: "Run",
        completed: false
      },
      {
        id: 3,
        content: "Gym",
        completed: false
      },
      {
        id: 4,
        content: "Swim",
        completed: false
      }
    ]
  },
  actions: {
    "ADD_TODO": (state, { newTodoContent }) => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          content: newTodoContent,
          completed: false
        }
      ]
    }),
    "TOGGLE_ITEM": (state, { todoId }) => ({
      todos: state.todos.map(
        todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    })
  },
  isEnableLog: true
});

export { dispatch, Context, Provider }