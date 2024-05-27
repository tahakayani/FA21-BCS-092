const express = require('express');
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/contacts"));

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/contact-us', function (req, res) {
  res.render("contact-us");
});

app.get('/home-page', function (req, res) {
  res.render("contact-us");
});

app.get('/about-us', function (req, res) {
  res.render("about-us");
});

app.get('/login-page', function (req, res) {
  res.render("login-page");
});

mongoose.connect("mongodb://localhost:27017/login-page").then((data) => {
  console.log("DB Connected");
});


let port = 3002;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});