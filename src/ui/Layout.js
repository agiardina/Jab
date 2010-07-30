jab.ui.Layout = function() {
    var layout = new jab.ui.Widget();
    
    layout.constructor = function(node) {
        this._panels = {};
    };

    layout.init = function() {
        jab.html.Element.prototype.init.apply(this,arguments);
        return this;
    },

    layout.orientation = function(val) {
        if (val == 'horizontal') {
            this.addClass('horizontal');
        } else {
            this.removeClass('horizontal');
        }
        return this;
    };

    layout.panel = function(name) {
        return this._panels[name];
    };

    layout.panelsWidth = function(width) {
        for (var i in width) {
            this.panel(i).style.width = width[i];
        }
    };

    layout.panels = function(panels) {
        var len=panels.length;
        for (var i=0;i<len;i++) {
            var panel = new jab.ui.Layout(),
                name = panels[i];
            panel.init(name);
            this._panels[name] = panel;
            this.node().appendChild(panel.node());
        }

        if (len < 6) this.addClass('p' + len);
        
        return this;
    }
    
    layout.constructor.prototype = layout;
    
    return layout.constructor;
}();