VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	score: 0,
	maxSpeed: 10,
	life: 10,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}

Game = {
	end: false,
	
	init:function(){
		this.backgroundMusic();
		for(var i = 0; i < document.getElementsByTagName('div').length; i++){
			document.getElementsByTagName('div')[i].style.display = 'none';
		}
		
		this.score();
		this.setLife();

		Game.canvas = document.createElement('canvas');
		Game.hit_canvas = document.createElement('canvas');

		Game.ctx = Game.canvas.getContext('2d');
		Game.hit_ctx = Game.hit_canvas.getContext('2d');

		Game.layout();

		window.addEventListener('resize', Game.layout, false);
		
		document.body.appendChild(Game.canvas);

		for(var i = 0; i < 4; i++){
			new Enemy(VAR.rand(1,VAR.maxSpeed)/1000);
		}

		Game.ship = new Ship();
		
		window.addEventListener('keydown', this.onKey, false);

		Game.animationLoop();

		shoot = new Audio('Laser_Shoot2.wav');
		boom = new Audio('Explosion5.wav');
	},
	
	layout:function(){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		VAR.d = Math.min(VAR.W, VAR.H);
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;

		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;

		Game.hit_ctx.fillStyle = 'red';
		Game.ctx.fillStyle = 'white';
		Game.ctx.strokeStyle = 'white';
		Game.ctx.lineWidth = 2;
		Game.ctx.lineJoin = 'round';
	},

	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;

			Game.ctx.clearRect(0,0,VAR.W, VAR.H);

			Game.ship.draw();
			Enemy.draw();
			Bullet.draw();
		}
	},

	score: function() {
		var score = document.getElementById('score');
		score.innerHTML = 'Score: ' + VAR.score;
	},

	onKey:function(event){
		if(event.keyCode==37 || event.keyCode==39 || event.keyCode==38 || event.keyCode==40 || event.keyCode==32){

			if(event.type=='keydown' && !Game['key_'+event.keyCode]){
				Game['key_'+event.keyCode] = true;
				if(event.keyCode == 37){
					Game.key_39 = false;
				}
				else if(event.keyCode == 39){
					Game.key_37 = false;
				}
			}
			if(event.keyCode == 32) {
				new Bullet();
			}
		}
	},

	backgroundMusic: function() {
		sound = new Audio('Canabalt.mp3');
		sound.volume = 0.5;
		sound.play();
	},

	stopGame: function() {
		VAR.life = 0;
		document.getElementById('life').innerHTML = 'Life: 0';
		document.getElementById('new-game').style.display = 'block';
		window.removeEventListener('keydown', this.onKey, false);
	},

	setLife: function() {
		if(VAR.life >= 0){
			document.getElementById('life').innerHTML = 'Life: ' + VAR.life;			
		}
		else
			document.getElementById('life').innerHTML = 'Life: 0';
	}
}
