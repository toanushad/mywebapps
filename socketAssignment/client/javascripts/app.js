var main = function (toDoObjects) {
    "use strict";

    var socket = io.connect('http://localhost:3000');
   
    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                //for (i = toDos.length-1; i >= 0; i--) {
                   // $content.append($("<li>").text(toDos[i]));
                //}
                socket.on("todos from db", function(dbList){
                    console.log("db list are: ");
                    // loop through the list
                    for (i = dblist.length-1; i >=0; i--){
                       $content.append($("<li>").text(dbList[i])); 
                    }
                });
                
                // display new todo emited from the server.js
                socket.on("new Todo list", function(newTodoList){
                    if($element[0].className == "active"){
                        $content.append($("<li>").text(newTodoList));
                        //toDoObjects.push(list);
                        console.log(newTodoList);
                    }
                });
                
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                   $content.append($("<li>").text(todo));
                });
                //socket.on("new Todo list", function(newTodoList){
                //    if($element[0].className == "active"){
                //        $content.append($("<li>").text(newTodoList));
                //        //toDoObjects.push(list);
                //        console.log(newTodoList);
                //    }
                //
                //});
                               
            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        // create the new to-do item
                        newToDo = {"description":description, "tags":tags};
                    // Emit the newToDo
                    socket.emit('send new Todo from client', newToDo);
                    
                    //toDoObjects.push({"description":description, "tags":tags});

                    // here we'll do a quick post to our todos route
                    $.post("todos", newToDo, function (response) {
                        console.log("We posted and the server responded!");
                        console.log(response);
                    });
                    
                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
