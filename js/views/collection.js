define(
  function(){
  //This is a generic collection view, 
  //overwrite as you see fit
  //viewOptions, ModelView, template should all change
    return Backbone.View.extend({
      startListeners : function(){
        var self = this;
        self.listenTo(self.collection, "add", self.renderOne, self);
        self.listenTo(self.collection, "all", function(evt, data){
          self.update();
        }, self);
      },
      update: function(){
        //update the template here if you'ld like
      },
      initialize : function(options){
        this.startListeners();
        this.init(options);
        //In your view use init for the start up code
      },
      init : function(options){
        //these should be overwritten
        //viewOptions is passed to the child views
        //ModelView should be the child view class
        //template is something to insert into $el if needed
        this.viewOptions = options;
        this.ModelView = Backbone.View.extend({});
        this.template = "";
      },
      render : function(){
        var self = this;
        self.$el.html(self.template);
        self.renderAll();
        return self;
      },
      renderAll : function(){
        this.collection.each(this.renderOne, this);
      },
      renderOne : function(model){
        var self = this;
        var view = new self.ModelView(_.extend({model : model}, self.viewOptions));
        var index = self.collection.indexOf(model);
        var elClass = view.el.tagName.toLowerCase()+"."+view.el.className;
        var numViews = self.$el.find(elClass).length;
        var jqselect = function(myindex){
            return view.el.tagName.toLowerCase() +"."+view.el.className +":eq("+Math.max(0, myindex)+")";
        };
        if (numViews == 0){
          self.$el.append(view.render().el);
        } else if (index == 0){
          self.$el.find(jqselect(0)).before(view.render().el);
        } else {
          self.$el.find(jqselect(index-1)).after(view.render().el);
        }

        view.listenTo(self, 'close', function(){
           this.remove();
           this.close();
           this.stopListening();
        }, view);
        view.listenTo(model, 'remove destroy', function(){
           this.remove();
           this.close();
           this.stopListening();
        }, view);
        self.update();
      },
      onClose : function(){
        this.trigger('close');
      }
    });
  }
);
