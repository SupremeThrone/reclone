const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/reclone");

mongoose.Promise = Promise;

//Get the posts schema for Promises functionality(?)
module.exports.Post = require("./posts")