jab.ui.Textarea = function() {
    var txt = new jab.html.Element();

    txt.constructor = function(name) {
        if (name) {
            this.init('textarea','textarea');
            this.addClass(name);
        }
    };
    
    txt.constructor.prototype = txt;
    return txt.constructor;
}();

