jab.ui.Layout = function() {
    var layout = new jab.ui.Widget();

    layout.constructor = function(node) {
        this._panels = {};
    };

    layout.panel = function(panel) {
        return this._panels[panel];
    };

    layout.panelsWidth = function(width) {
        for (var i in width) {
            this.panel(i).style.width = width[i];
        }
    };

    layout.createPanels = function(panels) {
        for (var i=0,len=panels.length;i<len;i++) {
            var node = document.createElement('div');
            node.id = panels[i];
            
            this._panels[panels[i]] = node;
            this.element.appendChild(node);
        }
        return this;
    }
    
    layout.constructor.prototype = layout;
    
    return layout.constructor;
}();