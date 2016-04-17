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

app.use(bodyParser.urlencoded({
    extended:true
}));


// connect to the linksandclicks data store in MongoDB database
mongoose.connect('mongodb://localhost/linksandclicks');

// create schema for link object
var LinkSchema = mongoose.Schema({
    "title": String,
    "link": String,
    "click": Number
});

// build a data model object
var LinkDetails = mongoose.model("LinkDetails", LinkSchema);

// create two mongoose objects of the Link model type
var link1 = new LinkDetails({
    "title":"Node.js",
    "link":"https://nodejs.org/en/",
    "click":5
});
var link2 = new LinkDetails({
    "title":"CPSC 473",
    "link":"https://sites.google.com/site/cpsc473",
    "click":3
});

// save these links to our data store
link1.save(function (err){
    if(err !== null){
        // object was not saved
        console.log(err);
    } else {
        console.log("The link1 object was saved!");
    }
});

link2.save(function (err){
    if(err !== null){
        // object was not saved
        console.log(err);
    } else {
        console.log("The link1 object was saved!");
    }
});

app.get("/links", function (req, res){
    // get links from database to console
    LinkDetails.find({},function(err, savedLinks){
        if(err !== null){
            console.log("ERROR: " + err);
            return;
        }
        res.status(200).json(savedLinks);
    });  
});

// POST to /links
app.post("/links", function(req, res){
    // save POST parametrs
    var newTitle = req.body.title;
    var newLink = req.body.link;
    // add a new link object to the list with title, link, and click count to zero
    var newDoc = {
        "title": newTitle,
        "link": newLink,
        "click":0
    };
    LinkDetails.insert(newDoc);
    res.end();
});


// GET to /click/:title
app.get("/click/:title", function(req,res){
    // increment the click count and redirect to the link to e.g. 
    // GET /click/CPSC%20473 Should increment clicks to 4 and redirect to
    // https://sites.google.com/site/cpsc473
    LinkDetails.findOne({"title":req.params.title}, function(err, clickedLink){
        if(err !== null){
            consolelog("ERROR " + err);
            return;
        }
        LinkDetails.update(
            // increment count value by 1
            { $inc: { click: 1 } }
        );
        console.log(clickedLink.link);
        res.redirect(clickedLink.link);
    });
});
