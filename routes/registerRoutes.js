const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');


app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.status(200).render("register");
})

// async anonymous function
router.post("/", async (req, res, next) => {
  var firstName = req.body.firstName.trim();
  var lastName = req.body.firstName.trim();
  var username = req.body.username.trim();
  var email = req.body.email.trim();
  var password = req.body.password;

  var payload = req.body;

  if(firstName && lastName && username && email && password){
    var user = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    })
      .catch((error) => {
      console.log(error);

      payload.errorMessage = "something went wrong";
      res.status(200).render("register", payload);
    })

    // checks if user is found
    if(user == null){
      // when no user is found.
      var data = req.body;
      data.password = await bcrypt.hash(password, 10);

      User.create(data)
      .then((user) => {
        req.session.user = user;
        return res.redirect('/');
      })
    }
    else {
      if(email == user.email){
        payload.errorMessage = "Email already in use.";
      }
      else{
        payload.errorMessage = "Username already in use.";
      }
      res.status(200).render("register", payload);
    }
  }

  // end of first 'if' statement.
  else {
    payload.errorMessage = "Make sure each field has a valid input.";
    res.status(200).render("register", payload);
  }
})

module.exports = router;