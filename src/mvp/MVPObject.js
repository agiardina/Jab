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
        this.events().addEventListener(evName,listener);
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
        }
        return this.events();
            
    };    

    mvpobject.constructor.prototype = mvpobject;

    return mvpobject.constructor;
}();


