//example of files containing classes (or in this case js prototypes)

//this is a prototype, it acts as a class
function character(speed, size, x, y) {
	this.size = size;
	this.speed = speed;
	this.x = x;
	this.y = y;
}

//
var waveAt = function(name) {
	for(var i = 0; i < 5; i++)
	{
		console.log("Hello " + name)
	}
}