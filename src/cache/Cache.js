jab.Cache = function() {
    var cache = {};

    cache.constructor = function() {
        this._data = {};
    };

    cache.save = function(key,value) {
        this._data[key] = value;
        return this;
    };

    cache.get = function(key) {
        return this._data[key];
    };

    cache.clear = function(key) {
        if (key) {
            this._data[key] = null;
        } else {
            this._data = {};
        }
        return this;
    };

    cache.constructor.prototype = cache;
    return cache.constructor;
}();

jab.Cache._caches = {};

jab.Cache.single = function(key) {
    if (!jab.Cache._caches[key]) {
        jab.Cache._caches[key] = new jab.Cache();
    }
    return jab.Cache._caches[key];
};