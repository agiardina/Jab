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