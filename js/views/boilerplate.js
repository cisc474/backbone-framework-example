define(function(require){
  return Backbone.View.extend({
    initialize: function(options){

    }, 
    render: function(){
      var self = this;
      this.$el.html("Something here");
      return self;
    }
  });//end view declaration
});//end define
