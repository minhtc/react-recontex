import React from "react";
import Todo from "./Todo";
import { connect, actions } from "../recontext/store";

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onClick={() => actions.toggleItem({ todoId: todo.id})}
      />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(TodoList);
