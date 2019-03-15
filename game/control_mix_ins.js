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

let AIMixIn = Base => class extends Base {
    ai_setup() {
        this.is_ai = true;
    }
}

let MeanderingAIMixIn = Base => class extends Base {
    meandering_ai_setup(center, crest, valley) {
        if (!this.update_mix_ins) {
            this.update_mix_ins = [];
        }
        this.update_mix_ins.push(this.meandering_ai_update);

        this.center = center;
        this.crest = crest;
        this.valley = valley;
    }

    meandering_ai_update(entity) {
        if (entity.direction === "left") {
            if (entity.x > (entity.center - entity.crest)) {
                entity.moveleft();
            } else {
                entity.direction = "right";
                entity.moveright();
            }
        } else if (entity.direction === "right") {
            if (entity.x < (entity.center + entity.valley)) {
                entity.moveright();
            } else {
                entity.direction = "left";
                entity.moveleft();
            }
        }
    }
}
