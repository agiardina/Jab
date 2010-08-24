jab.ui.List = function() {
    
    var list = new jab.html.Element();

    list.item = function(id) {
        var item = new jab.html.Element('li');
        item.id = id;
        this.appendChild(item);
    };

    list.begin = function(widget) {
        var item = new jab.html.Element('li');
        item.appendChild(widget)
        this.insertFirstChild(item);
    };
    
    list.add = function(widget) {
        var item = new jab.html.Element('li');
        item.appendChild(widget)
        this.appendChild(item);
    };

    list.constructor = function() {
        this.init('ul','list');
    };
    list.constructor.prototype = list;

    return list.constructor;
}();