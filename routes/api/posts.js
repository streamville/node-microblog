const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../../schemas/userSchema');
const Post = require('../../schemas/PostSchema');


app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  // No need for conditions.
  Post.find()
  .then(results => res.status(200).send(results))
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  })
})

router.post("/", async (req, res, next) => {

  // if content is not found.
  if(!req.body.content){
    console.log("content param not send with request");
    return res.sendStatus(400);
  }

  // creating posts
  var postData = {
    content: req.body.content,
    postedBy: req.session.user 
  }

  Post.create(postData)
  .then(async newPost => {
    newPost = await User.populate(newPost, { path: "postedBy" })
    res.status(201).send(newPost);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  })
})    

module.exports = router;