loadImages([
	{id:"peep", src:"img/peep.png"},
	{id:"bubble", src:"img/bubble.png"}
]);

subscribe("/init",init);

function init(){
	
	Burst.WAVE_EDGE = 120;
	Peep.SCALE = 0.3;
	Bubble.SCALE = 0.3;

	secrets.push(new Secret({
		id:"plop",
		color:"#FF3366"
	}));

	Secret.adjustContainer();

	addPeeps([

		// pro
		[398.1, 203.35, 1],
		[450, 179, 1],
		[412.1, 254, 1],
		[502.9, 249, 1],
		[503.05, 193, 1],
		[456, 267, 1],

		// anti
		[645.15, 201.35, -1],
		[693.05, 174, -1],
		[658.15, 248, -1],
		[748.05, 255, -1],
		[755.1, 188, -1],
		[707.05, 229, -1],
		[700.05, 274, -1],

		// meh
		[600.4, 246.4, 0],
		[576.05, 214.75, 0],
		[558.45, 240.4, 0]

	],0,60);

}