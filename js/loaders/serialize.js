define(function(){
  return {
    serialize : function(oIn){
      return JSON.stringify(oIn, null, 2);
    }, 
    unserialize : function(sIn){
      return JSON.parse(sIn);
    }
  }
});
