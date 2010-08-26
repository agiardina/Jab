jab.EventsManager = function(){
    
    var manager = {};

    /**
     * Return an event object. If the event object doesn't exists it create a new one
     * @param {String} evName. The event name to get/create
     * @return {jab.Event} the event
     */
    manager.get = function(evName) {
        var event;
        if (typeof this._events[evName] == 'undefined') {
            this._events[evName] = new jab.Event();
        }
        event = this._events[evName];

        return event;
    };

    /**
     *  Add an event to manager
     *  @param {String} evName The event name
     *  @param {jab.Event} event The optional event. If missing a new jab.Event will be created
     *  @return the new added event
     */
    manager.add = function(evName,event) {
        if (typeof event == 'undefined') {
            event = new jab.Event();
        }

        this._events[evName] = event;
        
        return this._events[evName];
    };

    /**
     * @param {String} evName The event to handle
     * @param {Function} handler The event handler
     * @return The events manager to chaininig
     */
    manager.addEventListener = function(evName,handler) {
        this.get(evName).addListener(handler);
        return this;
    };

    /**
     * Return the number of listeners the event has
     * @param {String} evName The event to check
     * @return {Number} The number of listener the event has
     */
    manager.hasEventListener = function(evName) {
        if (typeof this._events[evName] == 'undefined') {
            return 0;
        }

        return this._events[evName].hasListener();
    };

    /**
     * Fire an event.
     * If the event managet has a target the event will have the same target
     * @param {String} evName The event to fire
     * @param {Mixed} data The optional data to pass to event
     */
    manager.fireEvent = function(evName,data) {
        var event=this.get(evName);

        event.target = this._target;
        return event.fire(data);
    };
    manager.fire = manager.fireEvent; //Alias for fireEvent

    /**
     * The event manager constructor;
     * @param {Object} target The default target
     */
    manager.constructor = function(target) {
        this._events  = [];
        if (typeof target != 'undefined') {
            this._target = target;
        }
    };

    manager.constructor.prototype = manager;

    return manager.constructor;
}();