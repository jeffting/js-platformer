class Player extends CollidableMixIn(
    GravityMixIn(
        MovementControlMixIn(
            JumpingMixIn(
                ShootingActionMixIn(
                    HealthMixin(
                      KeyboardControlMixIn(Entity))))))) {

    constructor(width, height, color, x, y) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.keyboard_control_setup(KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE);
        this.gravity_setup();
        this.movement_control_setup(.5);
        this.jumping_setup();
        this.health_setup(3);
        this.shooting_setup();
        this.collidable_setup();

    }

    draw() {
        let image = images.get("playerRight");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        //added in the player image
        if (this.direction === "left") {
            image = images.get("playerLeft");
        } 
        else { // right side gun
            image = images.get("playerRight");
        }
        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }
}
