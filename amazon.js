class Amazon {
    constructor(x, y, isWhite){
        this.boardPosition = createVector (x, y);
        this.pixelPositon = createVector (x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        this.isWhite = isWhite;
        this.isMoving = false;
        this.image = null;
        this.imageSet = false;
    }

    show () {
        if (this.imageSet){
            imageMode(CENTER);
            if (this.isMoving) {
                image(this.image, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);
            } else {
                image(this.image, this.pixelPositon.x, this.pixelPositon.y, tileSize, tileSize);
            }
        }
        else {
            this.setImage();
        }
    }

    setImage () {
        if (this.isWhite){
            this.image = images[1];
            this.imageSet = true;
        }
        else {
            this.image = images[0];
            this.imageSet = true;
        }
    }

    withinBounds(x, y) {
        if (x >= 0 && y >= 0 && x < 10 && y < 10) {
            return true;
        }
        return false;
    }

    movingIntoPiece (x, y, board) {
        var piece = board.getPieceAt(x, y);
        if (piece != null) {
            return true;
        }
        else {
            return false;
        }
    }

    canMove(x, y, board){
        if (!this.withinBounds(x,y)){
            return false;
        }
        if (this.movingIntoPiece(x, y, board)){
            return false;
        }       
        return true;
    }

    move (x, y, board){
        // TODO check if can move to x, y
        this.boardPosition = createVector (x, y);
        this.pixelPositon = createVector (x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

    }


}