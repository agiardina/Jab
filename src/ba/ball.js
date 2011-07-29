define('jab/ba/ball', ['require','exports','jab/ba/element'], function (require,exports,element) {
	
	function Ball (spec) {
		this.init(spec);
	}
	
	var Element = element.Element,
		self = new Element();
	
	self.color = '#ff0000';
	self.speed =  5;
	self.movementType = 'Linear';
	
	self.update = function () {
		this.updatePos();
	};
	
	self.draw = function () {
		var cnx = app.cnx;
		cnx.fillStyle = this.color;
		cnx.beginPath();
		
		this.applyNewPosition();
		cnx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		cnx.closePath();
		cnx.fill();
	};
	
	Ball.prototype = self;
	exports.Ball = Ball;
	
});
