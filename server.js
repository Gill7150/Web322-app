/*********************************************************************************
*  WEB322 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Gaganpreet Singh Student ID: 164321218 Date: Feb 19, 2023
*  Online (Cyclic) URL: https://sore-pear-toad-ring.cyclic.app
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Gaganpreet Singh - 164321218");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);


