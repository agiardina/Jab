jab.html.Tree = function() {
    var st = new jab.html.Element();

    st.constructor = function(data) {
        if (data) {
            this.create(data);
        }
    };

    st.create = function(data) {
        this._tree = {};
        this.load(new jab.html.Element('div'));
        this._create(data,this._tree,this);
    };

    st._create = function(data,tree,node) {
        tree._el = node;
        for (var p in data) {
            if (p == '__type__') continue;
            
            tree[p] = {};
            if (typeof data[p] == 'object') {
                if (data[p].__type__) {
                    tree[p] = this._create(data[p],{},new jab.html.Element(data[p].__type__));
                } else{
                    tree[p] = this._create(data[p],{},new jab.html.Element('div'));
                }
                
            } else  {
                tree[p]._el = new jab.html.Element(data[p]);
            } 
            tree[p]._el.addClass(p).appendTo(node);
        }
        return tree;
    };

    st.el = function(path) {
        var a = path.split(/[.|:]/),
            tree = this._tree;
        for (var i = 0,len = a.length;i<len;i++) {
            tree = tree[a[i]];
        }
        return tree._el;
    }

    st.constructor.prototype = st;
    return st.constructor;
}();


