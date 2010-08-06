demo = {};
demo.initialize = function (){
    var layout = new jab.ui.Layout(),
        map = new jab.ui.Map(),
        button1 = new jab.ui.Button(),
        button2 = new jab.ui.Button(),
        button3 = new jab.ui.Button(),
        toolbar;


    layout.init('main')
        .panels(['body','toolbar'])
        .panelsHeight([380,40])
        .appendTo(document.getElementById('body'));
            
    map.init('main_map')
        .appendTo(layout.panel('body'))
        .show(53.34,-6.24);
        //.autoCenter();

    toolbar = layout.panel('toolbar');
    
    toolbar.panels(['b1','b2'])
        .orientation('horizontal')

    button1.init('messages')
        .label('Messages')
        .appendTo(toolbar.panel('b1'));

    button1.on('click',function(){alert('test')})

    button2.init('profile')
        .label('Profile')
        .appendTo(toolbar.panel('b2'));

}