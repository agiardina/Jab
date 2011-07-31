define('jab/ba/vector',['exports'],function (exports) {
	
	function vector(obj) {
		for (var fn in decorator) {
			obj[fn] = decorator[fn];
		}
	}
	
	function updateSpeedComponents (obj,speed) {
		var radians = obj.angle * Math.PI/180;
		if (speed !== undefined) {
			obj.speed = speed;
		}
		obj.speedX = Math.cos(radians) * obj.speed;
		obj.speedY = Math.sin(radians) * obj.speed;
	}
	

	var decorator = {};
	
	decorator.updatePos = function () {
		if (this.angle !== undefined) {
			//this.updateSpeedComponents(this.speed - (this.speed * this.friction));	
			this.nextX = this.x + this.speedX;
			this.nextY = this.y + this.speedY;
		}
	};
	
	decorator.moveAngle = function (angle) {
		this._move = true;
		this.angle = angle;
		
		updateSpeedComponents(this);
	};
	
	exports.vector = vector;
});