/***

On scroll, tell each playable iframe whether they're on screen,
and if so, how far they are along the page.

Parallax Parameter:
< 0: below viewing screen
0 < x < 1: on screen
> 1: above viewing screen

Pick the last one on screen to be the one being played

***/
window.onscroll = function(){
	var scrollY = window.pageYOffset;
	var innerHeight = window.innerHeight;
	var playables = document.querySelectorAll("#article iframe, .splash.intro");
	var messages = [];
	var lastOneOnScreen = 0;

	// Calculate parallax, and is it the last one on screen?
	for(var i=0;i<playables.length;i++){
		var p = playables[i];
		var top = p.offsetTop-innerHeight;
		var bottom = p.offsetTop+parseInt(p.height=="100%" ? innerHeight : p.height);
		var parallax = (scrollY-top)/(bottom-top); // from 0 to 1
		if(0<parallax && parallax<1) lastOneOnScreen = i;
		messages[i] = {
			//onScreen: false,
			onScreen: (0<parallax && parallax<1),
			parallax: parallax
		};
	}

	// Send all the messages
	//messages[lastOneOnScreen].onScreen = true;
	for(var i=0;i<messages.length;i++){
		var p = playables[i];
		var m = messages[i];
		p.contentWindow.postMessage(m,"*");
	}

};
window.addEventListener("load",function(){

	window.onscroll();

	return;

	// Load Markdown
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("article").innerHTML = marked(xhr.responseText);
			setTimeout(function(){
				window.onscroll(); // Scroll - adjust playables
				// Only do this AFTER all iframes load?
			},100);
        }
    }
    xhr.open("GET", "index.md", true);
    xhr.send();    

},false);