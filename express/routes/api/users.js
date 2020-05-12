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
router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {

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
          res.redirect('/api/user/');
        }
        else {
          res.send("Incorrect password. Please try again.");
        }
      }
    }
  });
});

// user logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// user home
router.get('/', (req, res) => {
  if (req.session.user) {
    res.send("hello user.");
  }
  else {
    res.send("You are not authorized to access this page.");
  }
});


module.exports = router;