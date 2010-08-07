jab.EventsManager = function(){
    
    var manager = {};

    /**
     * Return an event object. If the event object doesn't exists it create a new one
     * @param {String} evName. The event name to get/create
     * @return {jab.Event} the event
     */
    manager.get = function(evName) {
        var event;
        if (typeof this[evName] == 'undefined') {
            this[evName] = new jab.Event();
        }
        event = this[evName];

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
            this[evName] = new jab.Event();
        } else {
            this[evName] = event;
        }
        return this[evName];
    };

    /**
     * The event manager constructor;
     */
    manager.constructor = function() {
        this._events  = [];
    };

    manager.constructor.prototype = manager;

    return manager.constructor;
}();