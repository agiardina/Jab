jab.ui.Textarea = function() {
    var proto = new jab.html.Tree();

    proto.constructor = function(name) {

        if (name) {
            this.create({
                'field': {
                    '__type__': 'label',
                    'label' : 'span',
                    'input': 'textarea'
                }
            });
            this.el('field:input').addClass('textarea');
        }
    };

    proto.value = function(value) {
        if (typeof value == 'undefined') {
            return this.el('field:input').node().value;
        } else {
            this.el('field:input').node().value = value;
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