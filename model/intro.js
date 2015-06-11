loadImages([
	{id:"peep", src:"img/peep.png"},
	{id:"bubble", src:"img/bubble.png"}
]);

subscribe("/init",init);

window.Secret = {
	plop:{
		inputOpinion: function(){}
	}
};

function init(){
	
	Burst.WAVE_EDGE = 300;
	Peep.SCALE = 0.5;
	Bubble.SCALE = 0.5;

	addPeeps([
		[70.05, 216.6, 1],
		[179.85, 216.6, 0],
		[296.5, 216.6, -1],
		[406.3, 216.6, -1],
		[519.6, 216.6, 0],
		[629.4, 216.6, 1],
		[741.45, 216.6, -1]
	],0,60);

}