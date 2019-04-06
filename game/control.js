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
        gameWonMusic.stop();
        lossMusic.stop();
        if (gameArea.keys && gameArea.keys[KEY_ENTER])  {
            gameState = PLAY_STATE;
        }
        displayMenuScreen();
    }
    else if (gameState == PLAY_STATE){
        introMusic.stop();
        winMusic.stop();
        if(levelState == LEVEL_ONE_STATE){
            music.play();
        }
        else if(levelState == LEVEL_TWO_STATE){
            level2Music.play();
        }
        gameLoopDraw();
    }
    else if (gameState == WIN_STATE){
        music.stop();
        level2Music.stop();
        deleteEntities();
        doorUnlocked = false;

        if(levelState == LEVEL_ONE_STATE){
            winMusic.play();
            displayWinScreen(); 
        }
        else{
            gameWonMusic.play();
            displayGameWonScreen();
        }

        if (gameArea.keys && gameArea.keys[KEY_ESCAPE])  { //press ESC to return to menu
            gameState = MENU_STATE;
            startGame();
        }
        if(gameArea.keys && gameArea.keys[KEY_ENTER]){
            if(levelState == LEVEL_ONE_STATE){
                gameState = PLAY_STATE;
                startLevelTwo();
            }
        }

    }
    else if (gameState == DEAD_STATE){

        music.stop();
        level2Music.stop();
        lossMusic.play();
        displayLossScreen();
        deleteEntities();
        doorUnlocked = false;
        if (gameArea.keys && gameArea.keys[KEY_ESCAPE])  { //press ESC to return to menu
            gameState = MENU_STATE;
            levelState = LEVEL_ONE_STATE;
            LEVEL_ONE = new Level(MAP_1);
            startGame();
        }   
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
    for (var i = 0; i < this.map.length; i++) {
        map.pop(LEVEL_TWO);
    }
    for (var i = 0; i < this.map.length; i++) {
        map.pop(i);
    }
    levelState = LEVEL_ONE_STATE;
    LEVEL_ONE = new Level(MAP_1);

    player = new Player(50, 100, "red", playerStartX, playerStartY);
    viewport.update(playerStartX, playerStartY);
    playerID = player.id;
    entities.push(new Gate(gateX, gateY-70));
    entities.push(new Key(keyStartX, keyStartY+10));
    entities.push(player);
    entities.push(new Brawler("green", 500, 120));
    entities.push(new Jumper("green", 240, 500));
    entities.push(new Flyer("green", 1250, 240));
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    gameArea.start(); 
}

function startLevelTwo() {
    deleteEntities();
    for (var i = 0; i < this.map.length; i++) {
        map.pop(i);
    }
    for (var i = 0; i < this.map.length; i++) {
        map.pop(LEVEL_ONE);
    }
    levelState = LEVEL_TWO_STATE;
    LEVEL_TWO = new Level(MAP_2);
    player = new Player(50, 100, "blue", playerStartX, playerStartY);
    viewport.update(playerStartX, playerStartY);
    playerID = player.id;
    entities.push(new Gate(gateX, gateY-70));
    entities.push(new Key(keyStartX, keyStartY+10));
    entities.push(player);
    entities.push(new Brawler("green", 300, 1000));
    entities.push(new Brawler("green", 470, 1000));
    entities.push(new Jumper("green", 300, 1550));
    entities.push(new Flyer("green", 400, 1975));
    entities.push(new Flyer("green", 875, 1680));
    entities.push(new HUD(player, CANVAS_WIDTH, 50, 0,0));
    gameArea.start(); 
}

function deleteEntities(){
    entities.each(function(entity) {
        entities.pop(entity);
    });
}

function displayWinScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("LEVEL COMPLETE!", 0, CANVAS_HEIGHT/2);
    CTX.font = "50px gameFont";
    CTX.fillText("Press ENTER to continue to NEXT LEVEL", 0, .8*CANVAS_HEIGHT);
    CTX.fillText("Press ESC to return to MENU", 0, .9*CANVAS_HEIGHT);
}

function displayLossScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("GAME OVER!", 0, CANVAS_HEIGHT/2);
    let robotImage = images.get("robot1");
    CTX.drawImage(robotImage, 900, 100); 
    CTX.drawImage(robotImage, 675, 100); 
    let tombstone = images.get("tombstone");
    CTX.drawImage(tombstone, 750, 200); 
    CTX.font = "50px gameFont";
    CTX.fillText("Press ESC to return to MENU", 0, .9*CANVAS_HEIGHT);
}

function displayMenuScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("SPACE MISTAKE", 0, CANVAS_HEIGHT/2);
    let manImage = images.get("spaceCaptain");
    CTX.drawImage(manImage, 900, 50); 
    CTX.font = "50px gameFont";
    CTX.fillText("Press ENTER to Start Game", 0, .9*CANVAS_HEIGHT);
}

function displayGameWonScreen(){
    gameArea.clearGray();
    CTX.font = "100px gameFont";
    CTX.fillStyle = "#0000FF";
    CTX.fillText("You Won!", 0, CANVAS_HEIGHT/2);
    let manImage = images.get("spaceCaptain");
    CTX.drawImage(manImage, 900, 50); 
    CTX.font = "50px gameFont";
    CTX.fillText("Press ESC to Return to Menu", 0, .9*CANVAS_HEIGHT);
}

function displayIntroText() {
    CTX.font = "50px gameFont";
    gameArea.clearGray();
    CTX.fillStyle = "#0000FF";

    CTX.fillText("In the year 2222,", 0, CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("An intrepid space explorer prepares to", 0, 1.2*CANVAS_HEIGHT + scrollY); 
    CTX.fillText("depart I/O, a moon of Jupyter, after", 0, 1.3*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("completing a scientific mission there.", 0, 1.4*   CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("He has collected samples of radioactive", 0, 1.6*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("moon rocks and placed them aboard his", 0, 1.7*   CANVAS_HEIGHT + scrollY);
    CTX.fillText("spacecraft.", 0, 1.8*   CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("However, the presence of the", 0, 2*CANVAS_HEIGHT + scrollY);
    CTX.fillText("radioactive rocks causes the ship's", 0, 2.1*CANVAS_HEIGHT + scrollY);
    CTX.fillText("AI to go haywire!", 0, 2.2*CANVAS_HEIGHT + scrollY);
    
    CTX.fillText("The friendly MAC-2000 shipboard AI and", 0, 2.4*CANVAS_HEIGHT + scrollY);
    CTX.fillText("defenses turn against their human", 0, 2.5*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("master.", 0, 2.6*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("Battling for life and limb, the space", 0, 2.8*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("explorer must survive the onslaught of", 0, 2.9*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("the rogue AI.", 0, 3*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("He must also collect the moon rocks", 0, 3.2*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("and remove them from his spaceship", 0, 3.3*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("to reset the ship's systems.", 0, 3.4*CANVAS_HEIGHT+ scrollY);

    CTX.fillText("His only chance for survival is to", 0, 3.6*CANVAS_HEIGHT+ scrollY);
    CTX.fillText("fix his...", 0, 3.7*CANVAS_HEIGHT+ scrollY);

    CTX.font = "100px gameFont";
    CTX.fillText("SPACE MISTAKE", 0, 4*CANVAS_HEIGHT+ scrollYTitle);
    scrollY--;
    if(4*CANVAS_HEIGHT+ scrollYTitle > CANVAS_HEIGHT/2){
        scrollYTitle = scrollY;
    }
 }

// Start things off
requestAnimationFrame(mainLoop);
