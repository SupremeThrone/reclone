//Dependencies
const express = require("express"),
      app = express()
      bodyParser = require("body-parser"),
      http = require("http"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      Post = require("./models/posts"),
      User = require("./models/user"),
      Room = require("./models/rooms")
      db = require("./models"),
      pug = require('pug'),
      path = require("path"),
      methodOverride = require("method-override"),
      flash = require("connect-flash"),
      fetch = require("node-fetch")
      
      
      
      




//Express-session
//Make sure you require express-session and not just express
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

app.use(passport.initialize());
app.use(passport.session());
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



//NEW POST route
app.post("/r/:room/post/new", checkAuth, (req, res) =>{
    let title = req.body.post.title;
    let room = req.body.post.room;
    let body = req.body.post.body;
    let image = req.body.post.image;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
   
    let newPost = {
        title: title,
        body: body,
        image: image,
        author: author,
        room: room
    }
    db.Post.create(newPost)
      .then(function(newPost){
          res.json(newPost);
          
      })
     .catch(err => {
       console.log(err)
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
app.get("/post/:id/edit", checkAuth, (req, res) => {
     db.Post.findById(req.params.id)
      .then(function(editedPost){
          res.render("posts/edit", {editedPost:editedPost})
      })
     .catch(err => {
        console.log(err);
     }) 
})

//EDIT put
app.put("/post/:id/", checkAuth, (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id, req.body.post)
      .then(() => {
          res.redirect("/post/" + req.params.id);
      })
     .catch(err => {
        console.log(err);
     })
})

//DELETE route
app.delete("/post/:id", checkAuth, (req, res) => {
    db.Post.findByIdAndRemove(req.params.id)
      .then(() => {
          res.redirect("/")
      })
     .catch(err => {
         console.log(err);
     })
});


app.delete("/post/:id", checkAuth, (req, res) =>{
    db.Post.findByIdAndRemove(req.params.id)
      .then(() => {
          res.redirect("/")
      })
})


///////////////////////////////////REGISTRATION

app.get("/register", (req, res) => {
    res.render("register")
    
})

app.post("/register", (req, res) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email
    })
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            console.log(newUser)
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/")
        })
    })
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/")
})

function checkAuth(req, res, next){
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}
// *** ROOMS ***

app.get("/r/create", (req, res) => {
    res.render("rooms")
})

app.post("/r/create", (req, res) => {
   const room =  req.body.room;
   const description = req.body.description;
   const resource = {room, description}
    db.Room.create(resource)
     .then((room) => {
         res.json(room)
     })
})

app.get("/r/api", (req, res) => {
    db.Room.find()
     .then((room) => {
         res.json(room)
     })
})

app.get("/r/:room", (req, res) => {
   const room = req.params.room
   /*Loop through the data callback so that we can
   compare the objects to our room const which is in the url,
   note it has to be case-sensitive*/
    db.Room.find()
     .then(data => {
         data.forEach(element => {
             if(element.room === room){
                 db.Room.find(element)
                  .then(room => {
                      res.render("rooms/room", {room: room})
                  })
                  .catch(err => {
                      console.log(err);
                  })
             }
         });
     })
    
})

//NEW GET route that displays the form for making a new post
// app.get("/r/:room/post/new", checkAuth, (req, res) =>{
//     const room = req.params.room
//     db.Room.find()
//      .then(found => {
//         found.forEach(element => { 
//             if(element.room === room){
//                 res.render("posts/submit", {room: room})
//             }
//         });
//      })
//      .catch(err => {
//          console.log(err);
//      })
    
    
// });

// 
// app.get("/test", (req, res) => {
//     
    
//     .catch((err) => {
//         console.log(err);
//     })
// })










app.listen(3000, () => {
    console.log("Running...")
})

