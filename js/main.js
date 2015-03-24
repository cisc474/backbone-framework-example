//main.js
requirejs.config({
    shim: {
        underscore: {
            exports: '_'
        },        
        jquery: {
            exports: '$' 
        },  
        jstoolbox: {
            deps: ['underscore', 'jquery'],
            exports: 'Toolbox'
        }, 
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }, 
        stickit : {
            deps : ["backbone"]
        },
        sinonchai: {
            deps: ['chai'],
            exports: 'sinonChai'
        },
        'libs/jquery.easyui.min' : {
            deps : ['jquery']
        },
        jqueryui : {
            deps : ['jquery']
        },
        bootstrap : {
            deps : ['jquery']
        },
        jquerylayout : {
            deps : ['jquery']
        },
        sinon: {
            deps: ['sinonchai'],
            exports: 'sinon'
        },  
        chaijquery: {
            deps: ['chai', 'mocha'],
            exports: 'chaiJquery'
        }
    },
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
        jqueryui: './libs/jquery-ui-latest',//'//layout.jquery-dev.net/lib/js/jquery-ui-latest',
        jquerylayout: './libs/jquery.layout-latest',//'//layout.jquery-dev.net/lib/js/jquery.layout-latest',
        jstoolbox: './libs/toolbox',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
        crypto: '//crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5',
        bootstrap : '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min',
        templates: '../templates',
        mocha: '//cdnjs.cloudflare.com/ajax/libs/mocha/1.13.0/mocha',
        chai: './libs/chai',
        sinonchai: './libs/sinon-chai',
        sinon: './libs/sinon',
        stickit: './libs/backbone.stickit',
        chaijquery: './libs/chai-jquery',
        collections: './collections',
        libs: './libs',
        models: './models',
        tests: './tests'
    }
});

//require.js
require(["backbone", "simpleapp"], function(Backbone, App){

    var sUrl = 
      (typeof sOSServerName != "undefined" && sOSServerName === "darwin" )?
        "http://localhost/api/public": 'http://api.novocin.webfactional.com';

    $.ajaxPrefilter( function( options, originalOptions, jgXHR) {
        options.url = sUrl + options.url;
        options.crossDomain = options.crossDomain || true;
        options.xhrFields = options.xhrFields || {withCredentials:true};
    });

    $.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
      });
      return o;
    };

    Backbone.ajax = function(){
        var error = arguments[0].error;
        arguments[0].error = function(resp) {
          if (resp.status == 305) {
            var guid = resp.responseJSON.guid;
            var url = "/output/"+guid;
            console.log('error trying again at '+url);
            originalArgs[0].url = url;
            originalArgs[0].type="GET";
            return Backbone.ajax(originalArgs[0]);
          }
          else if (resp.status == 503){
            console.log("trying again in some seconds");
            console.log(originalArgs);
            setTimeout(function() {
              return Backbone.ajax(originalArgs[0]);
            }, (5*1000));
          } else {
              if (error) error(resp);
          }
        }
        var originalArgs = arguments;
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    }

    Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
      this.stopListening();
      if (this.onClose){
        this.onClose();
      }
    }

    Backbone.View.prototype.removeBSClass = function(classPrefix){
      var gridSizes = _.range(1,13);
      var self = this;
      _.each(gridSizes, function(iSize){
        var thisClass = classPrefix+iSize.toString();
        self.$el.find("."+thisClass).addClass("n"+thisClass).removeClass(thisClass);
      });
    }

    Backbone.View.prototype.addBSClass = function(classPrefix){
      var gridSizes = _.range(1,13);
      var self = this;
      _.each(gridSizes, function(iSize){
        var thisClass = classPrefix+iSize.toString();
        self.$el.find(".n"+thisClass).addClass(thisClass).removeClass('n'+thisClass);
      });
    }

    Backbone.View.prototype.forceLarge = function(){
      this.addBSClass('col-lg-');
      this.addBSClass('col-md-');
      this.addBSClass('col-sm-');
      this.addBSClass('col-xs-');
    }

    Backbone.View.prototype.forceMedium = function(){
      this.removeBSClass('col-lg-');
      this.addBSClass('col-md-');
      this.addBSClass('col-sm-');
      this.addBSClass('col-xs-');
    }
    
    Backbone.View.prototype.forceSmall = function(){
      this.removeBSClass('col-lg-');
      this.removeBSClass('col-md-');
      this.addBSClass('col-sm-');
      this.addBSClass('col-xs-');
    }
        
    Backbone.View.prototype.forceXSmall = function(){
      this.removeBSClass('col-lg-');
      this.removeBSClass('col-md-');
      this.removeBSClass('col-sm-');
      this.addBSClass('col-xs-');
    }

    Backbone.View.prototype.BSResponse = function(){
      var self = this;
      var iWidth = this.$el.outerWidth();
      if (iWidth < 768){
        self.forceXSmall();
      } else if (iWidth < 992) {
        self.forceSmall();
      } else if (iWidth < 1200) {
        self.forceMedium();
      } else {
        self.forceLarge();
      }
    }

    if (typeof Object.create !== 'function') {
      Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
      };
    }
    //newObject = Object.create(oldObject);

    AppClass = App;
    var app = new AppClass({ el : 'body'});
});

