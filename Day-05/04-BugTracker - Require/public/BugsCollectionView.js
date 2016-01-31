define(['jquery', 'backbone', 'BugView','text!appTemplate.html'], function($, Backbone, BugView, appTemplate){
    var BugsCollectionView = Backbone.View.extend({
        initialize : function(){
            _.bindAll(this, "displayBug", "updateStats");
            this.listenTo(this.collection, "add", this.displayBug);
            this.listenTo(this.collection, "update", this.updateStats)
            this.listenTo(this.collection, "change", this.updateStats)
        },
        updateStats : function(){

            var totalBugs = this.collection.length;
            var totalClosedBugs = this.collection.getClosedCount();
            this.$("div.stats > span.open").html(totalBugs);
            this.$("div.stats > span.closed").html(totalClosedBugs);
        },
        events : {
            "click #btnAdd" : "addNewBug",
            "click #btnRemoveClosed" : "removeClosedBugs"
        },
        removeClosedBugs : function(){
            this.collection.removeClosed();
        },
        addNewBug : function(){
            var newBugName = this.$("#txtBugName").val();
            this.collection.create({name : newBugName});
        },
        displayBug : function(bug){
                new BugView({
                    model : bug
                })
                .render()
                .$el
                .appendTo(this.$("#olBugList"));
        },
        render : function(){
            this.$el.html(appTemplate).appendTo(document.body);
            return this;
        }
    });
    return BugsCollectionView;
});
