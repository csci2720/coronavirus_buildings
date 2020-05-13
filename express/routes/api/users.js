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

// user get list of locations
router.get('/locations', async (req, res) => {
  var allLocations = await Location.find({}, (err) => {if(err) return res.send('Sorry, there are no locations found.')});
  res.status(200).send(allLocations);
});
// user get list of locations sorted according to buildingName
router.get('/sortedLocations/:sort', (req, res) => {
  var type = req['sort'];
  var sorted;
  if (type == 'district')
  {
      sorted = Location.find().sort({district:1});
  }
  else if (type == 'building')
  {
    sorted =  Location.find().sort({building:1});
  }
  else if (type == 'coordinates')
  {
    sorted =  Location.find().sort({coordinates:1});
  } 
  else if (type == 'lastVisitDate')
  {
    sorted =  Location.find().sort({lastVisitDate:1});
  }
  else
  {
    sorted =  Location.find().sort({relatedCases:1});
  }
  res.send(sorted);
});
//Show all locations on map
router.get('/maplocation', (req, res) => {
});
//locations which contain keywords in one field chosen by the user which will result in a table of location results
router.get('/smth/:keyword',(req,res)=>
{

});
//A separate view for one single location
router.get('/location/:locId',(req,res)=>
{
  //a

  //c

  //b
  res.send(Location);
});
//Add location into a list of favourite locations, and see the list in another view
router.post('/newlocation/:locId',(req,res)=>
{
    User.findOne({username: req.body.username}).exec( (e)=>
    {
      e.favourites.push(req['locId']);
    });
});
module.exports = router;