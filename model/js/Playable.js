window.bursts = [];
window.peeps = [];
window.bubbles = [];
window.secrets = [];

window.canvas = document.getElementById("canvas");
window.ctx = canvas.getContext("2d");

// Reset
function reset(){
	window.bursts = [];
	window.peeps = [];
	window.bubbles = [];
	window.secrets = [];
	document.getElementById("secrets").innerHTML = "";
}

// Update
function update(){

	publish("/update");

	updateObjects(bursts);
	updateObjects(peeps);
	updateObjects(bubbles);
	updateObjects(secrets);

	// Depth sooooort
	bubbles.sort(function(a,b){ return a.y-b.y; });

}
function updateObjects(objects){
	for(var i=0;i<objects.length;i++){
		var o = objects[i];
		o.update();
		if(o.dead){
			objects.splice(i,1);
			i--;
		}
	}
}

// Render
function render(){
	
	publish("/render");

	ctx.clearRect(0,0,canvas.width,canvas.height);

	renderObjects(bursts);
	renderObjects(peeps);
	renderObjects(bubbles);

}
function renderObjects(objects){
	for(var i=0;i<objects.length;i++) objects[i].draw(ctx);
}

// Request Animation Frame shim
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback){ window.setTimeout(callback, 1000/60); };
})();

// Stats
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
//document.body.appendChild(stats.domElement);

// Actually start rendering & update loop
window.redrawCanvas = true;
(function animloop(){
	requestAnimationFrame(animloop);
	if(window.onScreen && window.redrawCanvas){
		stats.begin();
		render();
		stats.end();
		window.redrawCanvas = false;
	}
})();
setInterval(function(){
	if(window.onScreen){
		update();
		window.redrawCanvas = true;
	}
},1000/30);