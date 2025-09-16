const express = require("express");

const app = express();

const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/project-1");

//middlewar - plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started at port:${PORT}`));
