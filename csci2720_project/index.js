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



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));