const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const csv = require("fast-csv");
const fs = require("fs");

// Load  model
const Admin = require("../../models/Admin");
const Location = require("../../models/Location");
const User = require("../../models/User");
const Case = require("../../models/Case");

var csvfile = __dirname + "/../../public/files/locations.csv";
var stream = fs.createReadStream(csvfile);

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
            res.redirect('/api/admin/');
          }
          else {
            res.send("Incorrect Password. Please try again!");
          }
        }
      }
    });
  });
  

  
  // admin flush the data
  // wrong need to change
  router.post('/flush', (req, res) => {
    if (req.session.admin) {
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
      res.send("Success");
    }
    else {
      res.send("You are not authorized to access this page.");
    }
    
  });
  
  // admin logout
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
  
  // admin create location document
  router.post('/create/location', (req, res) => {
    if (req.session.admin) {
      var newLocation = new Location({
        district: req.body['district'],
        coordinates: [req.body['xcoordinate'], req.body['ycoordinate']],
        building: req.body['building'],
        relatedCases: req.body['relatedCases'],
        lastVisitDate: req.body['lastVisitDate']
    
      });
      newLocation.save((err) => {
        if(err) {
          return res.status(500).send(err);
        }
        else {
          res.send("You have successfully created a new location" + "<br>\n" + 
            "District: " + newLocation.district + "<br>\n" + "Building: " + newLocation.building);
        }
      });
    }
    else {
      res.send("You are not authorized to access this page.");
    }
  });
  
  // admin update location document
  router.post('/update/location', (req, res) => {
    var myquery = { district: req.body['district'], building: req.body['building']};
  
    var newvalues = { $set: {district: req.body['newDistrict'], building: req.body['newBuilding']} };
  
    Location.findOne(
      myquery, (err, e) => {
        if(!e){
          res.send("The location was not found.");
        }
        else if (err) res.send(err);
  
        else{
          Location.updateOne(myquery, newvalues, (err, obj) => {
  
            if (err) throw err;
  
          });
          res.send('Success');
  
        }
      });
  });

  // admin delete location document
  router.post('/delete/location', (req, res) => {
    var myquery = { district: req.body['district'], building: req.body['building']};
    Location.findOne(myquery, (err, e) => {
        if(!e){
          res.send("The location was not found.");
        }
        else	if (err) res.send(err);
  
        else{
          Location.deleteOne(myquery, function(err, obj){
            if (err) throw err;
  
            res.redirect("/api/admin");
  
          });
        }
      });
  });

  // admin create user document
  router.post('/create/user', (req, res) => {
    if (req.session.admin) {
      var salt = bcrypt.genSaltSync();
      var passwordHash = bcrypt.hashSync(req.body['password'], salt);
  
      var newUser = new User({
        username: req.body['username'],
        password: passwordHash
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
          res.send("You have successfully created a new user" + "<br>\n" + 
            "Username: " + newUser.username + "<br>\n"+ "Password: " + req.body['password']);
        }
      });
    }
    else {
      res.send("You are not authorized to access this page.");
    }
  });

  // admin update user document
  router.post('/update/user', (req, res) => {
    var myquery = { username: req.body['username'], password: req.body['password']};
  
    var newvalues = { $set: {username: req.body['newUsername'], password: req.body['newPassword']} };
  
    User.findOne(
      myquery, (err, e) => {
        if(!e){
          res.send("The user was not found.");
        }
        else if (err) res.send(err);
  
        else{
          User.updateOne(myquery, newvalues, (err, obj) => {
  
            if (err) throw err;
  
          });
          res.send('Success');
  
        }
      });
  });

  // admin delete user document
  router.post('/delete/user', (req, res) => {
    var myquery = { username: req.body['username'], password: req.body['password']};
    User.findOne(myquery, (err, e) => {
        if(!e){
          res.send("The user was not found.");
        }
        else	if (err) res.send(err);
  
        else{
          User.deleteOne(myquery, function(err, obj){
            if (err) throw err;
  
            res.redirect("/api/admin");
  
          });
        }
      });
  });

// admin upload location data
router.post('upload/location', (req, res) => {
  //TO DO
}).get('/import', (req, res, next) => {
    
    var csvStream = csv()
        .on("data", (data) => {
         
         var newLocation = new Product({
              district: data[0],
              building: data[1],
              relatedCases: data[2],
              lastVisitDate: data[3]
         });
         
          newLocation.save((error) => {
              if(error){
                   throw error;
              }
          }); 
        }).on("end", function(){
          console.log(" End of file import");
    });
  
    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.", status : 200});
     
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

module.exports = router;