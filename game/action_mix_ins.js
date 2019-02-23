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

            var laserSound = new sound("laser.mp3");
            laserSound.play();

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

