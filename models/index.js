const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/reclone");
let db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to Mongo");
});

db.on("error", () => {
    console.log(err);
})

mongoose.Promise = Promise;

//Get the posts schema for Promises functionality(?)
module.exports.Post = require("./posts")
module.exports.Room = require("./rooms")
module.exports.User = require("./user")