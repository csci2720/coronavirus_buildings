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
const db = "mongoURI";

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
          res.redirect('/home');
        }
        else {
          res.send("Incorrect password. Please try again.");
        }
      }
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));