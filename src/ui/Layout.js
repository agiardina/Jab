/**
 *
 * @namespace jab.ui
 * @class Layout
 *
 */
jab.ui.Layout = function() {
    
    var layout = new jab.html.Element();
    
    layout.constructor = function(name) {
        this._panels = {};
        if (name) {
            this.init('div','layout');
            this.addClass(name);
        }
    };

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


    /**
     * Set the width of all panels
     * @param {Array|Object} width
     * @return {Layout} The layout object for chaining
     */
    layout.panelsWidth = function(width) {
        if (width instanceof Array) {
            var i = 0;
            for (var p in this._panels) {
                this._panels[p].width(width[i++]);
            }
        } else {
            for (var i in width) {
                this.panel(p).width(width[p]);
            }
        }
        return this;
    };

    /**
     * Set the height of all panels
     * @param {Array|Object} height
     * @return {Layout} The layout object for chaining
     */
    layout.panelsHeight = function(height) {
        if (height instanceof Array) {
            var i = 0,h;
            for (var p in this._panels) {
                h = height[i++];
                if (h == 'flex' || h == 'auto' ) {
                    this._panels[p].node().style['-webkit-box-flex'] = 1;
                } else {
                    this._panels[p].height(h);
                }
            }
        } else {
            for (var p in height) {
                this.panel(p).height(height[p]);
            }
        }
        return this;
    };

    layout.panels = function(panels) {
        var len=panels.length;
        for (var i=0;i<len;i++) {
            var name = panels[i],
                panel = new jab.ui.Layout(name);
            this._panels[name] = panel;
            this.node().appendChild(panel.node());
        }

        if (len < 6) this.addClass('p' + len);
        
        return this;
    };

    layout.push = function(child) {
        this.node().appendChild(child);
    };
    
    layout.constructor.prototype = layout;
    
    return layout.constructor;
}();