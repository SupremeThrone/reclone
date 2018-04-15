//Dependencies
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      http = require("http"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      Post = require("./models/posts"),
      db = require("./models"),
      pug = require('pug'),
      path = require("path"),
      methodOverride = require("method-override")



app.use(require("express-session")({
  secret: "Brown cat dog",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 360000
    }
}));
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Path for CS
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/views"));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());

//Passport Set-up
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//API Route. Used for JS.
app.get("/post/api", (req, res) => {
    db.Post.find()
      .then(function(posts){
         res.json(posts);
     })
     .catch(err => {
        console.log(err);
     })
});

//Index route that displays all the posts
app.get("/", (req, res) => {
    db.Post.find()
      .then(function(posts){
         res.render("index", {posts: posts})
     })
     .catch(err => {
        console.log(err);
     })
});

//NEW GET route that displays the form for making a new post
app.get("/post/new", (req, res) =>{
    res.render("posts/submit")
});

//NEW POST route
app.post("/post/new", (req, res) =>{
     db.Post.create(req.body.post)
      .then(function(newPost){
          res.json(newPost);
      })
     .catch(err => {
        console.log(err);
     })
});

//SHOW route
app.get("/post/:id", (req, res) => {
     db.Post.findById(req.params.id)
      .then(function(displayPost){
          res.render("posts/show", {displayPost: displayPost})
      })
     .catch(err => {
        console.log(err);
     })
})

//EDIT, render edit page
app.get("/post/:id/edit", (req, res) => {
     db.Post.findById(req.params.id)
      .then(function(editedPost){
          res.render("posts/edit", {editedPost:editedPost})
      })
     .catch(err => {
        console.log(err);
     }) 
})

//EDIT put
app.put("/post/:id/", (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body.post)
      .then(() => {
          res.redirect("/post/" + req.params.id);
      })
     .catch(err => {
        console.log(err);
     })
})

//DELETE route
app.delete("/post/:id", (req, res) => {
    db.Post.findByIdAndRemove(req.params.id)
      .then(() => {
          res.redirect("/")
      })
     .catch(err => {
         console.log(err);
     })
});


app.listen(3000, () => {
    console.log("Running...")
})