return function() {
	
	var self = {};
	
	self.range = function (start,end) {
		var arr = [],
			i;
		if (end === undefined) {
			end = start;
			start = 1;
		}
		for (i=start;i<=end;i++) {
			arr.push(i);
		}
		return arr;
	};
	
	return self;
}; 