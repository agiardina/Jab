jab.RpcCommand = function() {
    var command = new jab.MVPObject();

    command._url = '';
    command._timeout = 5000;
    command._type = 'GET';
    command._params = {};

    command.rpc = function(rpc) {
        if (rpc) {
            this._rpc = rpc;
            return this;
        } else {
            return this._rpc;
        }
    };

    command.url = function(url) {
        var concat = '?';
        if (url) {
            this._url = url;
            return this;
        } else {
            if (this.type() == 'POST') {
                return this._url;
            } else {
                if (this._url.indexOf('?') != -1) {
                    concat = '&';
                }
                return this._url + concat + this._getParams();
            }
            
        }
    };

    command.type = function(type) {
        if (type) {
            this._type = type.toUpperCase();
            return this;
        } else {
            return this._type;
        }
    };

    command.timeout = function(value) {
        if (typeof value != 'undefined') {
            this._timeout = value;
            return this;
        } else {
            return this._timeout;
        }
    };

    command.success = function(result) {
        this.fireEvent('success',result);
    };

    command.error = function(error_code) {
        this.fireEvent('error',error_code);
    };

    command.run = function(params) {
        this.params(params);
        this._rpc.run(this);
    };

    command.runEvery = function(msec,params) {
        var self = this,
            func = function() {
                self.run(params);
                this._timeout_id = setTimeout(func,msec);
            };

        func();
    };

    command.stop = function() {
        clearTimeout(this._timeout_id);
    };

    command.params = function(params) {
        if (typeof params != 'undefined') {
            if (typeof params == 'function') {
                params = params();
            }
            this._params = params;
            return this;
        } else {
            if (this.type() == 'POST') {
                return this._getParams();
            } else {
                return null;
            }
        }
    };

    command._getParams = function() {
        var params = [];
        for (var p in this._params) {
            params.push(p + '=' + this._params[p]);
        }
        return params.join('&');
    };
    
    command.constructor = function(rpc,url) {
        if (rpc) this.rpc(rpc);
        if (url) this.url(url);
    };

    command.constructor.prototype = command;
    return command.constructor;
    
}();