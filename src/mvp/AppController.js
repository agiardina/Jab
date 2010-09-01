jab.AppController = function() {
    var appController = {};

    appController.views = {};
    appController.presenters = {};
    appController.widgets = {};


    appController.constructor = function() {};
    
    appController.constructor.prototype = appController;

    return appController.constructor;
}();


