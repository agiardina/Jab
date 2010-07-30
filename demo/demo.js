demo = {};
demo.initialize = function (){
    var layout = new jab.ui.Layout(),
        map = new jab.ui.Map();

    layout.init('main')
        .panels(['toolbar','body','footer'])
        .appendTo(document.getElementById('body'));
            
    map.init('main_map')
        .appendTo(layout.panel('body'))
        .show(10,10);
}