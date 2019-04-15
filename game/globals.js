//major game constants and variables, ie state, gravity, base speed, etc.

//state variables, ie MENU, GAME, DEAD, WIN

const CANVAS_HEIGHT = window.innerHeight - 100;
const CANVAS_WIDTH = window.innerWidth - 392;
const BLOCK_SIZE = 50;
const BULLET_DELAY = 150;
const AMMO_DELAY = 2000;
const MAX_GRAVITY = 12;

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SPACE = 32;
const KEY_ESCAPE = 27;
const KEY_ENTER = 13;

//gameState constants
const INTRO_STATE = "INTRO"; //intro cutscene state
const MENU_STATE = "MENU";
const PLAY_STATE = "PLAY"; 
const DEAD_STATE = "DEAD";
const WIN_STATE = "WIN";

//start off with the text intro
var gameState = INTRO_STATE;

var doorUnlocked = false;

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

var images = {
    list: {},
    load: function(name, src) {
        this.list[name] = new Image();
        this.list[name].ready = false;
        this.list[name].onload = function(img) {
            img.ready = true;
        }
        this.list[name].src = src;
    },
    is_ready: function(name) {
        return this.list[name].ready;
    },
    get: function(name) {
        return this.list[name];
    }
};
images.load("brawler", "angry_face.png");
images.load("key", "key.png");
images.load("gate", "gate.png");
images.load("heart", "heart.png");
images.load("key_outline", "key_outline.png");
images.load("ammo", "bullet-icon.png");
images.load("flames", "flames.png");

var BLANK = [

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];


function sprite (options) {
				
    var spr = {};
                    
    spr.context = options.context;
    spr.width = options.width;
    spr.height = options.height;
    spr.image = options.image;
    spr.frames = options.frames;
    spr.drawX = options.drawX;
    spr.drawY = options.drawY;
    spr.curFrame = 0;
    spr.ticks = 0;

    spr.draw = function() {

        let viewport = Viewport.getInstance();
		let view_coords = viewport.mapToViewport(spr.drawX, spr.drawY);
		let view_x = view_coords[0];
        let view_y = view_coords[1];
        
        spr.context.drawImage(
        spr.image,
        spr.width * spr.curFrame,
        0,
        spr.width,
        spr.height,
        view_x,
        view_y -15,
        100, //the size of the image drawn
        100
        );
        
      
    
    };

    spr.update = function() {

        if(spr.ticks === 0) {
            spr.curFrame++;
        }

        spr.ticks++;

        if(spr.ticks >= 1000/90){
            spr.ticks = 0;
        }

        if(spr.curFrame === spr.frames)
        {
            spr.curFrame = 0;
        }
    }

    return spr;
}