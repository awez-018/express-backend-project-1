const express = require("express");
const fs = require("fs");

const { connectMongoDb } = require("./connection");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/project-1");
//middlewar - plugin

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log("TIme: ", Date.now());
  next();
});

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started at port:${PORT}`));
