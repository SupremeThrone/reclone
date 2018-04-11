const express = require("express"),
      bodyParser = require("body-parser"),
      Post = require("./models/posts"),
      db = require("./models"),
      pug = require('pug'),
      path = require("path")

const app = express();
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//API Route. Used for JS.
app.get("/post/api", (req, res) => {
    db.Post.find()
     .then(function(posts){
         res.json(posts);
     })
     .catch(function(err){
         res.send(err);
     })
  });


app.get("/", (req, res) => {
    db.Post.find()
     .then(function(posts){
         res.render("index", {posts: posts})
     })
      .catch(function(err){
          console.log(err);
      })
});



 app.post("/post/new", (req, res) =>{
     Post.create(req.body)
      .then(function(newPost){
          res.json(newPost);
      })
      .catch(function(err){
          res.send(err);
      })
    });
    

app.listen(3000, () => {
    console.log("Running...")
})