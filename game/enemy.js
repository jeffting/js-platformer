class Brawler extends CollidableMixIn(
    GravityMixIn(
        MovementControlMixIn(
            HealthMixin(
                MeanderingAIMixIn(
                    AIMixIn(Entity)))))) {

    constructor(color, x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.x = x;
        this.y = y;
        this.gravity_setup();
        this.movement_control_setup(.15);
        this.meandering_ai_setup(this.x, 100, 100);
        this.health_setup(5);
        this.collidable_setup();
        this.ai_setup();
    }

    draw() {
        let image = images.get("brawler");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }
}

class Jumper extends CollidableMixIn(
    GravityMixIn(
        JumpingMixIn(
            HealthMixin(
                DelayedActionMixIn(
                    AIMixIn(Entity)))))) {

    constructor(color, x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.x = x;
        this.y = y;
        this.gravity_setup();
        this.jumping_setup(.15);
        this.delayed_action_setup(200, this.moveup);
        this.health_setup(5);
        this.collidable_setup();
        this.ai_setup();
        this.can_jump = true;
    }

    draw() {
        let image = images.get("brawler");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }

}

class Flyer extends CollidableMixIn(
    NoGravityMixIn(
        HealthMixin(
            MovementControlMixIn(
                MeanderingAIMixIn(
                    AIMixIn(Entity)))))) {

    constructor(color, x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.x = x;
        this.y = y;
        this.no_gravity_setup();
        this.movement_control_setup(.15);
        this.meandering_ai_setup(this.x, 100, 100);
        this.health_setup(5);
        this.collidable_setup();
        this.ai_setup();
        this.can_jump = true;
    }

    draw() {
        let image = images.get("robot1");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }

}
