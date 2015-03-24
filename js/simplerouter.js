define([
    'autorouter'
], function(AutoRouter){
        var AppRouter = AutoRouter.extend({
            autoRoutes: {
                ":page" : "routeDirect",
                ":page/:object" : "routeDirect",
                ":page/:object/:action" : "routeDirect",
                "": "routeDirect"
            }
        });

        return AppRouter;
});
