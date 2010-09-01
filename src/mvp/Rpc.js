jab.Rpc = function() {
    var rpc = new jab.MVPObject();

    /**
     * @param {String} url The url, or the name, of the command to call
     * @return {jab.RpcCommand} the command
     */
    rpc.command = function(url) {
        return new jab.RpcCommand(this,url);
    };

    rpc.run = function(command) {
        var timeout = command.timeout(),
            timeoutId,
            req;

        //Reusing the connection if available
        if (typeof this._req == 'undefined' || (this._req.readyState != 4 &&
                                                this._req.readyState != 0)) {
            this._req = new XMLHttpRequest();
        }

        req = this._req;

        //Open the connection
        req.open(command.type(),command.url(),true)

        //Is it post?
        if (command.type() == 'POST') {
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.setRequestHeader("Content-length", command.params().length);
            req.setRequestHeader("Connection", "close");
        }

        //Check for timeout, if timeout != 0
        if (timeout) {
            timeoutId = setTimeout(function(){
               req.abort();
            },timeout);
        }


        req.onreadystatechange = function() {
            
            //Clear Timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (req.readyState == 4) {
                if(req.status == 200) {
                    command.success(JSON.parse(req.responseText));
                } else {
                    command.error(req.status);
                }
            }
        }

        req.send(command.params());
    };

    rpc.constructor = function() {
        
    };

    rpc.constructor.prototype = rpc;
    return rpc.constructor;
    
}();

