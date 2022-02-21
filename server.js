const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo");
const PORT = 6969;

//routes that will handle the requests.
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server connected on port - ${PORT}`);
});

//creates a new error and passes the error
app.use((req, res, next) => {
  const error = new Error("Internal Server Error");
  error.status = 500;
  next(error);
});
//sets the response status and sends back the error injson.

app.use((error, req, res, next) => {
  res.status(error.status || 404);
  res.send({
    error: {
      status: error.status || 404,
      message: error.message,
    },
  });
});

module.exports = app;
