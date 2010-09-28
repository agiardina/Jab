jab.ui.Map = function() {
    
    var map = new jab.html.Element();

    map.constructor = function(name){
        this._markers = {};
        if (name) {
            this.init('div','map');
            this.addClass(name);
        }
    };

    map.load = function() {
        jab.html.Element.prototype.load.apply(this,arguments);
        
        var self = this;
        this.node().addEventListener('DOMNodeRemovedFromDocument', function() {
            self.free();
            self.fireEvent('mapInvisible');
        },false);

        this.node().addEventListener('DOMNodeInsertedIntoDocument', function() {
            setTimeout(function(){
                self.checkResize();
                self._map.setCenter(self._center);
            },100);
            self.fireEvent('mapVisible');
        },false);

    };

    map.init = function() {
        jab.html.Element.prototype.init.apply(this,arguments);
        this.addClass('map');
        return this;
    };
    
    map.show = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng),
            zoom = 12,
            options = {
                zoom: zoom,
                center: latlng,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.ANDROID},
            };

        this._center = latlng;
        this._zoom = zoom;
        this._map = new google.maps.Map(this.node(), options);

        return this;
    };

    map.move = function(lat,lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        this._center = latlng;
        if (this._map) {
            this._map.panTo(latlng);
        }
    };

    map.autoCenter = function(handler) {
        var self = this;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                self.move(position.coords.latitude,position.coords.longitude);
                if (typeof handler == 'function') {
                    handler();
                }
            });
        }
        return this;
    };


    /**
     * Add a marker to the map. If the id param is used the marker will be
     * stored to be used after. There is no check to verify if a marker
     * with the same id has been already added.
     * @see #marker
     * @see #deleteMarker
     * @see #moveMarker
     * @param {Number} lat The latitude
     * @param {Number} lng The longitude
     * @param {String} title The title
     * @param {String} icon The icon path if a custom icon is required
     * @param {String} id An id to memorize the marker somewhere
     * @return {jab.ui.Map} The map itself for chaining
     * @todo Replace the marker with a custom overlay for better performances
     */
    map.addMarker = function(lat,lng,title,icon,id) {
        //MarkerLatLng and options
        var markerLatLng = new google.maps.LatLng(lat, lng),
             markerOptions =  {
                 position: markerLatLng,
                 map: this._map
             },
             marker,
             self = this;

        //Add more default options
        if (typeof title != 'undefined') {
            markerOptions.title = title;
        }

        if (typeof icon != 'undefined') {
            markerOptions.icon = icon;
        }

        //Create the marker
        marker = new google.maps.Marker(markerOptions);

        //Create a wrapper for the listener
        google.maps.event.addListener(marker, 'click', function() {
            self.events().fireEvent('markerClick',marker);
        });
         
        if (typeof id != 'undefined') {
            this._markers[id] = marker;
            marker.id = id;
        }
         
        return marker;
    };

    /**
     * Add a marker to the map or move the marker if exists
     * @see #marker
     * @see #addMarker
     * @see #moveMarker
     * @param {Number} lat The latitude
     * @param {Number} lng The longitude
     * @param {String} title The title
     * @param {String} icon The icon path if a custom icon is required
     * @param {String} id An id to memorize the marker somewhere
     * @return {jab.ui.Map} The map itself for chaining
     */
    map.showMarker = function(lat,lng,title,icon,id) {
        if (this._markers[id]) {
            this.moveMarker(id,lat,lng);
        } else {
            this.addMarker(lat,lng,title,icon,id);
        }
    };

    /**
     * Initialize an InfoWindow
     * @param {jab.html.Element|HTMLElement} el The content of the infoWindow
     * 
     */
    map.loadInfoWindow = function(el) {
        if (!this._infoWindow) {
            this._infoWindow = new google.maps.InfoWindow();
        }

        if (typeof el.node == 'function') {
            el = el.node();
        }

        this._infoWindow.setContent(el);
    };

    /**
     * Show an infoWindow
     * @param {google.maps.Marker} marker The optional marker to anchor the text
     * @param {jab.html.Element|HTMLElement|String} el The optional content element
     * @see #loadInfoWindow
     */
    map.showInfoWindow = function (marker,el) {
        if (el) {
            this.loadInfoWindow(el);
        }

        if (typeof this._infoWindow == 'undefined') {
            throw "Infowindow not loaded";
        }

        this._infoWindow.open(this._map,marker);
    };

    /**
     * Return a marker using the param id
     * @see #addMarker
     * @param {String} id The marker id
     * @return {Marker} The marker
     */
    map.marker = function(id) {
        if (typeof this._markers[id] != 'undefined') {
            return this._markers[id];
        } else {
            return null;
        }
    };

    /**
     * Delete a marker using the param id
     * @see #addMarker
     * @param {String} id The marker id
     * @return {jab.ui.Map} The map object to chaining
     */
    map.deleteMarker = function(id) {
        if (typeof this._markers[id] != 'undefined') {
            this._markers[id].setMap(null);
            delete this._markers[id];
        }

        return this;
    };

    /**
     * Return a saved marker
     * @param {Strimng} id The marker id
     * @return {google.maps.Marker} the marker
     */
    map.getMarker = function(id) {
        if (typeof this._markers[id] != 'undefined') {
            return this._markers[id];
        } else {
            return null;
        }
    };

    map.free = function() {
        for (id in this._markers) {
            google.maps.event.clearInstanceListeners(this._markers[id]);
            this._markers[id].setMap(null);
        }

        if (this._infoWindow) {
            this._infoWindow.close();
        }
        this._markers = {}
    };
    
    /**
     * Move a marker using the param id
     * @see #addMarker
     * @param {String} id The marker id
     * @param {Number} lat The new latitude
     * @param {Number} lng The new longitude
     * @return {jab.ui.Map} The map object to chaining
     */
    map.moveMarker = function(id,lat,lng) {
        if (typeof this._markers[id] != 'undefined') {
            var markerLatLng = new google.maps.LatLng(lat, lng);
            this._markers[id].setPosition(markerLatLng);
        }

        return this;
    };

    map.checkResize = function() {
        google.maps.event.trigger(this._map, 'resize');
    };


    map.constructor.prototype = map;
    return map.constructor;

}();
