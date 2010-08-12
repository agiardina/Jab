jab.html.Element = function() {
    var element = new jab.MVPObject(),
        dom = ['hasClass','addClass','removeClass','width', 'height','id'];

    element.constructor = function(elementType,className,id) {
        if (elementType) {
            this.init.apply(this,arguments);
        }
        return this;
    };

    element.init = function(elementType,className,id) {
        if (typeof this._node == 'object') {
            throw "Element.init: impossibile to init more than one node";
        } else {
            var node = document.createElement(elementType);
            this.load(node);

            //Every element can have a default className
            this.addClass(className);
            this.id(id);

            node = null;
        }
        return this;
    };

    element.load = function(node) {
        this._node = node;
        return this;
    };

    element.node = function() {
        if (typeof this._node.node == 'function') {
            return this._node.node();
        } else {
            return this._node;
        }
    };

    element.clear = function() {
        var node = this.node();
        while(node.firstChild) {
           node.removeChild(node.firstChild);
        }
        node = null;
    };

    element.appendTo = function(target) {
        try {
            if (typeof target.node == 'function') {
                target.node().appendChild(this.node());
            } else {
                target.appendChild(this.node());
            }
        } catch (err){
            throw 'Widget.appendTo: Impossible to append to object';
        }

        return this;
    };

    element.appendChild = function(child) {
        try {
            if (typeof child.node == 'function') {
                this.node().appendChild(child.node());
            } else {
                this.node().appendChild(child);
            }
            
        } catch (err){
            throw 'Widget.appendTo: Impossible to append to object';
        }

        return this;
    };

    /**
     * Return the events manager and load it if necessary
     * @return {jab.DomEventsManager}
     */
    element.events = function() {
        //Lazy loading of events manager
        var events = new jab.DomEventsManager(this);
        //Replace the events function
        this.events = function() {
            return events;
        }
        return this.events();

    };    

    /**
     * Copy methods from jab.dom
     */
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