import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateTodo.css";
const CreateTodo = (props) => {
  const createNewTodo = (_id, task, note, isCompleted, frequency) => {
    return { _id, task, note, isCompleted, frequency };
  };
  const [createTodo, setCreateTodo] = useState(true);
  const todoFormRef = useRef();
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
      try {
        props.create(
          formik.values.task,
          formik.values.completed,
          formik.values.note
        );
        alert("New Todo successfully created!!!");
      } catch (e) {
        console.log(e);
      }
    },
  });

  const toggleForm = () => {
    setCreateTodo(!createTodo);
    if (createTodo) {
      todoFormRef.current.className = "create-todo-form";
    } else {
      todoFormRef.current.className = "not-creating";
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => {
          toggleForm();
        }}
      >
        Create a todo!
      </button>
      <div ref={todoFormRef} className="not-creating">
        <form onSubmit={formik.handleSubmit}>
          <label className="input-label" htmlFor="task">
            Task:
          </label>
          <input
            type="text"
            id="task"
            name="task"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></input>
          {formik.touched.task && formik.errors.task ? (
            <div className="error-message">{formik.errors.task}</div>
          ) : null}
          <label className="input-label" htmlFor="completed">
            Completed:
          </label>
          <input
            type="text"
            id="completed"
            name="completed"
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
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                props.create(
                  formik.values.task,
                  formik.values.completed,
                  formik.values.note
                );
                toggleForm();
              }}
              className="create-button"
            >
              Create
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
