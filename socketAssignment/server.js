var express = require("express"),
    app = express(),
    http = require("http"),
    bodyParser = require("body-parser"),
    // import the monggose library
    mongoose = require("mongoose"),
    io = require("scoket.io");
  
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// create mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

var server = http.createServer(app);
io.listen(server);

// listen for requests
server.listen(3000, function(){
    console.log('Express server listening on port 3000');
});

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos){
        if(err !== null){
            console.log("ERROR: " + err);
            return;
        }
        res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    // the object is now stored in req.body
    console.log(req.body);
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
        });

    newToDo.save(function(err, result){
        if(err !== null){
            console.log(err);
            res.send("ERROR");
        } else {
            // display all the todo iems 
            ToDo.find({}, function(err, result){
                if(err !== null){
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});

io.on("connection", function (socket){
    console.log("socket connection");
    socket.on("send new todo", function(newToDo){
        // broadcast to everyone except for the socket that starts it
        socket.broadcast.emit("updatedToDoList", newToDo);
    });  
});

