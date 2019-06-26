var images = []
var board;
var tileSize = 100;
var movingPiece;
var moving = false;

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
    // TODO Check if arrow thrown
    
    // If there isn't a piece moving
    if(!moving){
        movingPiece = board.getPieceAt(x, y);
        if (movingPiece != null){
            movingPiece.isMoving = true;
        } else {
            return false;
        }
    } else { // If a piece is moving
        // TODO check if can move to x, y
        movingPiece.move(x, y, board);
        movingPiece.isMoving = false;
    }
    moving = !moving;
}