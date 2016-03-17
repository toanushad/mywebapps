var main = function(){
    "use strict";

    myGetData();
    myInputData();

}; 
          
var myGetData = function(){
    $.getJSON('http://localhost:3000/actors', function(data){
       
        $.each(data, function(key, val) {
              
            if(val.starred){
                $(".demo-list-action").append($("<div class='mdl-list__item'> <span class='mdl-list__item-primary-content'> <i class='material-icons mdl-list__item-avatar'>person</i> <span>"+val.name+"</span> </span> <a class='mdl-list__item-secondary-action' id ='actorStar' href='#'><i id='actorStarSymbol'class='material-icons'>star</i></a> </div>")); 
                
            } 
            else {
                $(".demo-list-action").append($("<div class='mdl-list__item'> <span class='mdl-list__item-primary-content'> <i class='material-icons mdl-list__item-avatar'>person</i> <span>"+val.name+"</span> </span> <a class='mdl-list__item-secondary-action' id='actorStar' href='#'><i id='actorStarSymbol' class='material-icons'>star_border</i></a> </div>")); 
                
            }
        });
    })
};    

var myInputData = function(){
    $("button").on("click", function(event){
        event.preventDefault();
        
        var userInput = document.getElementById("sample3").value;
        var newActor = {"name":userInput,
                       "starred":false};
        $.ajax({
            type: 'POST',
            contentType:"application/json",
            dataType:'json',
            data: JSON.stringify(newActor),
            url: 'http://localhost:3000/actors',
            success: function(actors){
            }
        });        
        
    });
};


$("body").delegate(".mdl-list__item-secondary-action","click",function(){
    // event.preventDefault();
    
   // var x =  document.getElementById("actorStarSymbol").innerHTML;
    var i = $(this).find("i");
    var val = $(i).text();
    alert(val);
   /* var x = $(".mdl-list__item-secondary-action").text();
    alert(x);*/
    
    if(val == "star"){
       val = "star_border";
    }
    else {
        val = "star";
    }
    //$.ajax({
    //   type: 'PUT',
    //   contentType:"application/json",
    //   dataType:'json',
    //   data: JSON.stringify(newActor),
    //   url: 'http://localhost:3000/actors',
    //   success: function(actors){
    //       alert("Success actors");
    //       //    {id: "4", name: $userInput, starred: "false"}
    //   }
    //);
});

$(document).ready(main);
