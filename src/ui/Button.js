jab.ui.Button = function() {

    var button = new jab.ui.Widget();

    button.constructor = function() {
        this._className = 'button';
    };

    /**
     * @param {String} label the label for the button
     */
    button.label = function(label) {
        this.node().innerHTML = "<span>" + label + "</span>";
        return this;
    };

    button.constructor.prototype = button;

    return button.constructor;

}();
