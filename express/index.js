const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const Admin = require("./models/Admin");
const User = require("./models/User");
const Case = require("./models/Case");
const Location = require("./models/Location");

const app = express();
const request = require('request');
const passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcryptjs');


app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// might need to change
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

// DB Config
const db = "mongodb+srv://Myrat:Myratjon123@cluster0-pjvpj.mongodb.net/csci2720_project";

// Connect to MongoDB

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Routes

// user register
app.post('/register', (req, res) => {
  var salt = bcrypt.genSaltSync();
  var passwordHash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    username: req.body.username,
    password: passwordHash
  });

  newUser.save((err) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.send("This username is already taken. Please choose another one.");
      }
      return res.send(err);
    }
    res.send("Congratulations, you have successfully created an account.");
  });
});


// user login
app.get('/login', (req, res) => {

  User.findOne({ username: req.query.username }, (err, user) => {
    if (!user) {
      res.send("The user with the given username does not exist.");
    }
    else {
      if (err) {
        res.send(err);
      }
      else {
        var cmp = bcrypt.compareSync(req.query.password, user.password);
        if (cmp) {
          req.session.user = true;
          res.redirect('/home');
        }
        else {
          res.send("Incorrect password. Please try again.");
        }
      }
    }
  });
});

// user logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// admin login
app.get('/admin/login/', (req, res) => {
  Admin.findOne({username: req.query.username}, (err, admin) => {
    if (!admin) {
      res.send("The admin with the given username does not exist.");
    }
    else {
      if (err) {
        res.send(err);
      }
      else {
        if (req.query.password === admin.password) {
          req.session.admin = true;
          res.redirect('/admin');
        }
        else {
          res.send("Incorrect Password. Please try again!");
        }
      }
    }
  });
});

// admin home page
app.get('/admin', (req, res) => {
  if (req.session.admin) {
    res.send("Hello Admin, welcome back.");
  }
  else {
    res.send("You are not authorized to access this page.");
  }
});

// main page
app.get('/', (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));