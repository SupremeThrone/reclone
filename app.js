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
app.use(express.static(__dirname + '/public')); //Path for CSS
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

//Index route that displays all the posts
app.get("/", (req, res) => {
    db.Post.find()
     .then(function(posts){
         res.render("index", {posts: posts})
     })
      .catch(function(err){
          console.log(err);
      })
});

//NEW GET route that displays the form for making a new post
app.get("/post/new", (req, res) =>{
    res.render("posts/submit")
    
})


 app.post("/post/new", (req, res) =>{
    //  const title = req.post.title;
    //  const body = req.post.body;
    //  const image = req.post.image;

    //  const createPost = {
    //      title: title,
    //      body: body,
    //      image: image
    //  }

     Post.create(req.body.post)
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