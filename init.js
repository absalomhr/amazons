var images = [];
var board;
var tileSize = 100;
var movingPiece;
var moving = false;
var whitesMove = true;

function setup() {
    board = new Board();
    window.canvas = createCanvas(1000, 1000);
    canvas.parent("canvas");
    for (var i = 0; i < 2; i++){
        images.push(loadImage("assets/amazon" + i + ".png"));
    }   
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
                whitesMove = !whitesMove; // Its blacks turn
            } else { // You cant move there, try other move
                movingPiece.isMoving = false;
                movingPiece = null;
                moving = !moving;
                return false;
            }
        }
    } else { // Black moves
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
                whitesMove = !whitesMove; // Its whites turn
            } else { // You cant move there, try other move
                movingPiece.isMoving = false;
                movingPiece = null;
                moving = !moving;
                return false;
            }
        }
    }
}