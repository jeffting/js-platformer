class Entity {
    constructor() {
        this.id = this.uuidv4();
        this.update_mix_ins = [];
    }

    uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    }

    update() {
        for (let i = 0; i < this.update_mix_ins.length; i++) {
            this.update_mix_ins[i](this);
        }
    }
}

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

let KeyboardControlMixIn = Base => class extends Base {
    keyboard_control_setup(up, down, left, right, action) {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.keyboard_control_update);

        this.up_key = up;
        this.down_key = down;
        this.left_key = left;
        this.right_key = right;
        this.action_key = action;
    }

    keyboard_control_update(entity) {
        entity.speedY = 0;
        if (gameArea.keys && gameArea.keys[entity.left_key]) { entity.moveleft(); }
        if (gameArea.keys && gameArea.keys[entity.right_key]) { entity.moveright(); }
        if (gameArea.keys && gameArea.keys[entity.up_key]) { entity.moveup(); }
        if (gameArea.keys && gameArea.keys[entity.down_key]) { entity.movedown(); }
        if (gameArea.keys && !gameArea.keys[entity.right_key] && !gameArea.keys[entity.left_key] && entity.speedX != 0 && entity.can_jump) {
            entity.speedX = entity.speedX > 0 ? entity.speedX -0.5 : entity.speedX + 0.5;
        }
        if (gameArea.keys && gameArea.keys[entity.action_key]) { entity.action(); }
    }
}

let GravityUpdateMixIn = Base => class extends Base {
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
        entity.y += entity.gravitySpeed;
        let rockbottom = CANVAS_HEIGHT - (entity.height + 20);
        if (entity.y > rockbottom) {
            entity.gravitySpeed = 0;
        }
    }
}

let MovementUpdateMixIn = Base => class extends Base {
    movement_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.movement_update);

        this.speedX = 0;
        this.speedY = 0;
        this.direction = "right";
    }

    movement_update(entity) {
        entity.x += entity.speedX;
        entity.y += entity.speedY;
    }

    movedown() {
        this.speedY += 5;
    }

    moveleft() {
        this.speedX = this.speedX >= -8 ? this.speedX - 0.5 : -8;
        this.direction = "left";
    }

    moveright() {
        this.speedX = this.speedX <= 8 ? this.speedX + 0.5 : 8;
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
        let rockbottom = CANVAS_HEIGHT - (entity.height + 20);
        if (entity.y > rockbottom) {
            entity.y = rockbottom;
            entity.can_jump = true;
        }
    }

    moveup() {
        if (this.can_jump) {
            this.speedY -= 5;
            this.gravitySpeed = -10;
            this.can_jump = false;
        }
    }
}

let ShootingActionMixIn = Base => class extends Base {
    shooting_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.shooting_update);

        this.can_shoot = true;
        this.has_ammo = true;
        this.bulletArray = [];
    }

    shooting_update(entity) {

    }

    action() {
        if (this.can_shoot && this.has_ammo) {
            let bullet = new Bullet(10, 10, "blue", this.x, this.y, this.direction);
            this.bulletArray.push(bullet);
            entities.push(bullet);

            this.can_shoot = false;

            let that = this;
            setTimeout(function() { that.setCanShoot(); }, BULLET_DELAY);
            setTimeout(function() { that.deleteBullet(); }, AMMO_DELAY);
        }
    }

    setCanShoot() {
        if (this.bulletArray.length < 3) {
            this.has_ammo = true;
            this.can_shoot = true;
        } else if (this.bulletArray.length === 3) {
            this.has_ammo = false;
            this.can_shoot = true;
        }
    }

    deleteBullet() {
        let bullet = this.bulletArray.shift();
        entities.pop(bullet);
        this.has_ammo = true;
    }
}

