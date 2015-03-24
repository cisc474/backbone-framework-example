define(function(){
  return {
    events: {
      "drop" : "drophandle",
      "dragstart" : "dragstart",
      "dragend" : "dragend",
      "dragenter" : "dragenter",
      "dragover" : function(ev){ ev.preventDefault(); return false;},
      "dragleave" : "dragleave"
    }, 
    listener : function(mediator){
      mediator.dragData = mediator.dragData || {};
      mediator.listenTo(mediator, "dragstart", function(data){
        this.dragData[data.module] = data;
      }, mediator);
      mediator.listenTo(mediator, "dragend", function(data){
        delete this.dragData[data.module];
      }, mediator);
      mediator.listenTo(mediator, "askdrag", function(data){
        var module = data.module;
        var responseEvent = data.responseEvent;
        this.trigger(responseEvent, this.dragData[module]);
      }, mediator);
    },
    handlers : {
      //The following things are to be over-written if needed, in particular
      //dropModel and dropCollection
      module : "abstract",
      dragStartClass: "drag-start",
      dragEnterClass: "drag-enter",
      dropModel : function(model){
        console.log("model added", model);
        console.log("to ",this);
      },
      dropCollection : function(collection){
        console.log("collection added", collection);
        console.log("to ",this);
      },
      
      drophandle : function(evt){
        var self = this;
        evt.preventDefault();
        var responseEvent = self.module + ":telldrag";
        self.listenToOnce(self.mediator, responseEvent, function(data){
          if (data.model){
            self.dropModel(data.model);
          } else if (data.collection){
            self.dropCollection(data.collection);
          }
        }, self);
        self.mediator.trigger("askdrag", {module: self.module, responseEvent: responseEvent});
        //console.log("drophandle",evt);
        return false;
      },
      dragstart : function(evt){
        var self = this;
        var data = {module: self.module};
        if (this.model){
          data.model = self.model;
        } else if (this.collection){
          data.collection = self.collection;
        }
        this.$el.addClass(self.dragStartClass);
        this.mediator.trigger("dragstart", data);
      },
      dragend : function(evt){
        var self = this;
        this.mediator.trigger("dragend", {module: self.module});
        setTimeout(function(){self.$el.removeClass(self.dragStartClass)}, 20);
        //console.log("dragend",evt);
      },
      dragenter : function(evt){
        var self = this;
        setTimeout(function(){self.$el.addClass(self.dragEnterClass)}, 10);
        //console.log("dragenter",evt);
      },
      dragleave : function(evt){
        this.$el.removeClass(this.dragEnterClass);
        //console.log("dragleave",evt); 
      }
    }
  }
});
