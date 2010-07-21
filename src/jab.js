jab = {}
jab.ui = {}

jab.protoBy = function (parent,child) {
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