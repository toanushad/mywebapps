var express = require("express"),
     app = express(),
     http = require("http"),
     bodyParser = require("body-parser"),
     // import the monggose library
     mongoose = require("mongoose");
    
 var server = http.createServer(app);
 var io = require("socket.io").listen(server); 

  
 app.use(express.static(__dirname + "/client"));
 app.use(bodyParser.json());
 
// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic', function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to MongoDB!');
    }
});
 
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
 
 
 io.sockets.on("connection", function (socket){
     console.log("socket connection");
     
     ToDo.find({}, function(err, result){
        if(err !== null){
            console.log("Got Error!");
            throw err;
        } else {
            console.log("Displaying todo results from database!");
            socket.emit("todos from db", result);
        }
    });
     
     socket.on("addTodos", function(newToDo){

         console.log("I am sending the todo");
         var saveNewToDo = new ToDo({"description": newToDo.description, "tag": newToDo.tags});
         saveNewToDo.save(function (err, result){
             if (err != null){
                 socket.emit(err);
             } else {
                 ToDo.find({}, function(err, result){
                     if(err !== null){
                         console.log("Got Error!");
                         socket.emit(err);
                     } else {
                         console.log(result);
                         socket.emit("todos from db", result);
                     }
                 });
             }
         });
     });
});     

