define(['backbone'], function(Backbone){
    var Bug = Backbone.Model.extend({
       defaults : {
            name : '',
            isClosed : false
       }
    });
    return Bug;
})
