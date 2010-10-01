jab.html.Element = function() {
    var element = new jab.MVPObject(),
        dom = ['hasClass','addClass','removeClass','style',
               'width', 'height','id','attr',
               'hide','show','focus'];

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
        if (typeof text == 'undefined') {
            return this.node().textContent;
        } else {
            this.node().textContent = text;
            return this;
        }
        
    };

    element.data = function(prop,value) {
        return this.attr('data-' + prop,value);
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

    element.insertFirstChild = function(child) {
        var first = this.node().firstChild;
        
        try {
            if (typeof child.node == 'function') {
                this.node().insertBefore(child.node(),first);
            } else {
                this.node().insertBefore(child, first);
            }

        } catch (err){
            throw 'Widget.appendTo: Impossible insert into object';
        }

        return this;
    };

    element.appendBefore = function (refEl) {
        if (typeof refEl.node == 'function') {
            refEl =  refEl.node();
        }
        refEl.parentNode.insertBefore(this.node(),refEl);
    };

    element.scrollable = function() {
        if (!('ontouchstart' in document.documentElement)) {
            return;
        }

        //Remove the flick event for iphone (move this outside)
        document.body.addEventListener("touchmove", function(e) {
            e.preventDefault();
        }, false);

        var self = this,
            touch = {x:0,y:0},
            scroll = function(dist,e,end) {
                var totalTime,
                    animation = 'ease-out';
                if (end) {
                    totalTime = 700;
                } else{
                    totalTime = e.timeStamp - touch.currTime;
                }

                touch.y = touch.y + dist;
                if (touch.y > 0) touch.y = 0;
                if (touch.y < -touch.max) touch.y = -touch.max;

                self.node().style.webkitTransition = "-webkit-transform " + totalTime + "ms " + animation;
                self.node().style.webkitTransform = 'translateY('+touch.y+'px)';
            };

        this.addClass('scrollable');

        this.on('touchstart',function(_,e){

            touch.startTime = e.timeStamp;
            touch.startY = e.targetTouches[0].clientY;

            touch.currTime = e.timeStamp;
            touch.currY = touch.startY;

            touch.page = jab.dom.height(self.node().parentNode);
            touch.max = self.height() - touch.page;
           
        });

        this.on('touchmove',function(_,e) {
            var dist = e.targetTouches[0].clientY - touch.currY; //Slow
            scroll(dist,e);

            touch.currTime = e.timeStamp;
            touch.currY = e.targetTouches[0].clientY;
        });

        this.on('touchend',function(_,e) {
            var time = e.timeStamp - touch.startTime,
                dist = e.changedTouches[0].clientY - touch.startY,
                speed = Math.abs(dist / time);

            if (dist && time) {
                if (speed > 0.3 ) {
                    scroll(dist*speed*6,e,true);
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

    element.value = function (value) {
        if (typeof value == 'undefined') {
            return this.node().value;
        } else {
            this.node().value = value
            return this;
        }
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