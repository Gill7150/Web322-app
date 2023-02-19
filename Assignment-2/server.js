/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Gaganpreet Singh Student ID: 164321218 Date: Feb 19, 2023
*
*  Online (Cyclic) Link: https://sore-pear-toad-ring.cyclic.app
*
********************************************************************************/ 

const blog = require("./blog-service");
var express = require("express");
const app = express();

// View Path settings
var path = require("path");
var views = path.join(__dirname, "views");

// View engine setup
app.set("view engine", "ejs");
app.set("view engine", "hbs");

// Starting Server
blog
  .initialize()
  .then(function () {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server Started at port 8080");
    });
  })
  .catch(function (err) {
    console.log("unable to start server: " + err);
  });

app.use(express.static("public"));

// Routes
app.get("/", function (req, res) {
  res.redirect("/about");
});

// The route "/about" must return the about.html file from the views folder
app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/blog", function (req, res) {
  // var posts = [];
  blog
    .getPublishedPosts()
    .then(function (data) {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      res.json({ message: "No Results" });
    });
});

// The route "/posts" must return the posts.json file from the data folder
app.get("/posts", (req, res) => {
  blog
    .getAllPosts()
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json(data);
      }
    })
    .catch(() => {
      res.json({ message: "No Results" });
    });
});

// The route "/categories" must return the categories.json file from the data folder
app.get("/categories", (req, res) => {
  blog
    .getCategories()
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json({ message: "No results" });
      }
    })
    .catch((err) => {
      res.json({ message: "No results" });
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/404.html"));
});
