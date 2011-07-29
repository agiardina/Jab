define('jab/ba/pool', ['require','exports','jab/ba/element'], function (require,exports,element) {
	function Pool (spec) {
		this.init(spec);
	}
	
	var Element = element.Element; 
	self = new Element({
		x:0,
		y:0
	});
	
	self.data = [];
	
	self.push = function (el) {
		this.data.push(el);
	};
	
	self.update = function () {
		this.updateElements();
		this.testWallsCollision();
		this.testElementsCollision();
	};
	
	/**
	 * Update position of the elements inside the pool
	 */
	self.updateElements = function () {
		var i=0,
			data = this.data,
			len = data.length,
			el;
		
		for (;i<len;i++) {
			el = data[i];
			el.update();
		}
	};
	
	self.testWallsCollision = function (el) {
		var i=0,
			data = this.data,
			len = data.length,
			el;
		
		if (this.closed) {
			for (;i<len;i++) {
				el = data[i];
				if (el.nextX >= this.width || el.nextX <= this.x) {
					el.moveAngle(180 - el.angle);
				} else if (el.nextY >= this.height || el.nextY <= this.y) {
					el.moveAngle(360 - el.angle);
				}
				
				
				if (el.nextX > this.width) {
					el.nextX = this.width;
				} else if (el.nextX < 0) {
					el.nextX = 0;
				}
				
				if (el.nextY > this.height) {
					el.nextY = this.height;
				} else  if (el.nextY < 0) {
					el.nextY = 0;
				}
			}
		}
	};	
	
	/**
	 * @todo This is not efficient. Improve it!
	 */
	self.testElementsCollision = function () {
		var data = this.data,
			i=0,j,
			el1,el2,
			len = data.length
		;

		for (;i<len;i++) {
			el1 = data[i];
			for (j=i+1;j<len;j++) {
				el2 = data[j];
				if (this.testCollision(el1,el2)) {
					this.collide(el1,el2);
				}
			}
		}
	};
	
	/**
	 * Test the collision between two element inside the pool
	 */
	self.testCollision = function (el1, el2) {
		var dx = el1.nextX - el2.nextX,
			dy = el1.nextY - el2.nextY,
			squareDistance = ((dx * dx) + (dy * dy)),
			squareRadius = (el1.radius + el2.radius) * (el1.radius + el2.radius);
		
		
		if (squareDistance < squareRadius) {
			return true;
		} else {
			return false;
		}
	};
	
	self.collide = function (el1,el2) {
		var dx = el1.nextX - el2.nextX,
			dy = el1.nextY - el2.nextY,
			
			collisionAngle = Math.atan2(dy,dx),
			angle1 = Math.atan2(el1.speedY,el1.speedX),
			angle2 = Math.atan2(el2.speedY,el2.speedX),
			
			speed1X = el1.speed * Math.cos(angle1 - collisionAngle),
			speed1Y = el1.speed * Math.sin(angle1 - collisionAngle),
			speed2X = el2.speed * Math.cos(angle2 - collisionAngle),
			speed2Y = el2.speed * Math.sin(angle2 - collisionAngle),
		
			//Applying the mass to speedX
			newSpeed1X = (speed1X * (el1.mass - el2.mass)  +  speed2X * (2 * el2.mass))/(el1.mass + el2.mass),
			newSpeed2X = (speed2X * (el2.mass - el1.mass)  +  speed1X * (2 * el1.mass))/(el1.mass + el2.mass)
		;
			
		el1.speedX = (newSpeed1X * Math.cos(collisionAngle)) + (speed1Y * Math.cos(collisionAngle + Math.PI/2));
		el1.speedY = (newSpeed1X * Math.sin(collisionAngle)) + (speed1Y * Math.sin(collisionAngle + Math.PI/2));
		
		el2.speedX = (newSpeed2X * Math.cos(collisionAngle)) + (speed2Y * Math.cos(collisionAngle + Math.PI/2));
		el2.speedY = (newSpeed2X * Math.sin(collisionAngle)) + (speed2Y * Math.sin(collisionAngle + Math.PI/2));
		
		
		el1.nextX = el1.nextX + el1.speedX;
		el1.nextY = el1.nextY + el1.speedY;
		el2.nextX = el2.nextX + el2.speedX;
		el2.nextY = el2.nextY + el2.speedY;
		
	};
	
	self.draw = function () {
		var data = this.data,
			i,
			len = data.length;
		
		for (i=0;i<len;i++) {
			data[i].draw();
		}
	};
	
	Pool.prototype = self;
	exports.Pool = Pool;
});