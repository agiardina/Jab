jab.html.Element = function() {
    var element = {},
        dom = ['hasClass','addClass','removeClass','width', 'height'];

    element._element = 'div';
    element._className = '';

    element.constructor = function() {
        this._node = undefined;
    }

    element.init = function(className,id) {
        if (typeof this._node == 'object') {
            throw "Element.init: impossibile to init more than one node";
        } else {
            this._node = document.createElement(this._element);
            this._node.className = className;

            this.style = this._node.style;

            if (typeof id != 'undefined') {
                this._node.id = id
            }

            //Every element can have a default className
            this.addClass(this._className);
        }
        return this;
    },

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