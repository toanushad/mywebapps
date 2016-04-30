var main = function() {

    // Here's the dataModel with some properties
    var ViewModel = function(comments) {
        //myComment = "The cool";
        this.myComment = ko.observable("");

        this.allComments = ko.observableArray([{
            newCommentLine: "This is the first comment!"
        }, {
            newCommentLine: "Here's the second one!"
        }]);
        //
        this.commentToAdd = function() {
            if (this.myComment() != "") {
                this.allComments.push({
                    newCommentLine: this.myComment()
                });
                this.myComment("");
            }
        }.bind(this);
    };

    ko.applyBindings(new ViewModel()); // Bind the viewModel to the view

};

$(document).ready(main);
