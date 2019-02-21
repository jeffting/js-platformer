
//game loop with update and draw functions

function mainLoop() {
    gameArea.clear();
    update();
    draw();


    requestAnimationFrame(mainLoop);
}

function startGame() {
    player = new Player(30, 30, "red", 30, 120);
    gameArea.start();
    bulletArray = [];
}
 
// Start things off
requestAnimationFrame(mainLoop);

function update(){   
    for(var i = 0; i < map.length; i++){
        map[i].draw();
    }
    controlCharacter();
    player.update();

    if (bulletArray.length) {
        bulletArray.forEach((b) => {
            b.update();
            b.draw();
        })
    }
	// console.log("update() called");
}

function draw(){
    player.draw();

	// console.log("draw() called");
}

function controlCharacter() {
    player.speedY = 0; 
    if (gameArea.keys && gameArea.keys[37]) {moveleft() }
    if (gameArea.keys && gameArea.keys[39]) {moveright() }
    if (gameArea.keys && gameArea.keys[38]) {moveup() }
    if (gameArea.keys && gameArea.keys[40]) {movedown() }
    if (gameArea.keys && !gameArea.keys[39] && !gameArea.keys[37] && player.speedX != 0 && player.can_jump) {
        player.speedX = player.speedX > 0 ? player.speedX -0.5 : player.speedX + 0.5;
    }
    if (gameArea.keys && gameArea.keys[32]) {shoot()}
}


function moveup() {
    if (player.can_jump) {
        player.speedY -= 5;
        player.gravitySpeed = -10;
        player.can_jump = false;
    }
}

function movedown() {
    player.speedY += 5;
}

function moveleft() {
    player.speedX = player.speedX >= -8 ? player.speedX - 0.5 : -8;
    player.direction = "left";
}

function moveright() {
    player.speedX = player.speedX <= 8 ? player.speedX + 0.5 : 8;
    player.direction = "right";
}

function shoot() {
    if (player.can_shoot && player.has_ammo) {
        bulletArray.push(new Bullet(10, 10, "blue", player.x, player.y, player.direction));
        player.can_shoot = false;
        setTimeout(setCanShoot, BULLET_DELAY);
        setTimeout(deleteBullet, AMMO_DELAY);
    }
}

function setCanShoot() {
    if (bulletArray.length < 3) {
        player.has_ammo = true;
        player.can_shoot = true;
    } else if (bulletArray.length === 3) {
        player.has_ammo = false;
        player.can_shoot = true;
    }
}

function deleteBullet() {
    bulletArray.shift();
    player.has_ammo = true;
}