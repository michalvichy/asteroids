function Ship() {
	this.x = VAR.W / 2;
	this.y = 0.85 * VAR.H;
	this.r = 0.02 * VAR.H;
	this.shift = 15;
	this.destroyed = false;
	this.width = 0.025 * VAR.H;
	this.corners = [];
	this.speed = 13;
}

Ship.prototype.draw = function() {
	if(!this.destroyed) {
		if(this.collision()){
			this.destroyed = true;
			Game.end = true;
			Game.stopGame();
		}

		else {
			if(Game.key_37 || Game.key_39){
				this.x=this.x + this.speed*(Game.key_37 ? -1 : 1)
			}

			if(this.x < 0) {
				this.x = VAR.W;
			}
			if(this.x > VAR.W){
				this.x = 0;
			}

			var shipImage = new Image();
			shipImage.src = 'img/statek.png';

			Game.ctx.drawImage(shipImage, this.x - this.width, this.y - this.width, this.width*2, this.width*2 )
		
			this.corners = [{x: this.x - this.width, y: this.y - this.width}, {x: this.x + this.width, y: this.y - this.width}, {x: this.x+this.width, y: this.y+this.width}, {x: this.x+this.width, y:this.y-this.width}]

		}
	}
}

Ship.prototype.collision = function() {
	for(var i = 0; i < this.corners.length; i++){
		for(var enemy in Enemy.all){
			if(Enemy.all[enemy].collision(this.corners[i].x, this.corners[i].y)){
				Enemy.all[enemy].remove();
				return true;
			}
		}
		return false;
	}
}
