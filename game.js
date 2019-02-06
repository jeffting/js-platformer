//reference to our game board where we will draw everything
const CANVAS_SIZE = 500;

var canvas = document.getElementById("game-canvas");
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

//reference to canvas context allows us to draw on it
var ctx = canvas.getContext("2d");
var startPos = {
	x : 25,
	y: 25
}

function update(player) {

	//always need to clear the previous drawings on cansave
	ctx.clearRect(0,0, CANVAS_SIZE, CANVAS_SIZE)
	
	ctx.fillStyle = 'red';
	ctx.fillRect(player.x, player.y, player.size, player.size)
}

//from character.js
var player = new character(10, 50, startPos.x, startPos.y);

update(player)



window.addEventListener("keydown", move(player));

function move(obj) {
	console.log(obj)
	//this is called a closure andn is a neat feature of js
	return function(e){
		 if (e.keyCode == '38') {
	        // up arrow
	        obj.y -= obj.speed;
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	        obj.y += obj.speed;
	    }
	    else if (e.keyCode == '37') {
	       // left arrow
	       obj.x -= obj.speed;
	    }
	    else if (e.keyCode == '39') {
	       // right arrow
	       obj.x += obj.speed;
	    }

	    //wrapping so player can't dissapear off canvas
	    if(obj.x > CANVAS_SIZE)
	    {
	    	obj.x = 0
	    }
	    else if(obj.x < 0 - obj.size)
	    {
	    	obj.x = CANVAS_SIZE
	    }
	    else if(obj.y > CANVAS_SIZE)
	    {
	    	obj.y = 0
	    }
	    else if(obj.y < 0 - obj.size)
	    {
	    	obj.y = CANVAS_SIZE
	    }

	    //redraw the player now that he has moved
	    update(obj)
	}
}
