let ShootingActionMixIn = Base => class extends Base {
    shooting_setup() {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.shooting_update);

        this.can_shoot = true;
        this.bulletArray = [];
        this.ammoArray = [1,1,1];
    }

    shooting_update(entity) {

    }

    action() {
        if (this.can_shoot && this.ammoArray.length) {
            let bullet = new Bullet(10, 10, "blue", this.x, (this.y + this.height/4),
                this.direction);
            this.bulletArray.push(bullet);
            this.ammoArray.pop();
            entities.push(bullet);

            var laserSound = new sound("laser.mp3");
            laserSound.play();

            this.can_shoot = false;

            let that = this;
            setTimeout(function() { that.setCanShoot(); }, BULLET_DELAY);
            setTimeout(function() { that.deleteBullet(bullet.id); }, AMMO_DELAY);
            setTimeout(function() { that.addAmmo(); }, AMMO_DELAY );
        }
    }

    setCanShoot() {
        this.can_shoot = true;
    }

    deleteBullet(id) {
        let bullet = this.bulletArray.find((b) => {
            return b.id === id;
        });

        if (bullet) {
            this.bulletArray = this.bulletArray.filter(() => {
                return bullet.id === id;
            })
            entities.pop(bullet);
        }
    }


    addAmmo() {
        this.ammoArray.push(1);
        var reloadSound = new sound("reloading.mp3");
        reloadSound.play();
    }
}

