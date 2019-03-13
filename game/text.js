class GameText {

    constructor (x, y, text, size) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        CTX.font = size.toString() + "px gameFont";
    }

    draw() {


        // let image = images.get("gate");
        // let viewport = Viewport.getInstance();
        // let view_coords = viewport.mapToViewport(this.x, this.y);
        // let view_x = view_coords[0];
        // let view_y = view_coords[1];

        CTX.fillText(text, x, y);
        // CTX.drawImage(image, view_x, view_y, this.width, this.height);
    }
}