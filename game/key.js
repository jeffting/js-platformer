class Key extends Entity {

    constructor (x, y,) {
        super();
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
    }

    draw() {
        let image = images.get("key");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }
}