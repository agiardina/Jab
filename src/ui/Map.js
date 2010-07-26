jab.ui.Map = function() {
    var map = new jab.ui.Widget();

    map.show = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng),
            options = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        this._map = new google.maps.Map(this.element, options);
    }

    map.constructor.prototype = map;
    return map.constructor;

}();