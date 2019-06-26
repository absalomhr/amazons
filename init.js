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
    images.push(loadImage("assets/arrow.jpeg"));
}

function draw () {
    background(100);
    board.showGrid();
    board.showPieces();
}

function mousePressed() {
    var x = floor(mouseX / tileSize);
    var y = floor(mouseY / tileSize);

    if (whitesMove) {
        if (shooting){ // Time to choose the target
            if (movingArrow.canMove(x,y,board)){
                console.log("leaving arrow");
                movingArrow.move(x, y, board);
                movingArrow.isMoving = false;
                shooting = false;
                whitesMove = !whitesMove;
            }
            else {
                console.log("cant shoot");
                return false;
            }
        }

        if(!moving) { // There isnt a piece moving
            movingPiece = board.getPieceAt(x, y); // The potential piece you just clicked
            if (movingPiece != null && movingPiece.isWhite){
                movingPiece.isMoving = true;
                moving = !moving; // You are moving a piece
            } else {
                // There's no piece to move where you clicked
                // Or its of color black
                movingPiece = null;
                return false;
            }
        } else { // You are moving a piece
            if (movingPiece.canMove(x, y, board)){ // Check if the piece can move to where you clicked
                movingPiece.move(x, y, board); // It can
                movingPiece.isMoving = false; // You are no longer moving the piece, it arrived its destination
                moving = !moving;
                movingPiece = null;

                shooting = true; // You placed the amazon, now its time to shoot
                movingArrow = new Arrow(x, y, true); // Create an arrow where piece is located now
                movingArrow.isMoving = true;
                board.pushArrow(movingArrow); // Add it to the board
                //whitesMove = !whitesMove; // Its blacks turn
            } else { // You cant move there, try other move
                movingPiece.isMoving = false;
                movingPiece = null;
                moving = !moving;
                return false;
            }
        }
    } else { // Black moves
        if (shooting){ // Time to choose the target
            if (movingArrow.canMove(x,y,board)){
                console.log("leaving arrow");
                movingArrow.move(x, y, board);
                movingArrow.isMoving = false;
                shooting = false;
                whitesMove = !whitesMove;
            }
            else {
                console.log("cant shoot");
                return false;
            }
        }

        if(!moving) { // There isnt a piece moving
            movingPiece = board.getPieceAt(x, y); // The potential piece you just clicked
            if (movingPiece != null && !movingPiece.isWhite){
                movingPiece.isMoving = true;
                moving = !moving; // You are moving a piece
            } else {
                // There's no piece to move where you clicked
                // Or its of color white
                movingPiece = null;
                return false;
            }
        } else { // You are moving a piece
            if (movingPiece.canMove(x, y, board)){ // Check if the piece can move to where you clicked
                movingPiece.move(x, y, board); // It can
                movingPiece.isMoving = false; // You are no longer moving the piece, it arrived its destination
                moving = !moving;
                movingPiece = null;
                
                shooting = true; // You placed the amazon, now its time to shoot
                movingArrow = new Arrow(x, y, false); // Create an arrow where piece is located now
                movingArrow.isMoving = true;
                board.pushArrow(movingArrow); // Add it to the board
                //whitesMove = !whitesMove; // Its whites turn
            } else { // You cant move there, try other move
                movingPiece.isMoving = false;
                movingPiece = null;
                moving = !moving;
                return false;
            }
        }
    }
}