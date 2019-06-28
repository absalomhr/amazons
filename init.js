let images = []; // Load images for the program
let board; // Board object
let tileSize = 100; // Size of the pieces
let movingPiece; // Variable that stores temporarily the piece that you are moving
let movingArrow; // Variable that stores temporarily the arrow that you are moving
let moving = false; // Are you moving a piece right now?
let shooting = false; // Are you shooting an arrow?
let whitesMove = window.colorStart === "white"; // Is it whites turn?
let dim = window.boardChoice; // 6 or 10, dimension of the board

function setup() {
    board = new Board();
    window.canvas = createCanvas(100*dim, 100*dim);
    canvas.parent("canvas");
    for (let i = 0; i < 2; i++){
        images.push(loadImage("assets/amazon" + i + ".png"));
    }
    images.push(loadImage("assets/arrow.png"));
    images.push(loadImage("assets/target.png"));
}

function draw () {
    background(100);
    board.showGrid();
    board.showPieces();
    let res = board.isGameOver(); 
    if (res.x == 0){
        alert("Black wins"); 
        noLoop();  
        return false;
    } else if (res.y == 0){
        alert("White wins");
        noLoop();
        return false;
    }
}

function mousePressed() {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);

    if (shooting) { // Arrow ready, waiting for target
        if (movingArrow.canMove(x,y)){
            movingArrow.move(x, y);
            movingArrow.isMoving = false;
            shooting = false;
            whitesMove = !whitesMove;
        }
    } else if (!moving) { // No piece selected until now
        movingPiece = board.getPieceAt(x, y); // The potential piece you just clicked
        if (movingPiece == null || movingPiece instanceof Arrow) { // You cant select the arrows, or a empty square
            return false;
        }
        if (whitesMove){
            if (movingPiece.isWhite){
                movingPiece.isMoving = true; // You picked up a white amazon
                moving = true; // You are gonna move that amazon
            }
            else{
                return false;
            }
        } else {
            if (!movingPiece.isWhite){
                movingPiece.isMoving = true; // You picked up a black amazon
                moving = true; // You are gonna move that amazon
            }
            else{
                return false;
            }
        }
    } else if (moving) { // You are trying to put down the amazon
        if (movingPiece.canMove(x, y)) { // Check if the amazon can move to the new destination
            movingPiece.move(x, y); // Move it
            movingPiece.isMoving = false; // You are no longer moving the amazon, it arrived its destination
            moving = false; // You are not moving anything from the board
            // movingPiece = null;

            shooting = true; // You placed the amazon, now its time to shoot
            movingArrow = new Arrow(x, y, true); // Create an arrow from where the amazon is located now
            movingArrow.isMoving = true; // You are gonna move the arrow
            board.pushArrow(movingArrow); // Add the arrow to the board
        } else { // You cant move there
            movingPiece.isMoving = false; // You put the piece where it was 
            // movingPiece = null;
            moving = false; // You are not moving anything from the board
        }
    }
}