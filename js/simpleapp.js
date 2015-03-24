define(function(require){
  var Backbone = require('backbone');
  var Serializer = require('loaders/serialize');
  var AppController = Backbone.View.extend({

    initialize: require('loaders/init'),
    
    serializeData : Serializer.serialize,
    
    unserializeData : Serializer.unserialize,

    browserMessageHandler : require('loaders/browserMessageHandler'),

    runTests : require('loaders/runTests'),

    routeDirect : require('loaders/routeDirect')

  });

  return AppController;
});
