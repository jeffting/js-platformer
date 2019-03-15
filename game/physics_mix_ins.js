let VectorMovementMixIn = Base => class extends Base {
    vector_movement_setup(speed, direction) {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.vector_movement_update);

        this.speed = direction === "right" ? speed : 0 - speed;
    }

    vector_movement_update(entity) {
        entity.x += entity.speed;
    }
}


let GravityMixIn = Base => class extends Base {
    gravity_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.gravity_update);

        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.3;
    }

    gravity_update(entity) {
        entity.speedY += entity.gravity;
        if (entity.speedY > MAX_GRAVITY) {
            entity.speedY = MAX_GRAVITY;
        }
        entity.y += entity.speedY;
        entity.x += entity.speedX;
    }
}

let MovementControlMixIn = Base => class extends Base {
    movement_control_setup(acceleration) {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.movement_update);

        this.acceleration = acceleration;
        this.direction = "right";
    }

    movement_update(entity) {
        // if (entity.x < BLOCK_SIZE) { // Prevent moving left through walls
        //     entity.x = BLOCK_SIZE;
        // }
        // if (entity.x > (MAP_1[0].length * BLOCK_SIZE)-(BLOCK_SIZE+30)) { // Prevent moving right through walls
        //     entity.x = (MAP_1[0].length * BLOCK_SIZE)-(BLOCK_SIZE+30);
        // }
        // if (entity.y > (MAP_1.length * BLOCK_SIZE) - (BLOCK_SIZE+60)) { // Prevent moving down through floors
        //     entity.y = (MAP_1.length * BLOCK_SIZE) - (BLOCK_SIZE+60);
        // }
    }

    movedown() {
        // this.speedY += 5;

    }

    moveleft() {
        this.speedX = this.speedX >= -8 ? this.speedX - this.acceleration : -8;
        this.direction = "left";
    }

    moveright() {
        this.speedX = this.speedX <= 8 ? this.speedX + this.acceleration : 8;
        this.direction = "right";
    }
}

let JumpingMixIn = Base => class extends Base {
    jumping_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.jumping_update);

        this.can_jump = false;
        this.jump_capable = true;
    }

    jumping_update(entity) {

    }

    moveup() {
        if (this.can_jump) {
            var jumpSound = new sound("jump.mp3");
            jumpSound.play();
            this.speedY -= 10;
            this.y += this.speedY;
            this.can_jump = false;
        }
    }
}

let CollidableMixIn = Base => class extends Base {
    collidable_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.collidable_update);

        this.invulnerable = false;
    }

    collidable_update(entity) {

        //Check collisions between entity and other entities
        //We want to do different things depending on what is colliding against what
        entities.each(function(otherEntity) {
            if (entity.id === otherEntity.id) { //checking against self
                //Do Nothing
            }

            if (entity instanceof Player) { //checking player
                if (otherEntity instanceof Bullet) { //against bullet
                    //Do Nothing
                }

                if (otherEntity instanceof Key) { //against key
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Player ran into Key!
                        var rockCollisionSound = new sound("tone.mp3");
                        rockCollisionSound.play();
                        entities.pop(otherEntity);
                        doorUnlocked = true;
                        console.log("Player collided with Key");
                    }
                }

                if (otherEntity instanceof Gate) { //against gate
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Player ran into Gate!
                        if(!doorUnlocked){
                            var lockedDoorBeep = new sound("Wrong-alert-beep-sound.mp3");
                            lockedDoorBeep.play();
                        }
                        else{
                            var victorySound = new sound("chime.mp3");
                            victorySound.play();
                            gameState = WIN_STATE;
                        }
                        console.log("Player collided with Gate");
                    }
                }

                //Check against all enemy types
                if (otherEntity.is_ai) { //against ai
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Player ran into Brawler!
                        // console.log("Player collided with Brawler");
                        if(entity.can_be_damaged) {
                            var playerHitSound = new sound("playerGruntingSound.mp3");
                            playerHitSound.play();
                            entity.set_damage_points(-1);
                            setTimeout(() => {
                                entity.set_can_be_damaged(true);
                            }, 1000);
                        }
                    }
                }
            }

            if (entity instanceof Bullet) { //checking bullet
                if (otherEntity instanceof Player) {
                    //Do Nothing
                }

                if (otherEntity.is_ai) {
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Bullet hit Brawler!
                        player.deleteBullet(entity.id);
                        otherEntity.set_damage_points(-1);
                        var robotSound = new sound("aiBubbleSound.mp3");
                        robotSound.play();
                        console.log("Bullet collided with Brawler");
                    }
                }
            }

        });

        //Check collisions between entity and environment
        var topLeftCollision = false;
        var topRightCollision = false;
        var bottomLeftCollision = false;
        var bottomRightCollision = false;
        for(var i = 0; i < map.length; i++) {
            var block = map[i];
            if (entity.detectCollision(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                //Collision with a block

                if (entity.detectPointCollision(entity.x, entity.y,
                    block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                    topLeftCollision = true;
                }
                if (entity.detectPointCollision(entity.x + entity.width, entity.y,
                    block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                    topRightCollision = true;
                }
                if (entity.detectPointCollision(entity.x, entity.y + entity.height,
                    block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                    bottomLeftCollision = true;
                }
                if (entity.detectPointCollision(entity.x + entity.width, entity.y + entity.height,
                    block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                    bottomRightCollision = true;
                }

                //This is unique to bullet
                if (entity instanceof Bullet) { //Bullet collided with block
                    player.deleteBullet(entity.id);
                    if (entity.speed > 0) {
                        entity.x -= (entity.speed);
                    }
                    if (entity.speed < 0) {
                        entity.x -= (entity.speed);
                    }
                }
            }
        }
        if (!(entity instanceof Key ||
            entity instanceof Gate ||
            entity instanceof Bullet)) {

            if ((topLeftCollision && bottomLeftCollision) || (topRightCollision && bottomRightCollision)) {
                entity.x -= entity.speedX;
                entity.speedX = 0;
            }

            if (bottomLeftCollision && bottomRightCollision) {
                entity.y -= entity.speedY;
                entity.speedY = 0;
                if (entity.jump_capable) {
                    entity.can_jump = true;
                }
            } else if ((bottomLeftCollision || bottomRightCollision) && !(topLeftCollision || topRightCollision)) {
                if (entity.speedY > 0) {
                    entity.y -= entity.speedY;
                    entity.speedY = 0;
                    if (entity.jump_capable) {
                        entity.can_jump = true;
                    }
                }
                if ((bottomLeftCollision && entity.speedX < 0) || (bottomRightCollision && entity.speedX > 0)) {
                    entity.x -= entity.speedX;
                    entity.speedX = 0;
                }
            }

            if (topLeftCollision && topRightCollision) {
                entity.y += (entity.speedY + 10);
                entity.speedY = 0;
            } else if ((topLeftCollision || topRightCollision) && !(bottomLeftCollision || bottomRightCollision)) {
                if (entity.speedY > 0) {
                    entity.x -= entity.speedX;
                    entity.speedX = 0;
                } else if (entity.speedY < 0) {
                    entity.y += (entity.speedY + 10);
                    entity.speedY = 0;
                }
            }
        }
    }

    detectCollision(otherX, otherY, otherWidth, otherHeight) {
        //Test for x-axis overlap
        if(this.x < (otherX + otherWidth) &&
        otherX < this.x + this.width) {

            //Test for y-axis overlap
            if(this.y <= (otherY + otherHeight) &&
            otherY <= this.y + this.height) {
                //Collision!
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    detectPointCollision(pointX, pointY, otherX, otherY, otherWidth, otherHeight) {
        //Test for x-axis overlap
        var tolerance = 1;
        if (pointX >= otherX && pointX <= (otherX + otherWidth)) {

            //Test for y-axis overlap
            if (pointY >= otherY && pointY <= otherY + otherHeight) {
                //Point inside!
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    // damagePlayer() {
    //     this.invulnerable = true;
    //     let that = this;
    //     setTimeout(function() {
    //         that.invulnerable = false;
    //     }, 2000);
    // }

};

