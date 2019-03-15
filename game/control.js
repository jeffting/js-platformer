//game loop with update and draw functions
var player = null;
let viewport = Viewport.getInstance();
var playerID = null;
var i = 0; //used as a timer for the intro state
var scrollY = 0;
var scrollYTitle = 0;

function mainLoop() {
    gameArea.clear();
    //Possible bug -> drawing map before viewport updates.
    if(i >= 2600 && gameState == INTRO_STATE){
        gameState = MENU_STATE;
    }
    if(gameState == INTRO_STATE){
        introMusic.play();
        displayIntroText();
        i++;  
        if (gameArea.keys)  { //press any key to skip intro
            gameState = MENU_STATE;
        }   
    }
    else if (gameState == MENU_STATE){ //press ENTER to start gameplay
        winMusic.stop();
        lossMusic.stop();
        if (gameArea.keys && gameArea.keys[KEY_ENTER])  {
            gameState = PLAY_STATE;
        }
        displayMenuScreen();
    }
    else if (gameState == PLAY_STATE){
        introMusic.stop();
        music.play();
        gameLoopDraw();
    }
    else if (gameState == WIN_STATE){
        music.stop();
        winMusic.play();
        displayWinScreen();
        //todo: add code in here to move on to next level, or return to main loop
    }
    else if (gameState == DEAD_STATE){
        music.stop();
        lossMusic.play();
        displayLossScreen();
        //todo: add code in here to restart level or return to main loop
    }
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
    player = new Player(30, 60, "red", playerStartX, playerStartY);
    viewport.update(playerStartX, playerStartY);
    playerID = player.id;
    entities.push(new Gate(gateX, gateY-10));
    entities.push(new Key(keyStartX, keyStartY+10));
    entities.push(player);
    entities.push(new Brawler("green", 500, 120));
    entities.push(new Jumper("green", 240, 500));
    entities.push(new Flyer("green", 1340, 240));
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    gameArea.start(); 
}

function displayWinScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("LEVEL COMPLETE!", 100, CANVAS_HEIGHT/2);
}

function displayLossScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("GAME OVER!", 100, CANVAS_HEIGHT/2);
}

function displayMenuScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("SPACE MISTAKE", 100, CANVAS_HEIGHT/2);

    CTX.font = "50px gameFont";
    CTX.fillText("Press ENTER to Start Game", 100, .9*CANVAS_HEIGHT);
}

function displayIntroText() {
    CTX.font = "50px gameFont";
    gameArea.clearGray();
    CTX.fillStyle = "#0000FF";

    CTX.fillText("In the year 2222,", 100, CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("An intrepid space explorer prepares to", 100, 1.2*CANVAS_HEIGHT + scrollY); 
    CTX.fillText("depart I/O, a moon of Jupyter, after", 100, 1.3*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("completing a scientific mission there.", 100, 1.4*   CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("He has collected samples of radioactive", 100, 1.6*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("moon rocks and placed them aboard his", 100, 1.7*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("spacecraft.", 100, 1.8*   CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("However, the presence of the", 100, 2*CANVAS_HEIGHT + scrollY);
    CTX.fillText("radioactive rocks causes the ship's", 100, 2.1*CANVAS_HEIGHT + scrollY);
    CTX.fillText("AI to go haywire!", 100, 2.2*CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("The friendly MAC-2000 shipboard AI and", 100, 2.4*CANVAS_HEIGHT + scrollY);
    CTX.fillText("defenses turn against their human", 100, 2.5*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("master.", 100, 2.6*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("Battling for life and limb, the space", 100, 2.8*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("explorer must survive the onslaught of", 100, 2.9*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("the rogue AI.", 100, 3*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("He must also collect the moon rocks", 100, 3.2*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("and remove them from his spaceship", 100, 3.3*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("to reset the ship's systems.", 100, 3.4*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("His only chance for survival is to", 100, 3.6*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("fix his...", 100, 3.7*CANVAS_HEIGHT+ scrollY);

    CTX.font = "100px gameFont";
    CTX.fillText("SPACE MISTAKE", 100, 4*CANVAS_HEIGHT+ scrollYTitle);
    scrollY--;
    if(4*CANVAS_HEIGHT+ scrollYTitle > CANVAS_HEIGHT/2){
        scrollYTitle = scrollY;
    }
 }

// Start things off
requestAnimationFrame(mainLoop);
