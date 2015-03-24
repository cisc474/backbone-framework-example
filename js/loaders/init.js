define( function(require)
    {
      var init = function(option){
        var oApp = this;

        var AppRouter = require('simplerouter');

        var loadPanesAndPaneUtilities = require('loaders/paneLoad');

        loadPanesAndPaneUtilities(oApp);

        //This is the global events mediator that should be the only method low level objects 
        //have to communicate with high level objects.  
        //This is to create a loosely-coupled rain cycle hierarchy 
        //the trickle down order is: this controller, views, collections, models
        this.mediator = _.extend(Backbone.Events, {});           

        //pass messages to browserMessageHandler
        if(window.addEventListener){
          addEventListener("message", oApp.browserMessageHandler, false);
        } else{
          attachEvent("onmessage", oApp.browserMessageHandler);
        }

        //collect children windows
        this.childWindows = [];
        this.listenTo(this.mediator, 'newchild', function(data){
          oApp.childWindows.push(data.event.source);
        });

        this.listenTo(this.mediator, 'removechild', function(data){
          oApp.childWindows.splice(oApp.childWindows.indexOf(data.event.source), 1);
        });

        //redirect all browser messages to parent window and children windows
        this.listenTo(this.mediator, 'browser', function(data){
          var sData = oApp.serializeData(data);
          var sOrigin = window.location; 
          if (window.opener != null){
            window.opener.postMessage(sData, sOrigin);
          }

          _.each(oApp.childWindows, function(win){
            win.postMessage(sData, sOrigin);
          });
        });

        //alerts existence to parent window
        this.mediator.trigger('browser', {messagename: "newchild"});
        $(window).bind('beforeunload', function(){
          oApp.mediator.trigger("browser", {messagename: "removechild"});
        });

        //The AppRouter is passed this app so that it can be merely a pointer to app methods
        //See the router and autorouter to see the benefits
        //If we run this twice we will get an error but I want the tests to run it separate
        this.appRouter = new AppRouter({app : this});
        
        try {
          Backbone.history.start();
        } 
        catch(e) {
          console.log(e);
          console.log("History did not start for some reason");
        }
      } //end init function

      return init;
    }); //end define module
