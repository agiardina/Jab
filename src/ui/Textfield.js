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

    proto.value = function(value) {
        if (typeof value == 'undefined') {
            return this.el('field:input').value();
        } else {
            this.el('field:input').value(value);
            return this;
        }
    };

    proto.label = function(label) {
        this.el('field:label').content(label);
        return this;
    };

    proto.constructor.prototype = proto;
    return proto.constructor;
}();