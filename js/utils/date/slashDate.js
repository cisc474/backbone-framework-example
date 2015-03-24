define(function(){

    var padTwo = function(numberString){
      var num = parseInt(numberString);
      if (num < 10 && num > -1){
        return "0" + num.toString();
      } else {
        return num.toString();
      }
    };

    return { slashToDash : function(value){
              var datearr = value.split('/');
              return datearr[2]+'-'+padTwo(datearr[0])+'-'+padTwo(datearr[1]);
    },

    dashToSlash : function(value){
              var datearr = value.split('-');
              return datearr[1]+"/"+datearr[2]+"/"+datearr[0];
    } };

});
