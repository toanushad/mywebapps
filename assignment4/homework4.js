var main = function(){
    "use strict";

    myGetData();
    myInputData();
   // myStar();   

}; 
          
var myGetData = function(){
    $.getJSON('http://localhost:3000/actors', function(data){
       
        $.each(data, function(key, val) {
              
            if(val.starred){
                $(".demo-list-action").append($("<div class='mdl-list__item'> <span class='mdl-list__item-primary-content'> <i class='material-icons mdl-list__item-avatar'>person</i> <span>"+val.name+"</span> </span> <a class='mdl-list__item-secondary-action' href='#'><i id='actorStarSymbol'class='material-icons'>star</i></a> </div>")); 
                
            } 
            else {
                $(".demo-list-action").append($("<div class='mdl-list__item'> <span class='mdl-list__item-primary-content'> <i class='material-icons mdl-list__item-avatar'>person</i> <span>"+val.name+"</span> </span> <a class='mdl-list__item-secondary-action' href='#'><i id='actorStarSymbol' class='material-icons'>star_border</i></a> </div>")); 
                
            }
        });
    })
};    

var myInputData = function(){
    $("button").on("click", function(event){
        event.preventDefault();
        
        var userInput = document.getElementById("sample3").value;
        alert(userInput);
        var newActor = {"name":userInput,
                       "starred":false};
        $.ajax({
            type: 'POST',
            contentType:"application/json",
            dataType:'json',
            data: JSON.stringify(newActor),
            url: 'http://localhost:3000/actors',
            success: function(actors){
                alert("Success actors");
                //actors.items.push(
                //    {id: "4", name: $userInput, starred: "false"}
                //);
            }
        });        
        
    });
};



    $("#actorStarSymbol").on("click",function(event){
       // event.preventDefault();

        alert("test msg2");

        var actorStar = document.getElementById("actorStarSymbol").value;

        if(actorStar == "star"){
            actorStar = "star_border";
        }
        else {
            actorStar = "star";
        }
        alert(actorStar);
    });

$(document).ready(main);
