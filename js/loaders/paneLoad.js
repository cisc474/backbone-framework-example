define(["text!templates/init.html",'jqueryui', 'jquerylayout'], function(initialTemplate){
  return function(oApp){
    oApp.$el.html(initialTemplate);

    oApp.classArray = [
      'mainPane', 'leftPane', 'bottomPane', 'rightPane', 
      'topPane', 'navPane', 'modalPane'];
    oApp.paneViews = {};

    oApp.twiddleClasses = function(newClass){
      oApp.$el.html(initialTemplate);
      _.each(oApp.classArray, function(cname){
        var mytarget = oApp.$el.find('.'+cname);
        mytarget.addClass(cname + ' ' + newClass);
      });
    };

    oApp.paneLayout = function(panelOptions){
        $('.leftPane,.mainPane,.rightPane,.topPane,.bottomPane').wrapAll(
              '<div id="splitview"></div>');
        $("#splitview").css('height',window.innerHeight);
        $("#splitview").css('width',"100%");

        $('.leftPane').addClass('ui-layout-west');
        $('.rightPane').addClass('ui-layout-east');
        $('.topPane').addClass('ui-layout-north');
        $('.bottomPane').addClass('ui-layout-south');
        $('.mainPane').addClass('ui-layout-center');
            
        var standardOptions = {
          //defaults: {resizable: true, slidable: true},
          applyDefaultStyles : true,
          onresize : function(){
            oApp.mediator.trigger('resize:panes');
          }
        };
        var inOptions = _.extend(standardOptions, panelOptions);
        var mylayout = $("#splitview").layout(inOptions); 
        
        $(window).on('resize', function(){
          $("#splitview").css('height',window.innerHeight);
          $("#splitview").layout(inOptions);
        });
        
        setTimeout( function(){
          mylayout.resizeAll();
        }, 5);

        return mylayout;
      };//end paneLayout function

    oApp.showView = function(selector, view){
      oApp.hideView(selector);
      oApp.paneViews[selector] = view;
      oApp.$el.find(selector).html(view.el);
    };//end showView

    oApp.hideView = function(selector){
      if(oApp.paneViews[selector]){
        oApp.paneViews[selector].close();
        delete oApp.paneViews[selector];
      }
      $(selector).empty();
    };//end hideView

    oApp.showViews = function(panelInfo){
      _.each(oApp.classArray, function(cname){
        var cssClass = "."+cname;
        if (panelInfo.hasOwnProperty(cssClass)){
          oApp.showView(cssClass, panelInfo[cssClass].render());
        }
        else {
          oApp.hideView(cssClass);
        }
      });
    };//end showViews

  };//end paneLoad function
});//end define statement
