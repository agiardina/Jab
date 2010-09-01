jab.ui.Textfield = function() {
    var proto = new jab.html.Tree();

    proto.constructor = function(name) {
        
        if (name) {
            this.create({
                'field': {
                    '__type__': 'label',
                    'label' : 'span',
                    'input': 'input'
                }
            });
        }
    };

    proto.label = function(label) {
        this.el('field:label').content(label);
        return this;
    };

    proto.constructor.prototype = proto;
    return proto.constructor;
}();