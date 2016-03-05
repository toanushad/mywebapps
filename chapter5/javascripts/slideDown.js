var main = function(){
    "use strict";
    
    var $content = $("<div>Hello World!</div>").hide();
    var $moreContent = $("<div>Goodbye World!</div>").hide();

    $("body").append($content);
    
    $content.slideDown(2000, function(){
        $("body").append($moreContent);
    
        $moreContent.fadeIn();

    });
};


$(document).ready(main);
