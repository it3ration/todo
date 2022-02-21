import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const Todos = (props) => {
  return (
    <div className="todo-collection">
      {props.data.map((todo) => (
        <Todo
          delete={props.delete}
          update={props.update}
          task={todo.task}
          note={todo.note}
          key={todo._id}
          frequency={todo.frequency}
          isCompleted={todo.isCompleted.toString()}
          _id={todo._id}
        />
      ))}
    </div>
  );
};

export default Todos;
