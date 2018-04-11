const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/reclone");

mongoose.Promise = Promise;