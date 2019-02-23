class Enemy {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.3;
        this.gravitySpeed = 0;
        this.can_jump = true;
        this.can_shoot = true;
        this.has_ammo = true;
        this.direction = "right";
    }

    update() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }

    draw() {
        CTX.beginPath();
        CTX.lineWidth = "5";
        CTX.strokeStyle = this.color;  // Green path
        CTX.moveTo(this.x, this.y);
        CTX.lineTo(this.x, this.y + 30);
        CTX.lineTo(this.x - 10, this.y + 45);
        CTX.moveTo(this.x,this.y + 30);
        CTX.lineTo(this.x + 10, this.y + 45);
        CTX.moveTo(this.x - 15, this.y + 10);
        CTX.lineTo(this.x + 15, this.y + 10);
        CTX.stroke();
        CTX.beginPath();
        CTX.arc(this.x, this.y - 10, 10, 0, 2 * Math.PI);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.stroke();  // Draw it
    }

    hitBottom() {
        var rockbottom = CANVAS_HEIGHT - (this.height + 20);
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            player.can_jump = true;
        }
    }
}

// function Player(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.gravity = 0.3;
//     this.gravitySpeed = 0;
//     this.x = x;
//     this.y = y;
//     this.can_jump = true;
//     this.can_shoot = true;
//     this.has_ammo = true;
//     this.direction = "right";
//     this.update = function() {
//         /**  rectangle*/
//         // CTX.fillStyle = color;
//         // CTX.fillRect(this.x, this.y, this.width, this.height);
//         /*** stick figure */
//         CTX.beginPath();
//         CTX.lineWidth = "5";
//         CTX.strokeStyle = this.color;  // Green path
//         CTX.moveTo(this.x, this.y);
//         CTX.lineTo(this.x, this.y + 30);
//         CTX.lineTo(this.x - 10, this.y + 45);
//         CTX.moveTo(this.x,this.y + 30);
//         CTX.lineTo(this.x + 10, this.y + 45);
//         CTX.moveTo(this.x - 15, this.y + 10);
//         CTX.lineTo(this.x + 15, this.y + 10);
//         CTX.stroke();
//         CTX.beginPath();
//         CTX.arc(this.x, this.y - 10, 10, 0, 2 * Math.PI);
//         CTX.fillStyle = this.color;
//         CTX.fill();
//         CTX.stroke();  // Draw it
//     }
//     this.draw = function() {
//         this.gravitySpeed += this.gravity;
//         this.x += this.speedX;
//         this.y += this.speedY + this.gravitySpeed;
//         this.hitBottom();
//     }
//     this.hitBottom = function() {
//         var rockbottom = CANVAS_HEIGHT - (this.height + 20);
//         if (this.y > rockbottom) {
//             this.y = rockbottom;
//             this.gravitySpeed = 0;
//             player.can_jump = true;
//         }
//     }
// }
