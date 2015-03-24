define(function(){
  Date.prototype.addMinutes = function(mins)
  {
    var dat = new Date(this.valueOf());
    dat.setTime(dat.getTime() + mins*60*1000);
    return dat;
  };
});
