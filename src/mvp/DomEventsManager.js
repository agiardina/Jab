jab.DomEventsManager = function() {
    var manager = new jab.EventsManager();


    /**
     * @param {String} evName The event to handle
     * @param {Function} handler The event handler
     */
    manager.addEventListener = function(evName,handler) {
        jab.EventsManager.prototype.addEventListener.apply(this,arguments);
        if (this.hasEventListener(evName) == 1) {
            var self = this;
            self._target.node().addEventListener(evName, function() {
                self.fireEvent(evName);
            });
        }
    };

    /**
     * The constructor
     */
    manager.constructor = function() {
        jab.EventsManager.apply(this,arguments);
    };

    manager.constructor.prototype = manager;

    return manager.constructor;
}();
