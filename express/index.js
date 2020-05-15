//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const request = require('request');
const passport = require('passport');

var cookieParser = require('cookie-parser');
var session = require('express-session');

const admins = require("./routes/api/admins");
const users = require("./routes/api/users");

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
app.use("/api/user", users);
app.use("/api/admin", admins);



// main page
app.get('/', (req, res) => {
  res.send("Hello World!");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));