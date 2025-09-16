const mongoose = require("mongoose");

//db connection
async function connectMongoDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error", err));
}

module.exports = { connectMongoDb };
