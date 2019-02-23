class HUD {
    constructor(player, width, height, xpos, ypos) {
        this.player = player;
        this.width = width;
        this.height = height;
        this.xpos = xpos;
        this.ypos = ypos;
    }

    update() {

    }

    draw() {
        CTX.fillStyle = "rgb(204, 204, 255)";
        CTX.fillRect(this.xpos, this.ypos, this.width, this.height);

        CTX.font = "40px Arial";
        CTX.fillStyle = "black";
        CTX.fillText("Ammo:", CANVAS_WIDTH - 250, 40);
        let bullets = 3 - this.player.bulletArray.length;

        CTX.fillStyle = "red";
        if (bullets > 0) {
            CTX.fillRect(CANVAS_WIDTH - 100, 10, 20, 30);
        }
        if (bullets > 1) {
            CTX.fillRect(CANVAS_WIDTH - 70, 10, 20, 30);
        }
        if (bullets > 2) {
            CTX.fillRect(CANVAS_WIDTH - 40, 10, 20, 30);
        }
    }
}
