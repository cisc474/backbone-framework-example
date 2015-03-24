define(function(require){
   var messageHandler = function(event){
          var oApp = this;
          var payload = oApp.unserializeData(event.data);
          payload.event = event;
          if (payload.hasOwnProperty("messagename")){
            oApp.mediator.trigger(payload.messagename, payload);
          }
          else {
            console.log("no messagename "+event.data);
          }
   }; //end messageHandler

   return messageHandler;
});//end module definition
