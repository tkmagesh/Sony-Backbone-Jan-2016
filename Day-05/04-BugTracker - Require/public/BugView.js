define(['jquery','handlebars', 'backbone','underscore', 'text!bugTemplate.html'], function($, Handlebars, Backbone, _, templateHtml){
    var BugView = Backbone.View.extend({
        tagName : 'li',
        templateId : "#bugTemplate",
        initialize : function(){
            _.bindAll(this, "render", "remove");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, "destroy", this.remove);
            this.listenTo(this.model, "hide", this.hide);
            this.listenTo(this.model, "show", this.show);
            this.isEditing = false;
        },
        hide : function(){
            this.$el.hide();
        },
        show : function(){
            this.$el.show();
        },
        remove : function(){
            this.$el.remove();
        },
        events : {
            "click #btnEdit,#btnCancel" : "toggleEdit",
            "click #btnSave" : "saveBug",
            "click span.bug" : "toggleBug"
        },
        toggleBug : function(){
            this.model.save({isClosed : !this.model.get('isClosed')});
        },
        saveBug : function(){
            this.isEditing = false;
            this.model.save({name : this.$("#txtBugName").val()});
        },
        toggleEdit : function(){
            this.isEditing = !this.isEditing;
            this.render();
        },
        getTemplateFn : (function(){
            var _templateFn = null;
            return function(templateHtml){
                if (!_templateFn)
                    _templateFn = Handlebars.compile(templateHtml)
                return _templateFn;
            };
        })(),

        render : function(){
            var viewModel = {
                isEditing : this.isEditing,
                bug : this.model.toJSON()
            };
            var templateFn = this.getTemplateFn(templateHtml);
            this.$el.html(templateFn(viewModel));
            return this;
        }
    });
    return BugView;
})
