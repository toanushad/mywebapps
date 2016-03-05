var $newUL= $("<ul>");
var $newParagraphElement= $("<p>").text("this is a paragraph");

$("footer").append($newParagraphElement);

var $newFristChild=$("<li>").text("First List Item");
var $newSecondChild=$("<li>").text("Second List Item");
var $newThirdChild=$("<li>").text("Third List Item");

$newFristChild.appendTo($newUL);
$newUL.append($newSecondChild);
$newUL.append($newThirdChild);

$("main").append($newUL);
