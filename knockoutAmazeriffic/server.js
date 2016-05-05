var express = require("express"),
    app = express(),
    http = require("http"),
    bodyParser = require("body-parser"),
    // import the monggose library
    mongoose = require("mongoose");

var server = http.createServer(app);
//var io = require("socket.io").listen(server);


app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB!');
    }
});

// create mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

var server = http.createServer(app);
//io.listen(server);

// listen for requests
server.listen(3000, function() {
    console.log('Express server listening on port 3000');
});

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
	res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err, result) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    res.send("ERROR");
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    res.send("ERROR");
		}
		res.json(result);
	    });
	}
    });
});
