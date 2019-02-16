
function drawGrid() {
	console.log("draw grid")

	vert = CANVAS_WIDTH/BLOCK_SIZE;
	hori = CANVAS_HEIGHT/BLOCK_SIZE;

	for (var i = 0; i < vert; i++) {

		//draw vertical lines
		CTX.moveTo(i * BLOCK_SIZE, 0)
		CTX.lineTo(i* BLOCK_SIZE, CANVAS_HEIGHT)


		for (var j = 0; j < hori; j++) {
		
			
			//draw horizontal lines
			CTX.moveTo(0, j * BLOCK_SIZE)
			CTX.lineTo(CANVAS_WIDTH, j*BLOCK_SIZE)

		}

	}

	CTX.strokeStyle = "#000";
	CTX.stroke();
}

//drawGrid()