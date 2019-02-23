class Brawler extends GravityMixIn(MovementMixIn(MeanderingAIMixIn(Entity))) {
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
    }

    draw() {
        let image = images.get("brawler");
        CTX.drawImage(image, this.x, this.y, this.width, this.height);
    }
}
