class Piece {
    constructor (x, y, isWhite){
        this.boardPosition = createVector(x,y);
        this.pixelPositon = createVector (x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        this.isWhite = isWhite;
        this.image = null;
        this.isMoving = false;
    }

    withinBounds(x, y) {
        if (x >= 0 && y >= 0 && x < dim && y < dim) {
            return true;
        }
        return false;
    }

    movingIntoPiece(x, y) {
        var piece = board.getPieceAt(x, y);
        if (piece != null) {
            return true;
        }
        else {
            return false;
        }
    }

    movingThroughPieces(x, y) {
        var xDirection = x - this.boardPosition.x;
        var yDirection = y - this.boardPosition.y;
        if (xDirection > 0){
            xDirection = 1;
        } else if (xDirection < 0){
            xDirection = -1;
        }
        if (yDirection > 0){
            yDirection = 1;
        } else if (yDirection < 0){
            yDirection = -1;
        }
        var travel = createVector(this.boardPosition.x, this.boardPosition.y);
        travel.x += xDirection;
        travel.y += yDirection;
        while (travel.x != x || travel.y != y){
            if(board.getPieceAt(travel.x, travel.y) != null){
                return true;
            }
            travel.x += xDirection;
            travel.y += yDirection;
        }
        return false;
    }

    canMove(x, y){
        if (!this.withinBounds(x,y)){
            return false;
        }
        else if (this.movingIntoPiece(x, y)){
            return false;
        } // Orthogonal move
        else if (x == this.boardPosition.x || y == this.boardPosition.y){
            if (this.movingThroughPieces(x, y)){
                return false;
            }
            else {
                return true;
            }
        } // Diagonal move
        else if (abs(x - this.boardPosition.x) == abs (y - this.boardPosition.y)){
            if (this.movingThroughPieces(x, y)){
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }

    move (x, y){
        this.boardPosition = createVector (x, y);
        this.pixelPositon = createVector (x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
    }
}

class Amazon extends Piece {
    constructor (x, y, isWhite) {
        super (x, y, isWhite);
    }

    show () {
        if (this.image != null){
            imageMode(CENTER);
            if (this.isMoving) {
                image(this.image, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);
            } else {
                image(this.image, this.pixelPositon.x, this.pixelPositon.y, tileSize, tileSize);
            }
        }
        else{
            this.setimage();
        }
    }

    setimage() {
        if (this.isWhite) {
            this.image = images[1];
        } else {
            this.image = images[0];
        }
    }

    haveAMove() {
        // Try to move one square into any directiom, if cant in all of them
        // this amazon has no moves left
        if (this.canMove(this.boardPosition.x, this.boardPosition.y - 1)){
            return true;
        } else if (this.canMove(this.boardPosition.x, this.boardPosition.y + 1)){
            return true;
        } else if (this.canMove(this.boardPosition.x + 1, this.boardPosition.y)){
            return true;
        } else if (this.canMove(this.boardPosition.x - 1, this.boardPosition.y)){
            return true;
        } else if (this.canMove(this.boardPosition.x + 1, this.boardPosition.y + 1)){
            return true;
        } else if (this.canMove(this.boardPosition.x - 1, this.boardPosition.y - 1)){
            return true;
        } else if (this.canMove(this.boardPosition.x - 1, this.boardPosition.y + 1)){
            return true;
        } else if (this.canMove(this.boardPosition.x + 1, this.boardPosition.y - 1)){
            return true;
        }
        return false;
    }
}

class Arrow extends Piece {
    constructor (x, y, isWhite) {
        super (x, y, isWhite);
    }

    show () {
        if (this.image != null){
            
            if (this.isMoving) {
                imageMode(CORNER);
                image(this.image, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);
            } else {
                imageMode(CENTER);
                this.image = images[3];
                image(this.image, this.pixelPositon.x, this.pixelPositon.y, tileSize, tileSize);
            }
        }
        else{
            this.setimage();
        }
    }

    setimage() {
        if (this.isWhite) {
            this.image = images[2];
        } else {
            this.image = images[2];
        }
    }
}