let gravityUpdateMixIn = Base => class extends Base {
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

let movementUpdateMixIn = Base => class extends Base {
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

let jumpingMixIn = Base => class extends Base {
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

let shootingMixIn = Base => class extends Base {
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

    shoot() {
        if (this.can_shoot && this.has_ammo) {
            this.bulletArray.push(new Bullet(10, 10, "blue", this.x, this.y, this.direction));
            this.can_shoot = false;
            var that = this;
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
        this.bulletArray.shift();
        this.has_ammo = true;
    }
}

class Entity {
    constructor() {
        this.update_mix_ins = [];
    }

    update() {
        for (let i = 0; i < this.update_mix_ins.length; i++) {
            this.update_mix_ins[i](this);
        }
    }
}
