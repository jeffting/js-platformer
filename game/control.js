//game loop with update and draw functions
var player = null;

function mainLoop() {
    gameArea.clear();
    for(var i = 0; i < map.length; i++){
        map[i].draw();
    }
    entities.each(function(entity) {
        entity.update();
        entity.draw();
    });
    requestAnimationFrame(mainLoop);
}

function startGame() {
    let player = new Player(30, 30, "red", 30, 120);
    entities.push(player);
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    gameArea.start();
}

// Start things off
requestAnimationFrame(mainLoop);
