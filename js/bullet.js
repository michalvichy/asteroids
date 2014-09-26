Bullet.all = [];
Bullet.count = 0;
Bullet.active_count = 0;
Bullet.max = 5;
Bullet.speed = 0.022;
Bullet.life = 80;

function Bullet(){
	if(Bullet.active_count < Bullet.max){
		Bullet.active_count++;
		Bullet.count++;
		this.id = Bullet.count.toString();
		Bullet.all[this.id] = this;
		this.life = 0;
		this.x = Game.ship.x;
		this.y = Game.ship.y - Game.ship.r;
		shoot.play();
	}
}
Bullet.draw = function(){
	for(var bullet in Bullet.all) {

		for( var enemy in Enemy.all ){
			if(Enemy.all[enemy].collision(Bullet.all[bullet].x, Bullet.all[bullet].y)) {
				Bullet.all[bullet].life += Bullet.life;
				Enemy.all[enemy].remove();
				break;
			}
		}

		if(Bullet.all[bullet].life < Bullet.life) {

			Bullet.all[bullet].life++;
			Bullet.all[bullet].y -= 7;
			
			Game.ctx.beginPath();
			Game.ctx.arc(Bullet.all[bullet].x, Bullet.all[bullet].y, 3, 0, Math.PI*2);
			Game.ctx.closePath();
			Game.ctx.fill();
		}
		else {
			Bullet.active_count--;
			delete Bullet.all[bullet];
		}
	}
};
