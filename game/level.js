
class Block {
	constructor(x, y, width, type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.type = type;
	}

	draw() {
		let viewport = Viewport.getInstance();
		let view_coords = viewport.mapToViewport(this.x, this.y);
		let view_x = view_coords[0];
		let view_y = view_coords[1];

		CTX.fillStyle = BlockTypes.props[this.type].color;
		CTX.fillRect(view_x, view_y, this.width, this.width)
	}
}

class Level {

	//map is 2D array representing map
	constructor(map) {
		this.mapArray = map;
		// this.map = [];
		this.convertMap();
		
	}

	convertMap() {
		for (var i = 0; i < this.mapArray.length; i++) {
			var row = this.mapArray[i];

			for (var j = 0; j < row.length; j++) {
				if(row[j] == 1) {
					var type = row[j];
					var block = new Block(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, type);

					map.push(block)
				} else if (row[j] == 2) {
				    playerStartX = j * BLOCK_SIZE;
                    playerStartY = i * BLOCK_SIZE;
                } else if (row[j] == 3) {
                    keyStartX = j * BLOCK_SIZE;
                    keyStartY = i * BLOCK_SIZE;
                } else if (row[j] == 4) {
                    gateX = j * BLOCK_SIZE;
                    gateY = i * BLOCK_SIZE;
				} else if(row[j] == 5) {
					let spriteX = j * BLOCK_SIZE;
					let spriteY = i * BLOCK_SIZE;

					let flames = sprite({
						context: CTX,
						width: 150,
						height: 150,
						image: images.get("flames"),
						frames: 3,
						drawX: spriteX,
						drawY: spriteY
					})

					sprites.push(flames);
					
				}
				
			}
			console.log(sprites);

		}
	}

	draw() {
		for (var i = 0; i < this.map.length; i++) {
			map[i].draw();
		}
	}


}

