//game loop with update and draw functions
var player = null;
let viewport = Viewport.getInstance();
var playerID = null;
var cutScene = true;
var i = 0; //used as a timer
//var text1 = null;

function mainLoop() {
    // music.play();
    gameArea.clear();
    //Possible bug -> drawing map before viewport updates.
    //text1.draw();
    if(i >= 3000){
        cutScene = false;
    }
    if(cutScene){
        introMusic.play();
        //CTX.font = "100px gameFont";
        //CTX.fillText(i, 100, 300); 
        displayIntroText(i);
        
    }
    else{
        introMusic.stop();
        music.play();
        gameLoopDraw();
    }


    // for(var i = 0; i < map.length; i++){
    //     map[i].draw();
    // }
    // entities.each(function(entity) {
    //     entity.update();
    //     if (entity.id === playerID) {
    //         viewport.update(entity.x, entity.y);
    //     }
    //     entity.draw();
    // });
    i++;
    requestAnimationFrame(mainLoop);
}

function gameLoopDraw(){
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
}

function startGame() {
    // for(var i = 0; i < 99999; i ++){
    //     CTX.font = "300px Arial";
    //     CTX.fillText("Hello World", 10, 50);
    // }

    player = new Player(30, 60, "red", playerStartX, playerStartY);
    viewport.update(playerStartX, playerStartY);
    playerID = player.id;
    entities.push(new Gate(gateX, gateY-10));
    entities.push(new Key(keyStartX, keyStartY+10));
    entities.push(player);
    entities.push(new Brawler("green", 500, 120));
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    //text1 = new GameText(300,300,"Hello World!!", 300);
    displayIntroText();

    gameArea.start(); 
}

function displayIntroText(i) {
    // CTX.fillStyle = "#FFFF33";
    CTX.font = "50px gameFont";
    
    gameArea.clearBlack();
    CTX.fillStyle = "#0000FF";
    if(i < 500){
        CTX.fillText("In the year 2222,", 0, 2*CANVAS_HEIGHT/10);
    }
    if((i < 500) && (i > 100)){
        CTX.fillText("An intrepid space explorer prepares to", 0, 3 *CANVAS_HEIGHT/10); 
    }
    if((i < 500) && (i > 200)){
        CTX.fillText("leave I/O, a moon of Jupyter, to return", 0, 4 *   CANVAS_HEIGHT/10);
    }
    if((i < 500) && (i > 300)){
        CTX.fillText("to his home planet.", 0, 5*   CANVAS_HEIGHT/10);
    }
    if(i < 1000 && i > 500){
        CTX.fillText("He has collected samples of the", 0, 3*   CANVAS_HEIGHT/10);
    }
    if(i < 1000 && i > 600){
        CTX.fillText("radioactive moon rocks", 0, 4*   CANVAS_HEIGHT/10);
    }
    if(i < 1000 && i > 700){
        CTX.fillText("placed them aboard his spacecraft.", 0, 5*   CANVAS_HEIGHT/10);
    }
    if(i < 2000 && i > 1100){
        CTX.fillText("However, the presence of the radioactive rocks causes the ship's AI to go haywire!", 0, 3*CANVAS_HEIGHT/10);
        //CTX.fillText("The friendly MAC-2000 shipboard AI and defenses turn against their human master.", 0, 300);
    }
    // else if(i < 1200){
    //     CTX.fillText("Battling for life and limb, the space explorer must survive the onslaught of the rogue AI.", 100, 300);
    // }

    
    //CTX.fillText("holla!", 100, 300);
}

// Start things off
requestAnimationFrame(mainLoop);
