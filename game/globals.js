//major game constants and variables, ie state, gravity, base speed, etc.

//state variables, ie MENU, GAME, DEAD, WIN

const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 1400; //1920 : 1080 ratio roughly
const BLOCK_SIZE = 40;

var canvas = document.getElementById("game-canvas");
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

//reference to canvas context allows us to draw on it
var CTX = canvas.getContext("2d");

//object used as ENUM 
var BlockTypes = {
	PLATFORM : 1,
	props: {
		1: {color: "#000"}
	}
}
