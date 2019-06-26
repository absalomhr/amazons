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
}