//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
const express = require("express");
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
const Admin = require("./models/Admin");
const Location = require("./models/Location");
const User = require("./models/User");
const Case = require("./models/Case");
const Comment = require("./models/Comment");
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

  app.use(express.static(path.join(__dirname, 'project-react/build')));
// Routes
app.use("/api/user", users);
app.use("/api/admin", admins);

app.get('/api/locations', async (req, res) => {
  var allLocations = await Location.find({}, (err) => {if(err) return res.send('Sorry, there are no locations found.')});
  res.status(200).send(allLocations);
});
app.get("/api/locations/:loc-id", (req, res) => {
  var locId = req.params['loc-id'];
  var allLocations = await Location.find({_id: locId}, (err) => {if(err) return res.send('Sorry, there are no locations found.')});
  res.status(200).send(allLocations[0]);
});
app.post('/api/locations', (req, res) => {
 
    var newLocation = new Location({
      district: req.body['district'],
      building: req.body['building']
    });
    newLocation.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        res.send("You have successfully created a new location" + "<br>\n" +
          "District: " + newLocation.district + "<br>\n" + "Building: " + newLocation.building);
      }
    });
});
// main page
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/project-react/build/index.html'));
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));