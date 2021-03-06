const express = require('express');
const app = express();
const port = 3001;
const middleware = require('./middleware');
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require('./database');
const session = require('express-session');

//  Server
const server = app.listen(port, () => console.log("Server running on port " + port));

app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(session({
  secret: "best tech startup",
  resave: true,
  saveUninitialized: false
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logoutRoutes');

// API route
const postsApiRoute = require('./routes/api/posts');


app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

  var payload = {
    pageTitle: "Blackboard",
    userLoggedIn: req.session.user 
  }
  
  res.status(200).render("home", payload);
})