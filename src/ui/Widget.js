jab.ui.Widget = function() {

    var widget = {};

    widget.constructor = function () {}

    widget.createElement = function(id,type) {
        
        if (!type) type = 'div';
        
        this.element = document.createElement(type);
        if (id) {
            this.element.id = id;
        }
        return this;
    }

    widget.appendTo = function(target) {
        if (target instanceof HTMLElement) {
            target.appendChild(this.element);
        } else if (element instanceof Widget) {
            target.appendChild(this.element);
        } else if (typeof element == 'string') {
            document.getElementById(element).appendChild(this.element);
        }

        return this;
    }
    
    widget.constructor.prototype = widget;

    return widget.constructor;

}();



