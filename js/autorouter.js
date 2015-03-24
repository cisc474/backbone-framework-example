define([
    'jquery', 'underscore', 'backbone'], 
function($, _, Backbone) {
    var AutoRouter = Backbone.Router.extend({
      constructor: function(options){
          Backbone.Router.prototype.constructor.call(this, options);
          var that = this;
          that.app = options.app;
          if (this.autoRoutes){
            that.processAutoRoutes(options.app, that.autoRoutes);
          }
      },

      processAutoRoutes: function(app, autoRoutes){
          var method, methodName;
          var route, routesLength;
          var routes = [];
          var router = this;

          for(route in autoRoutes){
            routes.unshift([route, autoRoutes[route]]);
          }

          routesLength = routes.length;
          for (var i = 0; i < routesLength; i++){
            route = routes[i][0];
            methodName = routes[i][1];
            method = app[methodName];
            router.route(route, methodName, method);
          }
      }
    });
    
    return AutoRouter;
});
