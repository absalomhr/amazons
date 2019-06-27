class Board {
    constructor() {
        this.whiteAmazons = [];
        this.blackAmazons = [];
        //this.whiteArrows = [];
        //this.blackArrows = [];
        this.arrows = [];
        this.setupPieces();
    }

    setupPieces() {
        // White pieces (played by human)
        this.whiteAmazons.push(new Amazon(3, 9, true));
        this.whiteAmazons.push(new Amazon(6, 9, true));
        this.whiteAmazons.push(new Amazon(0, 6, true));
        this.whiteAmazons.push(new Amazon(9, 6, true));


        // Black pieces (played by a computer)
        this.blackAmazons.push(new Amazon(3, 0, false));
        this.blackAmazons.push(new Amazon(6, 0, false));
        this.blackAmazons.push(new Amazon(0, 3, false));
        this.blackAmazons.push(new Amazon(9, 3, false));

        //console.log("Pieces are set!")
    }

    showGrid () {
        for (var i = 0; i < 10; i ++){
            for (var j = 0; j < 10; j++){
                if ((i + j) % 2 == 1){
                    fill(134, 89, 45);
                } else {
                    fill(255, 204, 102);
                }
                noStroke();
                rect(i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }

    showPieces () {
        for (let i = 0; i < this.arrows.length; i++){
            this.arrows[i].show();
        }
        // Showing black pieces first if whites move
        // This way when moving a white piece
        // It will show on top of the black pieces
        if (whitesMove) {
            for (let i = 0; i < this.blackAmazons.length; i++){
                this.blackAmazons[i].show();  
            }
            // for (let i = 0; i < this.blackArrows.length; i++){
            //     this.blackArrows[i].show();  
            // }
            for (let i = 0; i < this.whiteAmazons.length; i++){
                this.whiteAmazons[i].show(); 
                
            }
            // for (let i = 0; i < this.whiteArrows.length; i++){
            //     this.whiteArrows[i].show(); 
            // }
        }
        else {
            for (let i = 0; i < this.whiteAmazons.length; i++){
                this.whiteAmazons[i].show(); 
                
            }
            // for (let i = 0; i < this.whiteArrows.length; i++){
            //     this.whiteArrows[i].show(); 
            // }
            for (let i = 0; i < this.blackAmazons.length; i++){
                this.blackAmazons[i].show();  
            }
            // for (let i = 0; i < this.blackArrows.length; i++){
            //     this.blackArrows[i].show();  
            // }

        }


        //console.log("You should see the pieces :)");
    }

    getPieceAt(x, y) {
        for (var i = 0; i < this.whiteAmazons.length; i++) {
            if (this.whiteAmazons[i].boardPosition.x == x && this.whiteAmazons[i].boardPosition.y == y) {
                    return this.whiteAmazons[i];
            }
        }
        for (var i = 0; i < this.blackAmazons.length; i++) {
            if (this.blackAmazons[i].boardPosition.x == x && this.blackAmazons[i].boardPosition.y == y) {
                return this.blackAmazons[i];
            }
        }
        for (var i = 0; i < this.arrows.length; i++){
            if (this.arrows[i].boardPosition.x == x && this.arrows[i].boardPosition.y == y) {
                return this.arrows[i];
            }
        }
        return null;
    }

    pushArrow(arrow){
        this.arrows.push(arrow);
        /*if (arrow.isWhite){
            this.whiteArrows.push(arrow);
        }
        else {
            this.blackArrows.push(arrow);
        }*/
    }
}