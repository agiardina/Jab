jab.MVPObject = function() {
    var mvpobject = {};

    /**
     * MVPObject constructor. Attach an event manager to object
     */
    mvpobject.constructor = function(){
        this.events = new jab.EventsManager();
    };

    /**
     * Add a listerner to event.
     * @param {String} evName The event name
     * @param {Function} listener The listener to run when the event is fired
     * @return this For chaining
     */
    mvpobject.on = function(evName,listener) {
        var event = this.events.get(evName);
        event.addListener(listener);
        return this;
    };

    mvpobject.constructor.prototype = mvpobject;

    return mvpobject.constructor;
}();


