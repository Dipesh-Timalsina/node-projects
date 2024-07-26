const connectDB = require("./task-manager/starter/db/connect");
const express = require("express");
const app = express();
const tasks = require("./task-manager/starter/routes/tasks");
const notFound = require("./task-manager/starter/middleware/not-found");
const errorHandlerMiddleware = require("./task-manager/starter/middleware/errorhandler");
const {createCustomError} = require ("./task-manager/starter/errors/custom-error")
require("dotenv").config();
//middleware
app.use(express.static("./task-manager/starter/public"));
app.use(express.json());

//route

app.use("/api/v1/tasks", tasks);
app.use(notFound)
app.use(errorHandlerMiddleware)
// app.get('api/v1/tasks) -get all the tasks
//app.post('api/v1/tasks')-create a new  task
//app.get('api/v1/tasks/:id)- get the info of the single task
//app.patch("api/v1/tasks/:id")-- update the given task
//app.delete("api/v1/tasks/:id")-- delete the specific task

//connectDB =(PROCESS.ENV.MONGO_URI)

const port = process.env.Port || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`the server is listening to port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
