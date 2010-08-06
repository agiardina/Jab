jab.ui.Widget = function() {

    var widget = new jab.html.Element();

    widget.constructor = function () {};

    widget.createElement = function(id,type) {
        
        if (!type) type = 'div';
        
        this._node = document.createElement(type);
        if (id) {
            this._node.id = id;
        }
        return this;
    };

    widget.on = function(evName,listener) {
        var self = this;
        this.node().addEventListener(evName, function(){
            listener.apply(self,arguments);
        });
    };

    widget.appendTo = function(target) {
        if (target instanceof HTMLElement) {
            target.appendChild(this.node());
        } else if (target instanceof jab.html.Element) {
            target.node().appendChild(this.node());
        } else {
            throw 'Widget.appendTo: Impossible to append to object';
        }

        return this;
    };
    
    widget.constructor.prototype = widget;

    return widget.constructor;

}();



