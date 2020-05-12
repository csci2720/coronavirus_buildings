const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");



// Load  model
const Admin = require("../../models/Admin");
const Location = require("../../models/Location");
const User = require("../../models/User");
const Case = require("../../models/Case");


// @route 
// @desc admin login
// @access Admin
router.get('/login', (req, res) => {
    Admin.findOne({ username: req.query.username }, (err, admin) => {
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
  router.get('/', (req, res) => {
    if (req.session.admin) {
      res.send("Hello Admin, welcome back.");
    }
    else {
      res.send("You are not authorized to access this page.");
    }
  });
  
  // admin flush the data
  router.post('/flush', (req, res) => {
    Location.deleteMany({}, (err) => {
      if (err) {
        return handleError(err);
      }
      else {
        locations = [];
        favourites = [];
        flushed = true;
      }
    });
    User.deleteMany({}, (err) => {
      if (err) {
        return handleError(err);
      }
    });
    Admin.deleteMany({}, (err) => {
      if (err) {
        return handleError(err);
      }
    });
    Case.deleteMany({}, (err) => {
      if (err) {
        return handleError(err);
      }
    });
  });
  
  // admin logout
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
  
  // admin create location document
  router.post('/create/location', (req, res) => {
    var newLocation = new Location({
      district: req.body.district,
      coordinates: [req.body.xcoordinate, req.body.ycoordinate],
      buildingName: req.body.buildingName,
  
  
    })
  });
  
  // admin create user document
  router.post('/create/user', (req, res) => {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    newUser.save((err) => {
      if (err) {
        if (err.username === 'MongoError' && err.code === 11000) {
          return res.status(500).send("The user with the given username already exist. Please change the username.");
        }
        else {
          return res.status(500).send(err);
        }
      }
      else {
        res.send("You have successfully created a new user with username: " + newUser.username);
      }
    });
  });



module.exports = router;