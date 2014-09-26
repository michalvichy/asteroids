Enemy.all = [];
Enemy.count = 0;

Enemy.images = ['img/asteroida1.png', 'img/asteroida2.png', 'img/asteroida3.png'];

function Enemy(speed) {
	Enemy.count++;
	this.id = Enemy.count.toString();
	Enemy.all[this.id] = this;

	this.x = VAR.rand(50, VAR.W-50);
	this.y = -10;
	this.width = 50;
	this.speed = speed;
	this.points = [];
	this.r = 0.07;

	this.enemyImage = new Image();
	this.enemyImage.src = Enemy.images[VAR.rand(0,Enemy.images.length-1)];

	var angle = VAR.rand(0,30);
	while(angle < 360){
		angle += VAR.rand(50, 70);

		this.points.push({
			x:Math.sin(Math.PI/180*angle)*this.r,
			y:Math.cos(Math.PI/180*angle)*this.r 
		});
	}
}

Enemy.prototype.draw = function() {
	if(this.y > VAR.H + 100){
		this.destroy();
	}

	Game.ctx.beginPath();
	for (var i = 0; i < this.points.length; i++) {
		Game.ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x, this.points[i].y*VAR.d+this.y);
		Game.hit_ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x, this.points[i].y*VAR.d+this.y);
	}
	Game.ctx.closePath();
	// Game.ctx.stroke();

	Game.ctx.drawImage(this.enemyImage, this.x - this.r*VAR.d, this.y - this.r*VAR.d, this.r*2*VAR.d, this.r*2*VAR.d );

	this.y += this.speed*VAR.d;		
	
};

Enemy.prototype.collision = function(x, y) {
	if(x > this.x - this.r*VAR.d && x < this.x + this.r*VAR.d && y > this.y - this.r*VAR.d && y < this.y + this.r*VAR.d){
		Game.ctx.clearRect(this.x - this.r*VAR.d, this.y - this.r*VAR.d, this.r*2*VAR.d, this.r*2*VAR.d);
		Game.hit_ctx.beginPath();
		
		for (var i = 0; i < this.points.length; i++) {
			Game.hit_ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x*VAR.d+this.x, this.points[i].y*VAR.d+this.y);
		}
		Game.hit_ctx.closePath();
		Game.hit_ctx.fill();

		if(Game.hit_ctx.getImageData(x, y, 1, 1).data[0] == 255){
			return true;
		}
	}
	return false;
}

Enemy.prototype.remove = function() {
	VAR.score++;
	Game.score();
	boom.play();
	new Enemy(VAR.rand(1, VAR.maxSpeed)/1000);
	delete Enemy.all[this.id];
}

Enemy.draw = function() {
	for( var enemy in Enemy.all ){
		Enemy.all[enemy].draw();
	}
}

Enemy.prototype.destroy = function() {
	delete Enemy.all[this.id];
	for(var i = 0; i < VAR.rand(1,2); i++){
		new Enemy(VAR.rand(1, VAR.maxSpeed)/1000);
	}
	VAR.life--;
	Game.setLife();
	if(VAR.life == 0){
		Game.ship.destroyed = true;
		Game.stopGame();
	}
}
