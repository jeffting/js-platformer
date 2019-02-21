//major game constants and variables, ie state, gravity, base speed, etc.

//state variables, ie MENU, GAME, DEAD, WIN

const CANVAS_HEIGHT = window.innerHeight - 100;
const CANVAS_WIDTH = window.innerWidth - 200; //1920 : 1080 ratio roughly
const BULLET_DELAY = 150;
const AMMO_DELAY = 2000;

var canvas = document.getElementById("game-canvas");
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

//reference to canvas context allows us to draw on it
var CTX = canvas.getContext("2d");