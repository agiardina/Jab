jab.html.Element = function() {
    var element = new jab.MVPObject(),
        dom = ['hasClass','addClass','removeClass','width', 'height','id','attr'];

    element.constructor = function(elementType,className,id) {
        if (elementType) {
            this.init(elementType,className,id);
        }
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

    element.content = function (text) {
        this.node().textContent = text;
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

    element.scrollable = function() {
        var self = this;

        this.addClass('scrollable');

        this.on('touchstart',function(_,e){
            if (typeof self._touch == 'undefined') {
                self._touch = {x:0,y:0};
            }
            
            self._touch.startTime = new Date().getTime();
            self._touch.startX = e.targetTouches[0].clientX;
            self._touch.startY = e.targetTouches[0].clientY;
            self._touch.currY = self._touch.startY;
            self._touch.currX = self._touch.startX;

            self._touch.page = jab.dom.height(self.node().parentNode);
            self._touch.max = self.height() - self._touch.page;
           
        });

        this.on('touchmove',function(_,e) {
            var diff;
            
            diff = e.targetTouches[0].clientY - self._touch.currY;
            self._touch.currY = e.targetTouches[0].clientY;

            self._touch.y = self._touch.y + diff;

            if (self._touch.y > 0) self._touch.y = 0;
            if (self._touch.y < -self._touch.max) self._touch.y = -self._touch.max;

            self.node().style.webkitTransform = 'translateY('+self._touch.y+'px)';
        });

        this.on('touchend',function(_,e) {
            var msec = new Date().getTime() - this._touch.startTime,
                diff = self._touch.currY - self._touch.startY,
                speed;

            if (diff && msec) {
                speed =  Math.abs(diff)/msec;
                
                if (speed > 0.3 && speed < 5 ) {
                    
                    //self._touch.y = self._touch.y + (diffY * (speed * speed * 7));

                    if (self._touch.y > 0) self._touch.y = 0;
                    if (self._touch.y < -self._touch.max) self._touch.y = -self._touch.max;
                    //self.node().style.webkitTransform = 'translateY('+self._touch.y+'px)';
                }
                
            }
        });
    };

    /**
     * Return the events manager and load it if necessary
     * @return {jab.DomEventsManager}
     */
    element.events = function(eventManager) {
        var events;
        //Lazy loading of events manager
        if (typeof eventManager == 'undefined') {
            events = new jab.DomEventsManager(this);
        } else {
            events = eventManager;
        }
        
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
                var args = [],
                    res;
                    
                args[0] = this._node;
                for (var i = 0,len = arguments.length;i<len;i++) {
                    args[i+1] = arguments[i];
                }

                res = jab.dom[f].apply(null,args);
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