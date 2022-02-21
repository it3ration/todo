import Todos from "./Todos";
import { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import axios from "axios";
import "./App.css";

const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:6969/todo/");
      setTodos(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:6969/todo/" + id);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const makeTodo = async (task, completed, note) => {
    try {
      const res = await axios.post("http://localhost:6969/todo/", {
        task: task,
        isCompleted: completed,
        note: note,
      });
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (id, task, completed, note) => {
    try {
      const res = await axios.put("http://localhost:6969/todo/" + id, {
        task: task,
        isCompleted: completed,
        note: note,
      });
      //update the UI to reflect the changes that have been made.
      getData();
    } catch (e) {
      console.log(e);
    }
  };
  //Filter the todos by letters/word(s) in their notes.
  const searchTodos = (collection) => {
    return collection.filter(
      (todo) => todo.note.toLowerCase().indexOf(searchValue) > -1
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Todo Application</h1>
      </header>
      <main>
        <div className="todos">
          <label className="input-label" htmlFor="search">
            Search todo's based on word(s) in their notes:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <CreateTodo create={makeTodo} />
          <Todos
            update={handleUpdate}
            delete={handleDelete}
            data={searchTodos(todos)}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
