jab.html.Element = function() {
    var element = {},
        dom = ['hasClass','addClass','removeClass','width'];

    element.constructor = function() {
        this._node = {};
    }

    element.load = function(node) {
       this._node = node;
       return this;
    }

    element.node = function() {
        return this._node;
    }

    for (var i=0,len=dom.length;i<len;i++) {
        var fn = dom[i];
        element[fn] = function(f) {
            return function() {
                var res = jab.dom[f](this._node,arguments[0]);
                if (res == jab.dom) {
                    return this;
                } else {
                    return res;
                }
            }
        }(fn);
    }

    element.constructor.prototype = element;

    return element.constructor;
    
}();