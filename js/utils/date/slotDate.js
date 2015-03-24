define(function(require){
  require('utils/date/addDays');
  require('utils/date/addMinutes');

  var myDate = require('utils/date/prettyDate');

  var slotDate = Object.create(myDate);

  slotDate.startHour = 21;
  
  slotDate.startMinute = 30;

  slotDate.minutesBetween = 2;

  slotDate.nextStart = function(itemTime){
    var self = this;
    return startOfNight = self.createDate(self.startHour, self.startMinute, self.nextStartDate(itemTime)); 
  }

  slotDate.nextStartDate = function(itemTime){
    var self = this;
    var startDate = itemTime.toLocaleDateString();
    if (self.startHour < itemTime.getHours()){
      startDate = itemTime.addDays(1).toLocaleDateString();
    } else if (self.startHour == itemTime.getHours()){
      if (self.startMinute < itemTime.getMinutes()){
        startDate = itemTime.addDays(1).toLocaleDateString();
      }
    }
    return startDate;
  }

  slotDate.previousStartDate = function(itemTime){
    var self = this;
    var startDate = itemTime.toLocaleDateString();
    if (self.startHour > itemTime.getHours()){
      startDate = itemTime.addDays(-1).toLocaleDateString();
    } else if (self.startHour == itemTime.getHours()) {
      if (self.startMinute > itemTime.getMinutes()){
        startDate = itemTime.addDays(-1).toLocaleDateString();
      }
    }
    return startDate;
  }

  slotDate.previousStart = function(itemTime){
    var self = this;
    return startOfNight = self.createDate(self.startHour, self.startMinute, self.previousStartDate(itemTime)); 
  };

  slotDate.calculateTime = function(slot, time){
    var self = this;
    var startOfNight = self.previousStart(time); 
    return startOfNight.addMinutes((parseInt(slot) - 1)*self.minutesBetween);
  };

  slotDate.lastAvailableSlot = function(takenSlots, inBefore){
    if (takenSlots.length == 0){
      return inBefore;
    }
    var before = inBefore || _.max(takenSlots) + 1;
    var filteredSlots = _.filter(takenSlots, function(slot){ return slot <= before; });
    if (filteredSlots.length == 0){
      return before;
    }
    var diffArray = _.difference(_.range(0, before+1), filteredSlots);
    return _.max(diffArray);
  };

  slotDate.firstAvailableSlot = function(takenSlots, inAfter){
    var after = inAfter || 1;
    if (takenSlots.length == 0){
      return 1;
    }
    var filteredSlots = _.filter(takenSlots, function(slot){ return slot >= after; });
    if (filteredSlots.length == 0){
      return inAfter;
    }

    var diffArray = _.difference(_.range(after, _.max(filteredSlots) + 2), filteredSlots);
    return _.min(diffArray);
  };

  slotDate.calculateSlot = function(itemTime){
    var self = this;
    var startOfNight = self.previousStart(itemTime);
    var msOfDifference = itemTime - startOfNight;
    return Math.floor(msOfDifference / (self.minutesBetween * 1000 * 60)) + 1;
  };

  return slotDate;

});
