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
        this.node().innerHTML = "<span>" + label + "</span>";
        return this;
    };

    button.constructor.prototype = button;

    return button.constructor;

}();
