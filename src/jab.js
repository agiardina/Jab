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
 * @param {Array} scripts An array of scripts to load
 * @param {String} basepath The basepath of the scripts
 */
jab.load = function(scripts,basepath) {
    var file, i;
    if (typeof basepath == 'undefined') {
        basepath = '';
    }
    for (i in scripts) {
        file = scripts[i];
        //Don't add the base path because is a complete url
        if (!/https?:\/\//.test(file)) {
            file = basepath + file;
        }
        document.write('<script src="'+ file +'" type="text/javascript"></script>');
    }
        
};

jab.init = function(basepath) {
    jab.load([
        '/src/ext/json2.min.js',
        "http://maps.google.com/maps/api/js?sensor=true",
        "/src/dom.js",
        "/src/mvp/MVPObject.js",
        "/src/html/Element.js",
        "/src/html/Tree.js",
        "/src/mvp/Event.js",
        "/src/mvp/EventsManager.js",
        "/src/mvp/DomEventsManager.js",
        "/src/mvp/AppController.js",
        "/src/mvp/Rpc.js",
        "/src/mvp/RpcCommand.js",
        "/src/mvp/View.js",
        "/src/mvp/Presenter.js",
        "/src/ui/Button.js",
        "/src/ui/Layout.js",
        "/src/ui/List.js",
        "/src/ui/Map.js",
        "/src/ui/Button.js",
        "/src/ui/Textarea.js",
    ],basepath);
};



