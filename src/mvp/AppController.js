jab.AppController = function() {
    var appController = {};

    appController.views = {};
    appController.presenters = {};

    appController.getView = function(name) {
        return this.views[name]();
    };
    
    appController.constructor = function() {
        
    };

    appController.constructor.prototype = appController;

    return appController.constructor;
}();


