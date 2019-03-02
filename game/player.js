class Player extends CollidableMixIn(
    GravityMixIn(
        MovementMixIn(
            JumpingMixIn(
                ShootingActionMixIn(
                    KeyboardControlMixIn(Entity)))))) {

    constructor(width, height, color, x, y) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.keyboard_control_setup(KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE);
        this.gravity_setup();
        this.movement_setup(.5);
        this.jumping_setup();
        this.shooting_setup();
        this.collidable_setup();
    }

    draw() {
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.beginPath();
        CTX.lineWidth = "5";
        CTX.strokeStyle = this.color;  // Green path
        CTX.moveTo(view_x, view_y);
        CTX.lineTo(view_x, view_y + 30);
        CTX.lineTo(view_x - 10, view_y + 45);
        CTX.moveTo(view_x,view_y + 30);
        CTX.lineTo(view_x + 10, view_y + 45);
        CTX.moveTo(view_x - 15, view_y + 10);
        CTX.lineTo(view_x + 15, view_y + 10);
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(view_x, view_y - 10, 10, 0, 2 * Math.PI);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.stroke();  // Draw it
    }
}
