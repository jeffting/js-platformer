class Gate extends Entity {

    constructor (x, y,) {
        super();
        this.width = 60;
        this.height = 120;
        this.x = x;
        this.y = y;
    }

    draw() {
        let image = images.get("gate");
        let viewport = Viewport.getInstance();
        let view_coords = viewport.mapToViewport(this.x, this.y);
        let view_x = view_coords[0];
        let view_y = view_coords[1];

        CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }
}