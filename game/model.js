//CONTENTS
//major game constants and variables, ie state, gravity, etc.

//state variables, ie MENU, GAME, DEAD, WIN

//containers for all the drawables (to be drawn in this order)
// --Background
// --Level (ie platoforms and walls)
// --Items
// --AIs
// --Player
// --UI

//each drawable will have an update() and draw() function (the platoforms and walls, for example, can have
// update function too for future use but will probably not use them in initial, basic game)

var gameArea = {
    start : function() {
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function() {
        CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function Bullet(width, height, color, x, y, direction) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = direction === "right" ? x + 23 : x - 23;
    this.y = y + 10;
    this.speed = direction === "right" ? 10 : -10;
    this.update = function() {
        CTX.lineWidth = "3";
        CTX.beginPath();
        CTX.strokeStyle = "black";
        CTX.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        CTX.fillStyle = "black";
        CTX.fill();
        CTX.stroke();
    }
    this.draw = function() {
        this.x += this.speed;
    }
}

function Player(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;
    this.can_jump = true;
    this.can_shoot = true;
    this.has_ammo = true;
    this.direction = "right";   
    this.update = function() {
        /**  rectangle*/
        // CTX.fillStyle = color;
        // CTX.fillRect(this.x, this.y, this.width, this.height);
        /*** stick figure */
        CTX.beginPath();              
        CTX.lineWidth = "5";
        CTX.strokeStyle = "red";  // Green path
        CTX.moveTo(this.x, this.y);
        CTX.lineTo(this.x, this.y + 30);
        CTX.lineTo(this.x - 10, this.y + 45);
        CTX.moveTo(this.x,this.y + 30);
        CTX.lineTo(this.x + 10, this.y + 45);
        CTX.moveTo(this.x - 15, this.y + 10);
        CTX.lineTo(this.x + 15, this.y + 10);
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(this.x, this.y - 10, 10, 0, 2 * Math.PI);
        CTX.fillStyle = "red";
        CTX.fill();
        CTX.stroke();  // Draw it
    }
    this.draw = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();        
    }    
    this.hitBottom = function() {
        var rockbottom = CANVAS_HEIGHT - (this.height + 20);
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            player.can_jump = true;
        }
    }
}