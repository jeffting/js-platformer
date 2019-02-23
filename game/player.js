class Player extends KeyboardControlMixIn(GravityUpdateMixIn(MovementUpdateMixIn(JumpingMixIn(ShootingActionMixIn(Entity))))) {

    constructor(width, height, color, x, y) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.keyboard_control_setup(KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE);
        this.gravity_setup();
        this.movement_setup();
        this.jumping_setup();
        this.shooting_setup();
    }

    draw() {
        CTX.beginPath();
        CTX.lineWidth = "5";
        CTX.strokeStyle = this.color;  // Green path
        CTX.moveTo(this.x, this.y);
        CTX.lineTo(this.x, this.y + 30);
        CTX.lineTo(this.x - 10, this.y + 45);
        CTX.moveTo(this.x,this.y + 30);
        CTX.lineTo(this.x + 10, this.y + 45);
        CTX.moveTo(this.x - 15, this.y + 10);
        CTX.lineTo(this.x + 15, this.y + 10);
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(this.x, this.y - 10, 10, 0, 2 * Math.PI);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.stroke();  // Draw it
    }
}
