jab.View = function() {
    var view = new jab.html.Element();

    view.constructor = function() {};

    /**
     * Each view needs a root widget
     * The developer should call this method passing the main widget of the view
     * @param {jab.html.Element} widget The root widget to set
     * @return {jab.html.Element} The setted root widget
     */
    view.root = function(widget) {
        if (typeof widget != 'undefined') {
            this.load(widget);
        }

        if (typeof this._node == 'undefined') {
            throw "Root for view not setted, please set the root widget";
        }

        return this._node;
    };

    view.constructor.prototype = view;
    return view.constructor;
}();