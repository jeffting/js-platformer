
//game loop with update and draw functions

function mainLoop() {
    update();
    draw();


    requestAnimationFrame(mainLoop);
}
 
// Start things off
requestAnimationFrame(mainLoop);

function update(){
	//console.log("update() called");
}

function draw(){
	//console.log("draw() called");
}