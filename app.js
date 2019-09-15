// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const baseURL = "mongodb://localhost:27017";
mongoose.connect(baseURL + "/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// set post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// set post model
const Post = mongoose.model("Post", postSchema);

// default content for different pages
var homeContent = "This is the content of the home page.";
var aboutContent = "This is the content of the about page.";
var contactContent = "This is the content of the contact page.";

// get home page
app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if(err) {
      console.log(err);
    }
    res.render("home", {
      homeContent: homeContent,
      posts: posts
    });
  });
});

// get about page
app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

// get contact page
app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

// get compose page
app.get("/compose", function(req, res) {
  res.render("compose");
});

// handle compose post request
app.post("/compose", function(req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });
  // save the new post
  newPost.save(function(err) {
    if(err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

// get single post page
app.get("/posts/:postId", function(req, res) {
  const postId = req.params.postId;
  Post.findOne({_id: postId}, function(err, post) {
    if(err) {
      console.log(err);
    }
    if(!post) {
      res.render("404");
    } else {
      res.render("post", {post: post});
    }
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
