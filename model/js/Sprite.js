function Sprite(config){

	var self = this;

	// Drawing Properties
	self.x = 0;
	self.y = 0;
	self.scale = 1;
	self.currentFrame = 0;

	// Spritesheet
	self.width = config.width || config.frameWidth;
	self.height = config.height || config.frameHeight;
	self.pivotX = (config.pivotX===undefined) ? 0.5 : config.pivotX;
	self.pivotY = (config.pivotY===undefined) ? 1 : config.pivotY;
	self.spritesheet = config.spritesheet;
	self.frameWidth = config.frameWidth;
	self.frameHeight = config.frameHeight;
	self.frameTotal = config.frameTotal;

	// Animation
	self.timer = 0;
	self.bounce = 1;
	self.bounceVelocity = 0;
	self.bounceSpring = 0.4;
	self.bounceDampening = 0.64;
	self.sway = 0;
	self.swayVelocity = 0;
	self.swaySpring = 0.2;
	self.swayDampening = 0.81;
	self.visible = true;
	self.rotation = 0;
	self.alpha = 1;

	// Update
	self.update = function(){

		// Animation
		self.timer++;
		self.bounce += self.bounceVelocity;
		self.bounceVelocity += (1-self.bounce) * self.bounceSpring;
		self.bounceVelocity *= self.bounceDampening;
		self.sway += self.swayVelocity;
		self.swayVelocity += (0-self.sway) * self.swaySpring;
		self.swayVelocity *= self.swayDampening;

	};

	// Draw
	self.draw = function(ctx){

		// Visible?
		if(!self.visible) return;
		
		ctx.save();
		
		// Translate
		ctx.translate(self.x,self.y);

		// Sway & Bounce
		ctx.scale(self.scale,self.scale);
		ctx.scale(self.bounce,1/self.bounce);
		ctx.rotate(self.rotation+self.sway);

		// Alpha?
		if(self.alpha<1) ctx.globalAlpha=self.alpha;

		// Draw spritesheets
		var width = Math.floor(self.spritesheet.width/self.frameWidth);
		var sx = (self.currentFrame%width)*self.frameWidth;
		var sy = Math.floor(self.currentFrame/width)*self.frameHeight;
		var sw = self.frameWidth;
		var sh = self.frameHeight;
		var dx = -self.width*self.pivotX;
		var dy = -self.height*self.pivotY;
		var dw = self.width;
		var dh = self.height;
		ctx.drawImage(self.spritesheet, sx,sy,sw,sh, dx,dy,dw,dh);
		
		ctx.restore();

	};

}