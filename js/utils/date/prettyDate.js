define(function(){
  var myDate = Object.create(Date);

  myDate.createDate = function(hour, minute, date){
    var temp = new Date(date);
    temp.setHours(hour, minute);
    return _.extend(temp, myDate);
  }

  myDate.todaysDate = function(){
    var temp = new Date();
    return temp.toLocaleDateString();
  };

  myDate.prettyDate = function(date){
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  return myDate;
});
