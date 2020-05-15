//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const csv = require("fast-csv");
const fs = require("fs");
const upload = require("express-fileupload");
const csvtojson = require("csvtojson");
const https = require('https');
const fetch = require('node-fetch');

// Load  model
const Admin = require("../../models/Admin");
const Location = require("../../models/Location");
const User = require("../../models/User");
const Case = require("../../models/Case");

var csvfile = __dirname + "/public/files/locations.csv";
var stream = fs.createReadStream(csvfile);

router.use(upload());


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
  }
  else {
    res.send("You are not authorized to access this page.");
  }
});

// admin update location document
router.post('/update/location', (req, res) => {
  var myquery = { district: req.body['district'], building: req.body['building'] };

  var newvalues = { $set: { district: req.body['newDistrict'], building: req.body['newBuilding'] } };

  Location.findOne(
    myquery, (err, e) => {
      if (!e) {
        res.send("The location was not found.");
      }
      else if (err) res.send(err);

      else {
        Location.updateOne(myquery, newvalues, (err, obj) => {

          if (err) throw err;

        });
        res.send('Success');

      }
    });
});

// admin delete location document
router.post('/delete/location', (req, res) => {
  var myquery = { district: req.body['district'], building: req.body['building'] };
  Location.findOne(myquery, (err, e) => {
    if (!e) {
      res.send("The location was not found.");
    }
    else if (err) res.send(err);

    else {
      Location.deleteOne(myquery, function (err, obj) {
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
          "Username: " + newUser.username + "<br>\n" + "Password: " + req.body['password']);
      }
    });
  }
  else {
    res.send("You are not authorized to access this page.");
  }
});

// admin update user document
router.post('/update/user', (req, res) => {
  if (req.session.admin) {
    var salt = bcrypt.genSaltSync();
    var passwordHash = bcrypt.hashSync(req.body['newPassword'], salt);
    var newvalues = { $set: { username: req.body['newUsername'], password: passwordHash } };
  
    User.findOne(
      { username: req.body['username'] }, (err, e) => {
        if (!e) {
          res.send("The user was not found.");
        }
        else if (err) res.send(err);
  
        else {
          if (bcrypt.compareSync(req.body['password'], e.password)) {
            User.updateOne({ username: req.body['username'] }, newvalues, (err, obj) => {
  
              if (err) throw err;
  
            });
            res.send('Success');
          }
          else {
            res.send("You have entered incorrect password");
          }
  
  
        }
      });
  }
  else {
    res.send("You are not authorized to access this page.");
  }
  
});

// admin delete user document
router.post('/delete/user', (req, res) => {
  if (req.session.admin) {
    User.findOne({username: req.body['username']}, (err, e) => {
      if (!e) {
        res.send("The user was not found.");
      }
      else if (err) res.send(err);
  
      else {
        if(bcrypt.compareSync(req.body['password'], e.password)) {
          User.deleteOne({username: req.body['username']}, function (err, obj) {
            if (err) throw err;
    
            res.redirect("/api/admin");
    
          });
        }
        else {
          res.send("You have entered incorrect password");
        }
        
      }
    });
  }
  else {
    res.send("You are not authorized to access this page.");
  }
  
});

// // admin upload location data
// router.post('/upload/location', (req, res) => {
//
//   var csvStream = csv()
//     .on("data", (data) => {
//
//       var newLocation = new Location({
//         district: data[0],
//         building: data[1],
//         lastVisitDate: data[2],
//         relatedCases: data[3]
//       });
//
//       newLocation.save((error) => {
//         if (error) {
//           res.send(err);
//         }
//       });
//     }).on("end", function () {
//       console.log(" End of file import");
//     });
//
//   stream.pipe(csvStream);
//   res.json({ success: "Data imported successfully.", status: 200 });
//
// });

//File upload 2.0
/** NOTE: "csvfile" is the name of my file given at name attribute in input tag */
router.post("/file",async (req, res) => {
  /** convert req buffer into csv string ,
   *   "csvfile" is the name of my file given at name attribute in input tag */
  let csvData = req.files.csvfile.data.toString('utf8');
  let jsonData = await csvtojson().fromString(csvData);
  await jsonData.forEach((item) =>{
    let relatedCases = item['Related probable/confirmed cases'].split(', ');
    relatedCases[0] = relatedCases[0].split(' ')[1];
    relatedCases = relatedCases.filter(item => {if(!isNaN(item)){return item}});
    console.log(relatedCases);
    let newLocation = new Location({
      district: item.District,
      building: item['Building name'],
      lastVisitData: item['Last date of residence of the case(s)'],
      relatedCases: relatedCases
    })
    newLocation.save((err) => {
      if (err) {
        if (err.username === "MongoError" && err.code === 11000) {
          return "Error occurred"
        }
        console.log(err);
      }
    })
  });
  res.send(jsonData);
});

//admin download the file and load data to DB

router.get('/loadData', async (req, res) => {
  const request = await fetch("https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22http%3A%2F%2Fwww.chp.gov.hk%2Ffiles%2Fmisc%2Fenhanced_sur_covid_19_eng.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D").then(
      res => res.json()).then(json => {return json});
  console.log(request);
  await request.forEach((item) =>{
    let newCase = new Case({
      caseNum: item['Case no.'],
      gender: item['Gender'],
      age: item['Age']
    })
    newCase.save((err) => {
      if (err) {
        if (err.username === "MongoError" && err.code === 11000) {
          return "Error occurred"
        }
        console.log(err);
      }
    })
  });
  res.send(request);
});
// admin home page
router.get('/', (req, res) => {
  if (req.session.admin) {
    res.send("Hello Admin, welcome back." + csvfile);
  }
  else {
    res.send("You are not authorized to access this page.");
  }
});

module.exports = router;