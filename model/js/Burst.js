Burst.WAVE_EDGE = 120;
Burst.RECHARGE = 10;

function Burst(){

	var self = this;

	self.x = 0;
	self.y = 0;

	self.wave = 0;
	self.waveSpeed = 5;
	self.waveEdge = 200;
	self.ratio = 0.62; // inverse of golden ratio

	self.dead = false;

	self.hitTest = function(x,y){

		var outer = (self.wave>self.waveEdge) ? (self.waveEdge+Math.sqrt(self.wave-self.waveEdge)) : self.wave;
		var inner = (self.wave<50) ? 0 : self.wave-50;

		// The burst is already dead
		if(inner>outer) return false;

		// calcs
		var dx = Math.pow(x-self.x,2);
		var dy = Math.pow(y-self.y,2);

		// NO, if not within outer ellipse.
		if(dx/Math.pow(outer,2) + dy/Math.pow(outer*self.ratio,2) > 1){
			return false;
		}

		// NO, if within inner ellipse.
		if(dx/Math.pow(inner,2) + dy/Math.pow(inner*self.ratio,2) <= 1){
			return false;
		}

		// YES OTHERWISE
		return true;

	};

	self.update = function(){
		self.wave += self.waveSpeed;
		if(self.wave > self.waveEdge+100){
			self.dead = true;
		}
	};

	self.draw = function(ctx){
		
		// Save
		ctx.save();

		// Transform context
		ctx.translate(self.x, self.y);
		ctx.scale(1, self.ratio);

		// Shockwave Gradient
		if(self.wave<50){
			var innerAlpha = Math.round(100*(1-self.wave/50))/100;
			var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, self.wave);
			gradient.addColorStop(0, 'rgba(255,255,255,'+innerAlpha+')');
			gradient.addColorStop(1, 'rgba(255,255,255,1)');
		}else{
			var gradient = ctx.createRadialGradient(0, 0, self.wave-50, 0, 0, self.wave);
			gradient.addColorStop(0, 'rgba(255,255,255,0)');
			gradient.addColorStop(1, 'rgba(255,255,255,1)');
		}

		// Draw the awesome SHOCKWAVE circle. (sqrt for ease-out)
		ctx.beginPath();
		var edge = (self.wave>self.waveEdge) ? (self.waveEdge+Math.sqrt(self.wave-self.waveEdge)) : self.wave;
		ctx.arc(0, 0, edge, 0, 2*Math.PI, false);
		ctx.fillStyle = gradient;
		ctx.fill();

		// Restore
		ctx.restore();

	};

}

subscribe("/init",function(){

	/*var rechargeBurst = -1;
	subscribe("/update",function(){
		if(rechargeBurst>=0) rechargeBurst--;
	});

	subscribe("/mouse/down",function(){
		
		if(rechargeBurst>=0) return;

		var burst = new Burst();
		bursts.push(burst);
		burst.x = Mouse.x;
		burst.y = Mouse.y;
		burst.waveEdge = Burst.WAVE_EDGE;
		rechargeBurst = Burst.RECHARGE;

	});*/

	subscribe("/mouse/down",function(){
		if(bursts.length>0) return; // ONLY ONE
		var burst = new Burst();
		bursts.push(burst);
		burst.x = Mouse.x;
		burst.y = Mouse.y;
		burst.waveEdge = Burst.WAVE_EDGE;
	});

});
