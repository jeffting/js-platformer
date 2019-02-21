class Bullet {
       constructor (width, height, color, x, y, direction) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = direction === "right" ? x + 23 : x - 23;
        this.y = y + 10;
        this.speed = direction === "right" ? 10 : -10;
    }
        update() {
            CTX.lineWidth = "3";
            CTX.beginPath();
            CTX.strokeStyle = "black";
            CTX.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            CTX.fillStyle = "black";
            CTX.fill();
            CTX.stroke();
        }
        draw() {
            this.x += this.speed;
        }
}