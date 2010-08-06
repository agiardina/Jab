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

    map.constructor.prototype = map;
    return map.constructor;

}();