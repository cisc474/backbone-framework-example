define(function(){
   return function(){
          var oApp = this;
          oApp.$el.empty();
          oApp.$el.attr('id','mocha');
          require(['tests/tester'], function(Tester){
            var testRunner = new Tester();
            testRunner.run();
          });
   };
});
