require(['jquery', 'backbone', 'WorkspaceRouter', 'BugsCollection', 'BugsCollectionView'], function($, Backbone, WorkspaceRouter, BugsCollection, BugsCollectionView){
            $(function(){
                window.bugs = new BugsCollection();
                new WorkspaceRouter();
                new BugsCollectionView({
                    collection : bugs,
                }).render().$el.appendTo(document.body);
                bugs.fetch();
                Backbone.history.start();
            })
        })
