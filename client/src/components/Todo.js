import React, { useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Todo.css";

const Todo = (props) => {
  const formik = useFormik({
    initialValues: {
      task: "",
      completed: "",
      note: "",
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Please enter a task!"),
      completed: Yup.string()
        .test(
          "is boolean, please enter true or false",
          (value) => value === "true" || value === "false"
        )
        .required("Please enter whether or not its completed!"),
      note: Yup.string().required("Please enter a note!"),
    }),
    onSubmit: (values) => {
      props.update(
        props._id,
        formik.values.task,
        formik.values.completed,
        formik.values.note
      );

      handleEditing();
    },
  });
  const inputDiv = useRef();
  const [isEditing, setEditing] = useState(true);
  const handleEditing = () => {
    setEditing(!isEditing);
    if (isEditing) {
      inputDiv.current.className = "edit-input";
    } else {
      inputDiv.current.className = "not-editing";
    }
  };

  return (
    <div className="todo">
      <h2>
        Task:
        {props.task}
      </h2>
      <h3>
        Completed:
        {props.isCompleted}
      </h3>
      <h4>
        Note:
        {props.note}
      </h4>
      <div className="bottom-row">
        <div className="buttons">
          <button className="edit-button" onClick={handleEditing}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => {
              props.delete(props._id);
              alert("Successfully deleted the post!");
            }}
          >
            Delete
          </button>
        </div>
        <div ref={inputDiv} className="not-editing">
          <form onSubmit={formik.handleSubmit}>
            <div className="todo-edit">
              <label className="input-label" htmlFor="task">
                Task:
              </label>
              <input
                id="task"
                name="task"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.task && formik.errors.task ? (
                <div className="error-message">{formik.errors.task}</div>
              ) : null}
              <label className="input-label" htmlFor="completed">
                Completed:
              </label>
              <input
                id="completed"
                name="completed"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.completed && formik.errors.completed ? (
                <div className="error-message">{formik.errors.completed}</div>
              ) : null}
              <label className="input-label" htmlFor="note">
                Note:
              </label>
              <input
                type="text"
                id="note"
                name="note"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.note && formik.errors.note ? (
                <div className="error-message">{formik.errors.note}</div>
              ) : null}
              <div className="edit-buttons">
                <button type="submit" onClick={formik.onSubmit}>
                  Accept
                </button>
                <button type="button" onClick={handleEditing}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Todo;
