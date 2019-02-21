
class Block {
	constructor(x, y, width, type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.type = type;
	}

	draw() {
		CTX.fillStyle = BlockTypes.props[this.type].color;
		CTX.fillRect(this.x, this.y, this.width, this.width)
	}
}

class Level {

	//map is 2D array representing map
	constructor(map) {
		this.mapArray = map;
		this.map = [];
		this.convertMap();
		
	}

	convertMap() {
		for (var i = 0; i < this.mapArray.length; i++) {
			var row = this.mapArray[i];

			for (var j = 0; j < row.length; j++) {
				if(row[j] !== 0) {
					var type = row[j];
					var block = new Block(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, type)

					this.map.push(block)
				}
			}

		}
	}

	draw() {
		console.log("draw in level")
		console.log(this.map.length)
		for (var i = 0; i < this.map.length; i++) {
			this.map[i].draw();
		}
	}


}

