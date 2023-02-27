/*********************************************************************************
 *  WEB322 – Assignment 03
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Gaganpreet Singh Student ID: 164321218 Date: Feb 19, 2023
 *
 *  Online (Cyclic) Link: https://sore-pear-toad-ring.cyclic.app
 *
 ********************************************************************************/

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const blog = require("./blog-service");
const app = express();

// // Cloudinary for image upload
cloudinary.config({
  cloud_name: "bjpjerien",
  api_key: "999693617868597",
  api_secret: "vTRdDIh-HJl6W-DPkSuaSG10XMI",
  secure: true,
});

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// View Path settings
var path = require("path");
var views = path.join(__dirname, "views");

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
  blog
    .getPublishedPosts()
    .then(function (data) {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "No Results" });
    });
});

// Post Routes
app.get("/posts/add", (req, res) => {
  blog
    .getCategories()
    .then((data) => {
      res.sendFile(path.join(__dirname, "/views/addPost.html"));
    })
    .catch((err) => {
      res.sendFile(path.join(__dirname, "/views/addPost.html"));
    });
});

app.get("/posts", (req, res) => {
  if (req.query.category) {
    blog
      .getPostsByCategory(req.query.category)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: "No results" });
      });
  } else if (req.query.minDate) {
    blog
      .getPostsByMinDate(req.query.minDate)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: "No results" });
      });
  } else {
    blog
      .getAllPosts()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: "No results" });
      });
  }
});

app.get("/posts/:id", (req, res) => {
  blog
    .getPostById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "No results" });
    });
});

app.post("/posts/add", upload.single("featureImage"), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      return result;
    }
    upload(req).then((uploaded) => {
      req.body.featureImage = uploaded.url;
      blog.addPost(req.body).then(() => {
        res.redirect("/posts");
      });
    });
  }
});

// Category Routes
app.get("/categories", (req, res) => {
  blog
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "No results" });
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/404.html"));
});
