class Brawler extends CollidableMixIn(
    GravityMixIn(
        MovementMixIn(
            MeanderingAIMixIn(Entity)))) {

    constructor(color, x, y) {
        super();
        this.width = 60;
        this.height = 60;
        this.color = color;
        this.x = x;
        this.y = y;
        this.gravity_setup();
        this.movement_setup(.15);
        this.meandering_ai_setup(this.x, 100, 100);
        this.collidable_setup();
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
