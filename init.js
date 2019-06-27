var images = []; // Load images for the program
var board; // Board object
var tileSize = 100; // Size of the pieces
var movingPiece; // Variable that stores temporarily the piece that you are moving
var movingArrow; // Variable that stores temporarily the arrow that you are moving
var moving = false; // Are you moving a piece right now?
var shooting = false; // Are you shooting an arrow?
var whitesMove = true; // Is it whites turn?

function setup() {
    board = new Board();
    window.canvas = createCanvas(1000, 1000);
    canvas.parent("canvas");
    for (var i = 0; i < 2; i++){
        images.push(loadImage("assets/amazon" + i + ".png"));
    }
    images.push(loadImage("assets/arrow.png"));
    images.push(loadImage("assets/target.png"));
}

function draw () {
    background(100);
    board.showGrid();
    board.showPieces();
}

function mousePressed() {
    var x = floor(mouseX / tileSize);
    var y = floor(mouseY / tileSize);

    if (shooting) { // Arrow ready, waiting for target
        if (movingArrow.canMove(x,y,board)){
            movingArrow.move(x, y, board);
            movingArrow.isMoving = false;
            shooting = false;
            whitesMove = !whitesMove;
            console.log("Arrow shot");            
        }
    } else if (!moving) { // No piece selected until now
        movingPiece = board.getPieceAt(x, y); // The potential piece you just clicked
        if (movingPiece == null || movingPiece instanceof Arrow) { // You cant select the arrows, or a empty square
            console.log("Non valid selection, try again");
            return false;
        }
        if (whitesMove){
            if (movingPiece.isWhite){
                movingPiece.isMoving = true; // You picked up a white amazon
                moving = true; // You are gonna move that amazon
                console.log("Moving a white amazon");
            }
            else{
                console.log("Cant choose a black piece in white turn");
                return false;
            }
        } else {
            if (!movingPiece.isWhite){
                movingPiece.isMoving = true; // You picked up a black amazon
                moving = true; // You are gonna move that amazon
                console.log("Moving a black amazon");
            }
            else{
                console.log("Cant choose a white piece in black turn");
                return false;
            }
        }
    } else if (moving) { // You are trying to put down the amazon
        if (movingPiece.canMove(x, y, board)) { // Check if the amazon can move to the new destination
            movingPiece.move(x, y, board); // Move it
            movingPiece.isMoving = false; // You are no longer moving the amazon, it arrived its destination
            moving = false; // You are not moving anything from the board
            // movingPiece = null;
            console.log("Amazon put down");

            shooting = true; // You placed the amazon, now its time to shoot
            movingArrow = new Arrow(x, y, true); // Create an arrow from where the amazon is located now
            movingArrow.isMoving = true; // You are gonna move the arrow
            board.pushArrow(movingArrow); // Add the arrow to the board
            console.log("The amazon is ready to shoot");
        } else { // You cant move there
            movingPiece.isMoving = false; // You put the piece where it was 
            // movingPiece = null;
            moving = false; // You are not moving anything from the board
        }
    }
}