jab.ui.Map = function() {
    var map = new jab.ui.Widget();

    map.constructor = function(){};

    map.init = function() {
        jab.html.Element.prototype.init.apply(this,arguments);
        this.addClass('map');
        return this;
    };
    
    map.show = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng),
            options = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        this._map = new google.maps.Map(this.node(), options);
        return this;
    };

    map.constructor.prototype = map;
    return map.constructor;

}();