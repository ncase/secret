(function(exports){

	// Singleton
	var Mouse = {
		x: 0,
		y: 0,
		pressed: false
	};
	exports.Mouse = Mouse;
	
	// Event Handling
	var target = document.getElementById("canvas");
	var onMouseMove,onTouchMove;
	
	target.addEventListener("mousedown",function(event){
	    Mouse.pressed = true;
	    onMouseMove(event);
	    publish("/mouse/down");
	},false);

	target.addEventListener("mouseup",function(event){
	    Mouse.pressed = false;
	    publish("/mouse/up");
	},false);

	target.addEventListener("mousemove",onMouseMove = function(event){
		Mouse.x = event.pageX;
		Mouse.y = event.pageY;
		publish("/mouse/move");
	},false);

	target.addEventListener("touchstart",function(event){
	    Mouse.pressed = true;
	    onTouchMove(event);
	    publish("/mouse/down");
	},false);

	target.addEventListener("touchend",function(event){
	    Mouse.pressed = false;
	    publish("/mouse/up");
	},false);

	target.addEventListener("touchmove",onTouchMove = function(event){
		Mouse.x = event.changedTouches[0].clientX;
		Mouse.y = event.changedTouches[0].clientY;
		publish("/mouse/move");
	},false);


})(window);