var express = require("express"),
    http = require("http"),
    app;
var bodyparser = require("body-parser");

// An object to count the statistics of the flip game
var statistics = {};
statistics.wins = 0;
statistics.losses = 0;

// Create a Express-powered HTTP server
//  and have it listen on port 3000
app = express();
http.createServer(app).listen(3000);

// set up a static file directory to use for default routing
// and html and css files are stored in gameClient directory
app.use(express.static(__dirname + "/gameClient"));

app.use(bodyparser.urlencoded({

    extended: true
}));
app.use(bodyparser.json());

// For get stats, obtain results
app.get("/stats", function(req, res) {
    res.status(200).json(statistics);
});

// For post
app.post("/flip", function(req, res) {
    var userChoice = req.body;
    var userChoiceResult = userChoice.call;
    console.log("User input: " + userChoiceResult);

    // Array to store coin face
    var coinFace = ["heads","tails"];

    // Randomly generator 
    var randomOutput = coinFace[Math.floor(Math.random() * coinFace.length)];
    console.log("Generated output: " + randomOutput);
    var outputObj = {};
    var checkResult;
    // Comparing user choice with the random output
    if (userChoiceResult === randomOutput) {
        checkResult = "win";
        console.log("Win");
        statistics.wins++;
    }
    else {
        checkResult = "loose"
        console.log("loose");
        statistics.losses++;
    }
    outputObj.result = checkResult;
    res.status(200).json(outputObj);
});

// Note on console
console.log("Server listening on port 3000");

