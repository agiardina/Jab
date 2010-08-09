jab = {};
jab.html = {};
jab.ui   = {};

/**
* Define the prototype object for a function.
* If child param == undefined a new constructor
* it create a new function that apply parent constructor.
* If child param == false create an empty function and
* return its prototype
* @param {Function} parent the parent function to
* @param {Function} child  the object constructor
* @return {Object} Returns the prototype object
*/
jab.prototypeFrom = function (parent,child) {
    if (!child) {
        if (typeof child === 'undefined') {
            child = function(){
                return parent.apply(this,arguments);
            };
        } else {
            child = function(){};
        }
    }
    
    var F = function() {}
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;

    return child.prototype;
}


/**
 * Load dinamycally a list of javascripts files.
 * @param {Array}
 */
jab.load = function(scripts) {
    for (var i=0, len=scripts.length;i<len;i++) {
        document.write('<script src="'+scripts[i]+'" type="text/javascript"></script>');
    }
};


jab.load([
    "http://maps.google.com/maps/api/js?sensor=true",
    "/Jab/src/dom.js",
    "/Jab/src/mvp/MVPObject.js",
    "/Jab/src/mvp/Event.js",
    "/Jab/src/mvp/EventsManager.js",
    "/Jab/src/mvp/DomEventsManager.js",
    "/Jab/src/mvp/AppController.js",
    "/Jab/src/mvp/View.js",
    "/Jab/src/mvp/Presenter.js",
    "/Jab/src/html/Element.js",
    "/Jab/src/ui/Widget.js",
    "/Jab/src/ui/Button.js",
    "/Jab/src/ui/Layout.js",
    "/Jab/src/ui/Map.js",
    "/Jab/src/ui/Button.js",
]);


