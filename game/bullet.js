class Bullet extends CollidableMixIn(
    VectorMovementMixIn(
        ShootingActionMixIn(Entity))) {

    constructor (width, height, color, x, y, direction) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = direction === "right" ? x + (width*5) : x - (width*2);
        this.y = y + 10;
        this.id = Math.random().toString(36).substr(2,9); // generates id
        
        this.vector_movement_setup(10, direction);
        this.collidable_setup();
    }

    draw() {
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.lineWidth = "3";
        CTX.beginPath();
        CTX.strokeStyle = this.color;
        CTX.arc(view_x, view_y, 5, 0, 2 * Math.PI);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.stroke();
    }
}
