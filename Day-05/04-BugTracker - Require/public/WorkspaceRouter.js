define(['backbone'], function(Backbone){
    var WorkspaceRouter = Backbone.Router.extend({
        routes : {
            "filter/:state" : "filterBugs",
            "/*" : "showAll"
        },
        showAll : function(){
            window.bugs.showAll();
        },
        filterBugs : function(state){

            if (state === 'closed'){
                window.bugs.showClosed();
            } else {
                window.bugs.showOpen();
            }
            console.log(bugs);
        }

    });
    return WorkspaceRouter;
});
