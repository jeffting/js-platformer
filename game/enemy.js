class Brawler extends GravityUpdateMixIn(MovementUpdateMixIn(Entity)) {
    constructor(width, height, color, x, y) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.gravity_setup();
        this.movement_setup();
    }

    draw() {
        CTX.beginPath();
        CTX.lineWidth = "10";
        CTX.strokeStyle = this.color;  // Green path
        CTX.moveTo(this.x, this.y);
        CTX.lineTo(this.x+10, this.y + 45);
        CTX.stroke();
    }
}
