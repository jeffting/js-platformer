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

        this.gravity = 0.3
        this.gravitySpeed = 0;
    }

    gravity_update(entity) {
        entity.gravitySpeed += entity.gravity;
        if (entity.gravitySpeed > MAX_GRAVITY) {
            entity.gravitySpeed = MAX_GRAVITY;
        }
        entity.y += entity.gravitySpeed;
    }
}

let MovementMixIn = Base => class extends Base {
    movement_setup(acceleration) {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.movement_update);

        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = acceleration;
        this.direction = "right";
    }

    movement_update(entity) {
        entity.x += entity.speedX;
        entity.y += entity.speedY;
        if (entity.x < BLOCK_SIZE) { // Prevent moving left through walls
            entity.x = BLOCK_SIZE;
        }
        if (entity.x > (MAP_1[0].length * BLOCK_SIZE)-(BLOCK_SIZE+30)) { // Prevent moving right through walls
            entity.x = (MAP_1[0].length * BLOCK_SIZE)-(BLOCK_SIZE+30);
        }
        if (entity.y > (MAP_1.length * BLOCK_SIZE) - (BLOCK_SIZE+60)) { // Prevent moving down through floors
            entity.y = (MAP_1.length * BLOCK_SIZE) - (BLOCK_SIZE+60);
        }
    }

    movedown() {
        this.speedY += 5;

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
    }

    jumping_update(entity) {

    }

    moveup() {
        if (this.can_jump) {
            var jumpSound = new sound("jump.mp3");
            jumpSound.play();
            this.speedY -= 5;
            this.gravitySpeed = -10;
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
                        console.log("Player collided with Key");
                    }
                }

                if (otherEntity instanceof Gate) { //against gate
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Player ran into Gate!
                        console.log("Player collided with Gate");
                    }
                }

                //Check against all enemy types
                if (otherEntity instanceof Brawler) { //against brawler
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Player ran into Brawler!
                        // console.log("Player collided with Brawler");

                        // Give player a chance once hit by brawler.
                        // Without invulnerability many collisions detected before player has a chance to get away
                        if(!entity.invulnerable) {
                            entity.damagePlayer();
                        }
                    }
                }
            }

            if (entity instanceof Bullet) { //checking bullet
                if (otherEntity instanceof Player) {
                    //Do Nothing
                }

                //Check against all enemy types
                if (otherEntity instanceof Brawler) {
                    if(entity.detectCollision(otherEntity.x, otherEntity.y, otherEntity.width, otherEntity.height)) {
                        //Bullet hit Brawler!
                        // console.log("Bullet collided with Brawler");
                    }
                }
            }

        });

        //Check collisions between entity and environment
        for(var i = 0; i < map.length; i++) {
            var block = map[i];
            if (entity.detectCollision(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE)) {
                //Collision with a block

                //Some of these tests are unique to player, others (falling) are not, but here temporarily
                if (entity instanceof Player) { // Player collided with block
                    if (entity.gravitySpeed < 0) {
                        entity.y += (entity.gravitySpeed + 20);
                        entity.gravitySpeed = 0;
                        entity.speedY = 0;
                    }
                    if (entity.gravitySpeed > 0) {
                        entity.y -= (entity.gravitySpeed);
                        entity.gravitySpeed = 0;
                        entity.speedY = 0;
                        if (entity.id === playerID) {
                            entity.can_jump = true;
                        }
                    }
                }
                //Not unique to Brawler, but here temporarily
                if (entity instanceof Brawler) { //Brawler collided with block
                    if (entity.gravitySpeed > 0) {
                        entity.y -= (entity.gravitySpeed);
                        entity.gravitySpeed = 0;
                        entity.speedY = 0;
                        if (entity.id === playerID) {
                            entity.can_jump = true;
                        }
                    }
                }
                //This is unique to bullet, and will probably have to stay. Maybe change to delete bullet on collision
                if (entity instanceof Bullet) { //Bullet collided with block
                    // console.log("Bullet collided with block");
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
    }

    detectCollision(otherX, otherY, otherWidth, otherHeight) {
        //Test for x-axis overlap
        if(this.x <= (otherX + otherWidth) &&
        otherX <= this.x + this.width) {

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

    damagePlayer() {
        this.invulnerable = true;
        let that = this;
        setTimeout(function() {
            that.invulnerable = false;
        }, 2000);
    }

};

