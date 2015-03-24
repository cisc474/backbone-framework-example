define(function(){
  Date.prototype.addDays = function(days)
  {
    var dat = new Date(this.valueOf());
    dat.setTime(dat.getTime() + days*24*3600*1000);
    return dat;
  };
});
