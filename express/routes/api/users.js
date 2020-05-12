const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");



// Load  model
const Admin = require("../../models/Admin");
const Location = require("../../models/Location");
const User = require("../../models/User");
const Case = require("../../models/Case");


// @route 
// @desc user register
// @access User
app.post('/register', (req, res) => {
    var salt = bcrypt.genSaltSync();
    var passwordHash = bcrypt.hashSync(req.body.password, salt);
  
    var newUser = new User({
      username: req.body.username,
      password: passwordHash
    });
  
    newUser.save((err) => {
      if (err) {
        if (err.username === "MongoError" && err.code === 11000) {
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



module.exports = router;