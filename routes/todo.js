const e = require("express");
const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(express.json());
router.use(cors());
const Todo = require("../Todo");

const firstTodo = new Todo(
  "Take a shower",
  `It's been a couple days since I've showered...`,
  false,
  1
);
const secondTodo = new Todo(
  "Lift weights",
  `We're getting close to hitting a 700 pound squat... keep pushing`,
  false,
  6
);
const thirdTodo = new Todo(
  "Complete assessment",
  "Start working on weak points instead of running away from them",
  false,
  1
);
const fourthTodo = new Todo(
  "Practice diatonic chord progressions on the keyboard",
  "Do it in all major and minor keys.",
  false,
  365
);
const fifthTodo = new Todo(
  "Meal prep for the week",
  `Prepare the same meals you've been consistently eating three times a day for three years.`,
  true,
  21
);

fifthTodo.setId("1");

const todoCollection = [
  firstTodo,
  secondTodo,
  thirdTodo,
  fourthTodo,
  fifthTodo,
];

const findTodoById = (id, arr) => {
  const filteredTodo = arr.find((todo) => todo.getId() === id);
  return filteredTodo;
};

const findTodoByCompleted = (bool, arr) => {
  let newCollection = [];
  arr.forEach((element) => {
    if (element.getIsCompleted() === bool) newCollection.push(element);
  });
  return newCollection;
};

//Return by query param ID,if the todo is completed or return all.

router.get("/", (req, res, next) => {
  const todoId = req.query.id;
  let todoCompleted = req.query.completed;

  //filter the collection based on a single ID from query string(s).
  if (typeof todoId !== "undefined") {
    const filteredTodo = findTodoById(todoId, todoCollection);

    if (typeof filteredTodo === "undefined")
      return res.status(404).send("Please enter a correct ID.");
    res.status(200).send(filteredTodo);
  }
  //filter the collection based on whether or not the todo is completed.
  else if (typeof todoCompleted !== "undefined") {
    if (todoCompleted === "true") todoCompleted = true;
    else if (todoCompleted === "false") {
      todoCompleted = false;
    } else if (todoCompleted !== "true" || todoCompleted !== false) {
      return res
        .status(404)
        .send("Please insert a correct boolean value for completed");
    }

    let newCollection = findTodoByCompleted(todoCompleted, todoCollection);
    res.status(200).send(newCollection);
  }
  // return all todos
  else {
    return res.status(200).send(todoCollection);
  }
});

//Return by Param
router.get("/:id", (req, res, next) => {
  const todoId = req.params.id;
  const filteredTodo = findTodoById(todoId, todoCollection);
  res.status(200).send(filteredTodo);
});
//create a new todo
router.post("/", (req, res, next) => {
  const newTodo = new Todo();
  for (const property in req.body) {
    newTodo[property] = req.body[property];
  }
  res.status(201).send(newTodo);
  todoCollection.push(newTodo);
});
//update the todo
router.put("/:id", (req, res, next) => {
  const todoId = req.params.id;
  const filteredTodo = findTodoById(todoId, todoCollection);
  if (!filteredTodo)
    return res.status(404).send("The todo with the provided ID does not exist");
  for (const property in req.body) filteredTodo[property] = req.body[property];
  res.status(202).send(filteredTodo);
});
//delete a todo
router.delete("/:id", (req, res, next) => {
  const todoId = req.params.id;
  const filteredTodo = findTodoById(todoId, todoCollection);
  if (!filteredTodo) {
    return res.status(404).send("The todo with the provided ID does not exist");
  }

  for (let i = 0; i < todoCollection.length; i++) {
    if (todoCollection[i] === filteredTodo) todoCollection.splice(i, 1);
  }
  res.status(200).send(`item ${JSON.stringify(filteredTodo)} has been deleted`);
});

module.exports = router;
