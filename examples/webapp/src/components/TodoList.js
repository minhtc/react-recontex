import React from "react";
import Todo from "./Todo";
import { Context, dispatch } from "../recontext/store";

function TodoList() {
  const { todos } = React.useContext(Context)

  return <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => dispatch("TOGGLE_ITEM", { todoId: todo.id })}
      />
    ))}
  </ul>
}

export default TodoList
