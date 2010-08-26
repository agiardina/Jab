jab.RpcCommand = function() {
    var command = new jab.MVPObject();

    command._timeout = 5000;
    command._type = 'POST';

    command.setRpc = function(rpc) {
        this._rpc = rpc;
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
        this._rpc.call(this);
    };
    
    command.constructor = function() {
        
    };

    command.constructor.prototype = command;
    return command.constructor;
    
}();




