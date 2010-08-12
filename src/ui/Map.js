jab.ui.Map = function() {
    var map = new jab.html.Element();

    map.constructor = function(name){
        this._markers = {};
        if (name) {
            this.init('div','map');
            this.addClass(name);
        }
    };

    map.init = function() {
        jab.html.Element.prototype.init.apply(this,arguments);
        this.addClass('map');
        return this;
    };
    
    map.show = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng),
            options = {
                zoom: 12,
                center: latlng,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.ANDROID},
            };

        this._map = new google.maps.Map(this.node(), options);
        return this;
    };

    map.autoCenter = function() {
        var self = this;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                self.show(position.coords.latitude,position.coords.longitude);
            }, function() {
                self.show(10,10);
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
             marker
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

    map.free = function() {
        for (id in this._markers) {
            this._markers[id].setMap(null);
            delete this._markers[id];
        }
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



    map.constructor.prototype = map;
    return map.constructor;

}();