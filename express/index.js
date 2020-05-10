const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const path = require("path");

const users = require("./routes/api/users");
const admins = require("./routes/api/admins");
const locations = require("./routes/api/locations");
const cases = require("./routes/api/cases");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Routes
app.use("/api/users", users);
app.use("/api/admins", admins);
app.use("/api/locations", locations);
app.use("/api/cases", cases);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));