jab.ui.Button = function() {

    var button = new Widget();

    return function() {
        console.log('I am a button');
    }.prototype = button

    button.size = function(w,h) {
        this.width = w;
        this.height = h;
    };

    button.click = function() {
        console.log('clicked');
    };

    return Constructor;

}();
