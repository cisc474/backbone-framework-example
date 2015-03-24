define(function(require){
  var chai = require('chai');
  var sinonchai = require('sinonchai');
  var sinon = require('sinon');
  
  var test_require = function(){
    chai.use(sinonchai);
    var assert = chai.assert;
    var expect = chai.expect;
    var should = chai.should();

    describe("Require js is loading correctly", function(){
      it("should run tests", function(done){
        assert.equal(true, true);
        done();
      });
    });
  };

  return test_require;
});
