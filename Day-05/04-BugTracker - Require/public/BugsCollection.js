  define(['backbone', 'Bug'], function(Backbone, Bug){
      var BugsCollection = Backbone.Collection.extend({
        model : Bug,
        url : "http://localhost:3000/bugs",
        getClosedCount : function(){
            return this.reduce(function(result, bug){
                return bug.get('isClosed') ? ++result : result;
            },0);
        },
        showClosed : function(){
            this.each(function(bug){
                if (bug.get('isClosed')){
                    bug.trigger('show');
                } else {
                    bug.trigger('hide');
                }
            })
        },
        showOpen : function(){
            this.each(function(bug){
                if (bug.get('isClosed')){
                    bug.trigger('hide');
                } else {
                    bug.trigger('show');
                }
            })
        },
        showAll : function(){
            this.each(function(bug){
                bug.trigger('show');
            })
        },
        removeClosed : function(){
            _.chain(this.models)
                .filter(function(bug){
                    return bug.get('isClosed');
                })
                .each(function(bug){
                    bug.destroy();
                });
        }
    });
      return BugsCollection;
  });
