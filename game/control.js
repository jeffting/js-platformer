//game loop with update and draw functions
var player = null;
let viewport = Viewport.getInstance();
var playerID = null;
function mainLoop() {
    gameArea.clear();
    //Possible bug -> drawing map before viewport updates.
    for(var i = 0; i < map.length; i++){
        map[i].draw();
    }
    entities.each(function(entity) {
        entity.update();
        if (entity.id === playerID) {
            viewport.update(entity.x, entity.y);
        }
        entity.draw();
    });
    requestAnimationFrame(mainLoop);
}

function startGame() {
    let player = new Player(30, 30, "red", playerStartX, playerStartY);
    viewport.update(playerStartX, playerStartY);
    playerID = player.id;
    entities.push(new Gate(gateX, gateY));
    entities.push(new Key(keyStartX, keyStartY));
    entities.push(player);
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    entities.push(new Brawler("green", 500, 120));
    gameArea.start();
}

// Start things off
requestAnimationFrame(mainLoop);
