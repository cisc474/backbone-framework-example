define(function(require){
   
  var Toolbox = require('jstoolbox');
  require('mocha');

  var TestRunner = Toolbox.Base.extend({
    setaside : function(){
    },
    unit : function(){
      require('tests/require')();
    },
    run : function(){
      mocha.setup('bdd');
      this.unit();
      if (window.mochaPhantomJS) {
        mochaPhantomJS.run(); }
      else { mocha.run(); }
    }
  });

  return TestRunner;
});
