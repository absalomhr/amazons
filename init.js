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
        
    // If there isn't a piece moving
    if(!moving){
        movingPiece = board.getPieceAt(x, y);
        if (whitesMove){ // White
            if (movingPiece != null && movingPiece.isWhite){
                movingPiece.isMoving = true;
            } else {
                movingPiece = null;
                return false;
            }
        } else { // Black
            if (movingPiece != null && !(movingPiece.isWhite)){
                movingPiece.isMoving = true;
            } else {
                movingPiece = null;
                return false;
            }
        }
    } else { // If a piece is moving
        if (movingPiece.canMove(x, y, board)){
            movingPiece.move(x, y, board);
            movingPiece.isMoving = false;    
        } else {
            movingPiece.isMoving = false;
        }   
    }
    moving = !moving;
    whitesMove = !whitesMove;
}