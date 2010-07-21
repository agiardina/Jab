jab.ui.Button = function() {

    Button = function() {}.prototype;

    Button.size = function(w,h) {
        this.width = w;
        this.height = h;
    };

    return Button.constructor;

}();


