define.baseUrl = '../../';

define('demo.balls', ['require','jab/ba/pool','jab/ba/ball'], function (require,pool,ball) {
	
	
	function drawScreen(all) {
		context.fillStyle = '#000';
		context.fillRect(0,0,canvas.width,canvas.height);
		
		for (var i=0,len=all.length;i<len;i++) {
			all[i].update();
			all[i].draw();
		}
	};
	
	function screen1() {
		var canvas = document.getElementById('canvas'),
			ball,

			pool = new Pool ({
				context:context,
				closed:true,
				width:canvas.width,
				height:canvas.height,
				x:0,
				y:0
			}),
			i=0,
			color1,color2,color3,
			speed,radius,angle
		;
			
		
		for (i=0;i<25;i++) {
			color1 = Math.floor(Math.random() * 255);
			color2 = Math.floor(Math.random() * 255);
			color3 = Math.floor(Math.random() * 255);
			radius = Math.floor(Math.random() * 20) + 2;
			speed = 25 - radius;
			angle = Math.floor(Math.random() * 360);

			ball = new Ball({
				context:context,
				canvas:canvas,
				color: 'rgb(' + color1 + ','+color2+','+color3+')',
				speed:3,
				x: Math.random() * pool.width,
				y: Math.random() * pool.height,
				angle: angle,
				radius: radius,
				mass: radius * 8,
				friction: 0.005,
				bouncing: true
			});
			
			pool.push(ball);
		}
		
		
		setInterval(function () {
			drawScreen([pool]);
		},33);
	}
	
	/**
	 * Entry point for the application
	 */
	function runApp() {
		screen1();
	}
	
	var Pool = pool.Pool,
		Ball = ball.Ball,
		canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');
	
	runApp();
});