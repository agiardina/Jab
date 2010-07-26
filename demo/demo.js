demo = {};
demo.initialize = function (){
    var layout = new jab.ui.Layout(),
        map = new jab.ui.Map();

    layout.createElement('main_layout')
          .createPanels(['main','sidebar'])
          .appendTo(document.getElementById('body'));

    layout.panelsWidth({main:'360px'});

    map.createElement('main_map')
        .appendTo(layout.panel('main'))
        .show(10,10);

}
