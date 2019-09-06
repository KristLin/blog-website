// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var homeContent = "This is the content of the home page.";
var aboutContent = "This is the content of the about page.";
var contactContent = "This is the content of the contact page.";

var posts = [];

app.get("/", function(req, res) {
  res.render("home", {
    homeContent: homeContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const newPost = {
    title: req.body.postTitle,
    content: req.body.postContent
  };
  posts.push(newPost);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
