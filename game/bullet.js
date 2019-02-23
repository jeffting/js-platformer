class Bullet extends VectorMovementMixIn(Entity) {
    constructor (width, height, color, x, y, direction) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = direction === "right" ? x + 23 : x - 23;
        this.y = y + 10;

        this.vector_movement_setup(10, direction);
    }

    draw() {
        CTX.lineWidth = "3";
        CTX.beginPath();
        CTX.strokeStyle = this.color;
        CTX.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.stroke();
    }
}
