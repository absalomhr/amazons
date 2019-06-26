var images = []
var board;
var tileSize = 100;

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