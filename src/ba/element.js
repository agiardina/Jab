define('jab/ba/element', ['require','exports'], function (require,exports) {
	
	function Element (spec) {
		if (spec) {
			this.init(spec);
		}
	}
	
	var self = {
		_move:true
	};
	
	self.init = function (spec) {
		if (spec) {
			for (var p in spec) {
				this[p] = spec[p];
			}
		}
		
		//if (spec.angle !== undefined) {
		//	this.moveAngle(this.angle);
		//}
	};
	
	self.stop = function () {
		this._move = false;
	};	
	
	self.moveTo = function (toX,toY) {
		var dx = toX - this.x,
			dy = toY - this.y;
			distance = Math.sqrt(dx*dx + dy*dy);
		
		this._move = true;
		this.moves = parseInt(distance/this.speed,10);
		this.toX = toX;
		this.toY = toY;
		
		if (this.moves) {
			this.speedX =  (this.toX-this.x)/this.moves;
			this.speedY =  (this.toY-this.y)/this.moves;
		}
	};
	
	self.applyNewPosition = function () {
		this.x = this.nextX;
		this.y = this.nextY;
	};
	
	Element.prototype = self;
	exports.Element = Element;
	
});