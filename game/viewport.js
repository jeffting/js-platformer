//Initially, viewport will keep player in the center of the canvas at all times, ignoring borders of the level
//Eventually will prevent viewport from moving beyond the borders of the level

class Viewport {

    constructor() {
        //Center viewport on player, which has initial values of height: 30, width: 30 (as of 2/25)
        this.x = 0;
        this.y = 0;

        this.leftBoundary = this.x;
        this.rightBoundary = this.x + CANVAS_WIDTH;
        this.topBoundary = this.y;
        this.bottomBoundary = this.y + CANVAS_HEIGHT;
    }

    static _instance = null;

    static getInstance() {
        if (this._instanceinstance == null) {
            this._instanceinstance = new Viewport();
            return this._instanceinstance;
        } else {
            return this._instanceinstance;
        }
    }

    update(playerX, playerY) {
        //Center viewport on player, which has initial values of height: 30, width: 30 (as of 2/25)
        this.x = (playerX + 15) - (CANVAS_WIDTH/2);
        this.y = (playerY + 15) - (CANVAS_HEIGHT/2);

        this.leftBoundary = this.x;
        this.rightBoundary = this.x + CANVAS_WIDTH;
        this.topBoundary = this.y;
        this.bottomBoundary = this.y + CANVAS_HEIGHT;
    }

    mapToViewport(x_position, y_position) {
        //Element [0] is x pos in viewport space, [1] is y in viewport space
        return [x_position - this.x, y_position - this.y]
    }
}