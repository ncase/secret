function Secret(config){

	var self = this;

	// Creating DOM
	self.dom = document.createElement("div");
	self.dom.className = "secret";
	self.bar = document.createElement("div");
	self.bar.id = "secret_bar";
	self.bar.style.background = config.color;
	self.info = document.createElement("div");
	self.info.id = "secret_info";

	// Appending children
	self.dom.appendChild(self.bar);
	self.dom.appendChild(self.info);
	document.getElementById("secrets").appendChild(self.dom);

	// Stats
	self.id = config.id;
	Secret[self.id] = self;
	self.strength = 0;

	// Updating this thang
	var width = 0;
	self.update = function(){

		var s = Math.round(self.strength*100);

		// Width!
		width = width*0.7 + s*0.3;
		self.bar.style.width = width+"%";

		// The text!
		var text = "";
		if(s==100){
			text += "INVINCIBLE!";
		}else if(s>=75){
			text += "RESILIENT:";
		}else if(s>=50){
			text += "STRONG:";
		}else if(s>=25){
			text += "VULNERABLE:";
		}else{
			text += "FRAGILE:";
		}
		text += " "+s+"%";
		self.info.innerHTML = text;

	};

	// How does a new Opinion affect this?
	self.inputOpinion = function(opinion){

		if(self.strength==1) return; // LOCKED IN!
		
		if(opinion==0) return; // doesn't affect

		// Positive opinion
		if(opinion>0){
			self.strength += 0.05;
		}

		// Negative opinion
		if(opinion<0){
			var s = self.strength;
			if(s==1){
				self.strength -= 0.00; // INVINCIBLE! :D
			}else if(s>=0.75){
				self.strength -= 0.02; // RESILIENT
			}else if(s>=0.50){
				self.strength -= 0.05; // STRONG
			}else if(s>=0.25){
				self.strength -= 0.10; // VULNERABLE
			}else{
				self.strength -= 0.20; // FRAGILE
			}
		}

		if(self.strength<0) self.strength=0;
		if(self.strength>1) self.strength=1;

	}

}

Secret.adjustContainer = function(){
	var height = secrets.length*80 + (secrets.length-1)*25;
	document.getElementById("secrets").style.top = ((450-height)/2)+"px";
};