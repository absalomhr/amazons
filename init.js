var images = []
var board;
var tileSize = 100;

function setup() {
    board = new Board();
    createCanvas(600, 600);
    for (var i = 0; i < 2; i++){
        images.push(loadImage("assets/amazon" + i + ".png"));
    }
}

function draw () {
    background(100);
    board.showGrid();
    board.showPieces();
}