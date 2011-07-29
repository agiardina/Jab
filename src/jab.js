(function () {

var modules = {},
	deep = 0;
	stack = [];

function require(id) {
	return modules[id];
}

function define(id,dependencies,fn) {
	var required = dependencies.concat();
	
	function resolve (done) {
		var file;
		
		if (dependencies.length) {
			file = dependencies.shift();
			if (file && stack.indexOf(file) === -1 && file !== 'require' && file !== 'exports') {
				require.async(file, function () {
					resolve(done);
				});
			} else {
				resolve(done);
			}
		} else {
			done();
		}
	}
	deep++;
	stack.push({id:id,dependencies:required,fn:fn});
	
	resolve(function () {
		var i,j,len,
			id,fn,dependencies,
			module, exports;
		
		deep--;
		if (deep === 0) { //Check if we are in the most external function
			i = stack.length - 1;
		
			for (;i>=0;i--) {
				exports = {};
				id = stack[i].id;
				fn = stack[i].fn;
				dependencies = [];

				//Collect dependencies for the modules
				for (j=0,len=stack[i].dependencies.length;j<len;j++) {
					module = stack[i].dependencies[j];
					if (module === 'require') {
						dependencies.push(require);
					} else if (module === 'exports') {
						dependencies.push(exports);
					} else {
						dependencies.push(modules[module]);
					}
				}

				fn.apply({},dependencies); //The factory function will populate the exports variable
				modules[id] = exports;
			}
		}
	});
}


require.async = function (id,loaded) {
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'js/' + id + '.js', true);
	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
	     if(xhr.status === 200) {
	    	 eval(xhr.responseText);
	    	 loaded();
	     } else {
	    	 throw "Impossible to load " + id;
	     }
	  }
	};
	xhr.send(null);			
};

if (window) {
	window.define = define;
}
})();