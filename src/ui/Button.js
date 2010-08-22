jab.ui.Button = function() {

    var button = new jab.html.Element();

    button.constructor = function(name) {
        if (name) {
            this.init('div','button');
            this.addClass(name);
        }
    };

    /**
     * @param {String} label the label for the button
     */
    button.label = function(label) {
        if (!this._label) {
            this._label = new jab.html.Element('span');
            this._label.addClass('label');
            this.appendChild(this._label);
        }
        this._label.content(label);
        return this;
    };

    /**
     * @param {String} icon The icon to set
     */
    button.icon = function(icon) {
        if (!this._icon) {
            this._icon = new jab.html.Element('span');
            if (this._label) {
                this._icon.appendBefore(this._label)
            } else {
                this.appendChild(this._icon);
            }
        }
        this._icon.attr('class','icon');
        this._icon.addClass(icon);


        return this;
    };
    

    button.constructor.prototype = button;

    return button.constructor;

}();
