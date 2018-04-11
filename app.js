const express = require("express"),
      bodyParser = require("body-parser"),
      Post = require("./models/posts"),
      db = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
   db.Post.find()
    .then(function(posts){
        res.json(posts);
    })
    .catch(function(err){
        console.log(err);
    })
 });

app.listen(3000, () => {
    console.log("Running...")
})