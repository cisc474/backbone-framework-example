define(
  function(require){

  var ModelView = require('views/boilerplate');
  var CollectionView = require('views/collection');
  //var DragClass = require('utils/drags');

  return CollectionView.extend(
    //_.extend(DragClass.handlers, 
    {
    tagName : "div",
    module : "MYCOLLECTION",
    className : "COLLECTION-CLASS",
    init: function(options) {
      this.mediator = options.mediator;
      this.ModelView = ModelView;
      this.viewOptions = options;
      this.template = "";
    },
    events : {},
      /*_.extend(DragClass.events , CollectionView.events || {}),
    dragstart : function(evt){
      //no-op to prevent collection from being "dragged"
    },
    dropModel : function(model){
    },*/
    update : function(){
    }
  }
//)
  );
});
