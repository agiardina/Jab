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

    button.notice = function(notice) {
        if (!this._notice) {
            if (!this._label) {
                throw "Impossible set a notice without a label";
            }
            this._notice = new jab.html.Element('sup');
            this._notice.addClass('notice');
            this._label.appendChild(this._notice);
        }

        if (typeof notice != 'udefined') {
            this._notice.content(notice);
            return this;
        } else {
            return this._notice.content();
        }
    };

    button.iconText = function(text) {
        if (!this._icontext) {
            if (!this._icon) {
                throw "Impossible set icontext without an icon";
            }
            this._icontext = new jab.html.Element('span');
            this._icontext.addClass('icontext');
            this._icon.appendChild(this._icontext);
        }

        if (typeof text != 'undefined'){
            this._icontext.content(text);
            return this;
        } else {
            return this._icontext.content();
        }

    };
    

    button.constructor.prototype = button;

    return button.constructor;

}();
