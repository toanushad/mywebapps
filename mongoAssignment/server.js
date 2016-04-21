var http = require("http"),
    express = require("express"),
    bodyParser = require("body-parser"),
    // import mongoose library
    mongoose = require("mongoose"),
    app;

// create an Express-powered HTTP server
// and have it listen on port 3000
app = express();
http.createServer(app).listen(3000);

app.use(bodyParser.json());


// connect to the linksandclicks data store in MongoDB database
mongoose.connect('mongodb://localhost/linksandclicks');

// create schema for link object
var LinkSchema = mongoose.Schema({
    "title": String,
    "link": String,
    "clicks": Number
});

// build a data model object
var LinkDetails = mongoose.model("LinkDetails", LinkSchema);

// create two mongoose objects of the Link model type
var link1 = new LinkDetails({
    "title": "Node.js",
    "link": "https://nodejs.org/en/",
    "clicks": 5
});
var link2 = new LinkDetails({
    "title": "CPSC 473",
    "link": "https://sites.google.com/site/cpsc473",
    "clicks": 3
});

// save these links to our data store
link1.save(function(err) {
    if (err !== null) {
        // object was not saved
        console.log(err);
    } else {
        console.log("The link1 object was saved!");
    }
});

link2.save(function(err) {
    if (err !== null) {
        // object was not saved
        console.log(err);
    } else {
        console.log("The link2 object was saved!");
    }
});

app.get("/links", function(req, res) {
    // get links from database to console
    LinkDetails.find({}, function(err, savedLinks) {
        if (err !== null) {
            console.log("ERROR: " + err);
            return;
        }
        res.status(200).json(savedLinks);
    });
});

// POST to /links
app.post("/links", function(req, res) {
    // save POST parametrs
    var newTitle = req.body.title;
    var newLink = req.body.link;
    // add a new link object to the list with title, link, and click count to zero
    console.log(req.body);
    var newDoc = new LinkDetails({
        "title": newTitle,
        "link": newLink,
        "clicks": 0
    });
    newDoc.save(function(err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // return all links 
            LinkDetails.find({}, function(err, result) {
                if (err !== null) {
                    // link is not saved
                    res.send("ERROR");
                }
                res.status(200).json(result);
            });
        }
    });
});


// GET to /click/:title
app.get("/click/:title", function(req, res) {
    // increment the click count and redirect to the link to e.g. 
    // GET /click/CPSC%20473 Should increment clicks to 4 and redirect to
    // https://sites.google.com/site/cpsc473
    var titleparam = req.params;
    console.log(titleparam);
    LinkDetails.update(titleparam,
        // increment count value by 1
        {
            $inc: {
                clicks: 1
            }
        }
    );
    LinkDetails.find({
        "title": titleparam.title
    }, function(err, clickedLink) {
        if (err !== null) {
            consolelog("ERROR " + err);
            return;
        }

        console.log(clickedLink[0].link);
        res.redirect(clickedLink[0].link);
    });
});
