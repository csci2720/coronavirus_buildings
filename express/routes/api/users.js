const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");



// Load  model
const Admin = require("../../models/Admin");
const Location = require("../../models/Location");
const User = require("../../models/User");
const Case = require("../../models/Case");
const Comment = require("../../models/Comment");


// @route 
// @desc user register
// @access User
router.post('/register', (req, res) => {
  var salt = bcrypt.genSaltSync();
  var passwordHash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new User({
    username: req.body.username,
    password: passwordHash,
    favourites: []
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
router.get('/sortedLocations/:sort', async (req, res) => {
  var type = req.params['sort'];
  var sorted;
  if (type == 'district')
  {
    sorted = await Location.find({}).sort({district: 1});
  }
  else if (type == 'building')
  {
    sorted = await Location.find({}).sort({building: 1});
  }
  else if (type == 'coordinates')
  {
    sorted = await Location.find({}).sort({coordinates: 1});
  } 
  else if (type == 'lastVisitDate')
  {
    sorted = await Location.find({}).sort({lastVisitDate: 1});
  }
  else
  {
    sorted = await Location.find({}).sort({relatedCases: 1});
  }
  res.send(sorted);
});
// Add to favourites
router.post('/favourites/:favouriteId', async (req, res) => {
  var favId = req.params["favouriteId"];
  console.log(favId)
  var users = await User.find({username: req.body.username})
  if (users.length != 0) {
    var user = users[0];
    if(user.favourites != undefined) {
    if(user.favourites.filter(x => x == favId).length == 0) {
      var new_fav = user.favourites.concat([favId])
      var upsertData = user.toObject()
      delete upsertData._id
      upsertData.favourites = new_fav
      User.update(
        {_id: user._id},
        upsertData, 
        {multi: false},
        function(err) {
          if(err) { throw err; }
        }
      );
      var new_user = await User.find({username: req.body.username})
      console.log(new_user)
      res.status(200).send(new_user[0]);
    }
  } else {
    var user = users[0];
    console.log(user);
    User.update(
      {_id: user._id},
      {$set: {
        favourites: [favId]
      }})
      var new_user = await User.find({username: req.body.username})
      console.log(new_user)
      res.status(200).send(new_user[0]);
  }
  }
});
// add comment
router.post('/comment/',async (req, res) => {
  var x = await User.findOne({username: req.body.User.username});
  var y = await Location.findOne(req.body.Location);
  var z = req.body.text;
  var newComment = new Comment({
    user: x,
    text: z,
    location: y
  });
  newComment.save();
  res.send("Comment was successfully added");
});

module.exports = router;