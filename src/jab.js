(function () {

	var modules = {},
		deep = 0;
		stack = [],
		cache = {};
	
	function require(id) {
		return modules[id];
	}
	
	function define(id,dependencies,fn) {
		var required = dependencies.concat();
		
		function resolve (done) {
			var file;
			
			if (dependencies.length) {
				file = dependencies.shift();
				if (file && file !== 'require' && file !== 'exports') {
					//Check if the file has been already downloaded
					if (!cache[file]) {
						cache[file] = stack.length; //We save the position of the file inside the stack
						require.async(file, function () {
							resolve(done);
						});
					} else {
						//We put the required file at the end of the stack to respect the request order
						stack.push(stack[cache[file]]); 
						resolve(done);
					}
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
					
					//We don't need to reload the module
					if (modules[id]) {
						continue;
					}
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
	
	//Required by commonjs
	define.amd = {};
	
	require.async = function (id,loaded) {
		var xhr = new XMLHttpRequest(),
			file = 'js/' + id + '.js';
		
		xhr.open('GET', file, true);
		xhr.onreadystatechange = function () {
			var text;
			if (xhr.readyState === 4) {
				if(xhr.status === 200) {
					text = xhr.responseText;
					text += "//@ sourceURL=" + window.location.protocol + '//' + window.location.host + file;
					eval(text);
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