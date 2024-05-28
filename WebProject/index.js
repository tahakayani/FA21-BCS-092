const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contacts");
const memberRoutes = require("./routes/members");
const searchHistoryRoutes = require("./routes/searchHistory");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.use(userRoutes);
app.use(contactRoutes);
app.use(memberRoutes);

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/contact-us', function (req, res) {
  res.render("contact-us");
});

app.get('/members-forms', function (req, res) {
  res.render("members-forms");
});

app.get('/members', function (req, res) {
  res.render("members");
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
