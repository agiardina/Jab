jab.MVPObject = function() {
    var mvpobject = {};

    /**
     * MVPObject constructor.
     */
    mvpobject.constructor = function(){};

    /**
     * Add a listerner to event. Shortcut for this.events().addEventListener
     * @param {String} evName The event name
     * @param {Function} listener The listener to run when the event is fired
     * @return this For chaining
     */
    mvpobject.on = function(evName,listener) {
        if (listener) {
            this.events().addEventListener(evName,listener);
            return this;
        } else {
            var ev = this.events().get(evName);
            ev.target = this;
            return ev;
        }
    };

    mvpobject.fireEvent = function(ev,data) {
        return this.events().fire(ev,data);
    };

    /**
     * Return the events manager and load it if necessary
     * @return {jab.EventsManager}
     */
    mvpobject.events = function() {
        //Lazy loading of events manager
        var events = new jab.EventsManager(this);
        //Replace the events function 
        this.events = function() {
            return events;
        };
        return this.events();
            
    };

    /**
     * Return a cache object
     * If a key is specified it returns a global cache object.
     * Without key it return an instance cache
     * @param {String} key The optional key to get a global cache object
     * @return {jab.Cache}
     */
    mvpobject.cache = function(key) {
        if (typeof key == 'string') {
            return jab.Cache.single(key);
        } else {
            if (!this._cache) {
                this._cache = new jab.Cache();
            }
            return this._cache;
        }
    };

    mvpobject.constructor.prototype = mvpobject;

    return mvpobject.constructor;
}();


