var ToDo = function(data) {
    this.description = ko.observable(data.description);
    this.tags = ko.observableArray(data.tags);
}

var TabSection = function (name, selected) {
    this.name = name;
    this.isSelected = ko.computed(function () {
        return this === selected();
    }, this);
};

var ViewModel = function() {
    var self = this;

    self.viewTab = ko.observable();

    self.allTabs = ko.observableArray([
        new TabSection('Newest', self.viewTab),
        new TabSection('Oldest', self.viewTab),
        new TabSection('Tags', self.viewTab),
        new TabSection('Add', self.viewTab)
    ]);
    
    //inialize to the first tab section
    self.viewTab(self.allTabs()[0]);

    self.todos = ko.observableArray([]);
    self.newDescription = ko.observable("");
    self.newTags = ko.observable("");
    self.tagsTabData = ko.observable([]);

    // TO-DO 
}

ko.applyBindings(new ViewModel());
