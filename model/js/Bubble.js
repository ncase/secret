Bubble.SCALE = 0.37;

function Bubble(){

	var self = this;
	Sprite.call(self,{
		pivotX:0.5, pivotY:1.0,
		spritesheet: images.bubble,
		frameWidth:240, frameHeight:240,
		frameTotal:3
	});

	self.scale = Bubble.SCALE;

	var self = this;

	self.x = 0;
	self.y = 0;
	self.driftSpeed = -0.3;
	self.duration = 45;
	self.alpha = 0;

	self.dead = false;

	self.setOpinion = function(opinion){
		switch(opinion){
			case -1: self.currentFrame=0; break;
			case 0: self.currentFrame=2; break;
			case 1: self.currentFrame=1; break;
		}
	}

	self.update = function(){

		// Drift
		self.y += self.driftSpeed;

		// Alpha
		if(self.duration>5){
			self.alpha+=0.2;
			if(self.alpha>1) self.alpha=1;
		}else{
			self.alpha-=0.2;
			if(self.alpha<0) self.alpha=0;
		}

		// Duration and deadness
		self.duration--;
		if(self.duration<0){
			self.dead = true;
		}

	};

}