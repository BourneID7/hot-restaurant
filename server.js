// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8008;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables Data Characters (DATA)
// =============================================================
var tables = [
  {
    name: "Name",
    phone: "414-414-4141",
    email: "email@gmail.com",
    uniqueID: 8487
  },
  {
    name: "Bob1",
    phone: "414-414-4141",
    email: "email@gmail.com",
    uniqueID: 8487
  },
  {
    name: "Bob2",
    phone: "414-414-4141",
    email: "email@gmail.com",
    uniqueID: 8487
  }
];

var waitList = [
  {
    name: "Name",
    phone: "414-414-4141",
    email: "email@gmail.com",
    uniqueID: 8488
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
//   res.send("Welcome to the Home Page!");
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
//   res.send("Welcome to the Tables Page!");
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
//   res.send("Welcome to the Reservation Page!");
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all waiting list
app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});


app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newres = req.body;

    if (tables.length < 5) {
        tables.push(newres);
        res.json(newres);
        console.log("Reservation confirmed!");
        
          
    } else {
        waitList.push(newres);
        res.json(newres);
        console.log("Sorry! All tables are full. You are on the waiting list.");

    };  
});

// clear tables
app.post("/api/clear", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    tables = [];
    waitList = [];
});  

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newres.name = newres.name.replace(/\s+/g, "").toLowerCase();


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});