Peep.SCALE = 0.37;

function Peep(){

	var self = this;
	Sprite.call(self,{
		pivotX:0.5, pivotY:1.0,
		spritesheet: images.peep,
		frameWidth:200, frameHeight:300,
		frameTotal:9
	});

	self.scale = Peep.SCALE;
	self.direction = Math.floor(Math.random()*3);
	self.animState = 0;

	self.opinions = {
		// OPINIONS GO HERE
	};

	self.scream = function(){

		// Add bubble
		var bubble = new Bubble();
		bubble.x = self.x;
		bubble.y = self.y - self.scale*250;
		bubble.setOpinion(self.opinions.plop);
		bubbles.push(bubble);

		// Change main stats
		Secret.plop.inputOpinion(self.opinions.plop);

	};

	var tick = -1;
	var _prevUpdate = self.update;
	self.update = function(){

		// Am I in a shockwave?
		if(self.animState==0){
			
			// Hit Test
			var collided = false;
			for(var i=0;i<bursts.length;i++){
				if(bursts[i].hitTest(self.x,self.y)){
					collided = true;
					break;
				}
			}

			// If collided, SCREAM
			if(collided){
				self.animState = 2;
				self.bounce = 1.2;
				tick = 20;
				self.scream();
			}

		}
	
		// Eyes open? Blink! And face in DIFFERENT direction.
		if(self.animState==0){
			if(Math.random()<1/150){ // blink once every 5 seconds
				self.animState = 1;
				self.bounce = 1.1;
				self.direction = Math.floor(Math.random()*3);
				tick = 5;
			}
		}
		
		// Blinking or screaming? Back to eyes open.
		if(self.animState==1 || self.animState==2){
			if(tick<0){
				self.animState = 0;
			}
			tick--;
		}

		// The right frame
		self.currentFrame = self.direction*3 + self.animState;

		// Previous update
		_prevUpdate.call(self);

	}
	
}

function addPeeps(peepConfigs,offsetX,offsetY){

	// Sort by Y first
	peepConfigs = peepConfigs.sort(function(a,b){
		return a[1]-b[1];
	});

	// Then, create each one!
	for(var i=0;i<peepConfigs.length;i++){
		var conf = peepConfigs[i];
		var peep = new Peep();
		peep.x = conf[0] + offsetX; // because Flash exports the origin point,
		peep.y = conf[1] + offsetY; // which is the wrong point, whoops
		peep.x += (Math.random()-0.5)*20;
		peep.y += (Math.random()-0.5)*10;
		peep.opinions = {
			plop: conf[2]
		};
		peeps.push(peep);
	}

}