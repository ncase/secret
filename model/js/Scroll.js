window.onScreen = (window.top == window);
window.addEventListener("message", function(event){
	window.onScreen = event.data.onScreen;
}, false);