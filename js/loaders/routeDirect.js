define(function(require){

   var pathParser = function(path){
      return Array.prototype.slice.call(path);
   }
   
   var pathApply = function(path, routes, context){
      var pathArray = pathParser(path);
      var primary = pathArray[0];
      if (routes.hasOwnProperty(primary)){
         routes[primary].apply(context, pathArray.slice(1));
      } else {
         routes["default"].apply(context, pathArray.slice(1));
      }
   }
   
   return function(path){
      //NOTE PLEASE that this references AutoRouter
      //Which has an app property
      var oApp = this.app;
      var pathRoutes = _.extend(require('urls'), {
         "default" : require('screens/home')
      });
      pathApply(arguments, pathRoutes, oApp);
   };
});
