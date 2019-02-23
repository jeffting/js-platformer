//game loop with update and draw functions
var player = null;

function mainLoop() {
    gameArea.clear();
    update();
    draw();

    requestAnimationFrame(mainLoop);
}

function startGame() {
    player = new Player(30, 30, "red", 30, 120);
    hud = new HUD(player, CANVAS_WIDTH, 50, 0,0);
    gameArea.start();
}

// Start things off
requestAnimationFrame(mainLoop);

function update(){
    for(var i = 0; i < map.length; i++){
        map[i].draw();
    }
    controlCharacter();
    player.update();

    if (player.bulletArray.length) {
        player.bulletArray.forEach((b) => {
            b.update();
            b.draw();
        })
    }
    // console.log("update() called");
}

function draw(){
    player.draw();
    hud.draw();
    // console.log("draw() called");
}

function controlCharacter() {
    player.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) { player.moveleft(); }
    if (gameArea.keys && gameArea.keys[39]) { player.moveright(); }
    if (gameArea.keys && gameArea.keys[38]) { player.moveup(); }
    if (gameArea.keys && gameArea.keys[40]) { player.movedown(); }
    if (gameArea.keys && !gameArea.keys[39] && !gameArea.keys[37] && player.speedX != 0 && player.can_jump) {
        player.speedX = player.speedX > 0 ? player.speedX -0.5 : player.speedX + 0.5;
    }
    if (gameArea.keys && gameArea.keys[32]) { player.shoot(); }
}

