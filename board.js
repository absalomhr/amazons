class Board {
    constructor() {
        this.whiteAmazons = [];
        this.blackAmazons = [];
        this.arrows = [];
        this.setupPieces();
    }

    setupPieces() {
        if(dim == 10){
            this.whiteAmazons.push(new Amazon(3, 9, true));
            this.whiteAmazons.push(new Amazon(6, 9, true));
            this.whiteAmazons.push(new Amazon(0, 6, true));
            this.whiteAmazons.push(new Amazon(9, 6, true));

            this.blackAmazons.push(new Amazon(3, 0, false));
            this.blackAmazons.push(new Amazon(6, 0, false));
            this.blackAmazons.push(new Amazon(0, 3, false));
            this.blackAmazons.push(new Amazon(9, 3, false));
        }
        else if (dim == 6){
            this.whiteAmazons.push(new Amazon(2, 5, true));
            this.whiteAmazons.push(new Amazon(3, 0, true));

            this.blackAmazons.push(new Amazon(0, 2, false));
            this.blackAmazons.push(new Amazon(5, 3, false));
        }
    }

    showGrid () {
        for (let i = 0; i < dim; i ++){
            for (let j = 0; j < dim; j++){
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
            for (let i = 0; i < this.whiteAmazons.length; i++){
                this.whiteAmazons[i].show(); 
                
            }
        }
        else {
            for (let i = 0; i < this.whiteAmazons.length; i++){
                this.whiteAmazons[i].show(); 
                
            }
            for (let i = 0; i < this.blackAmazons.length; i++){
                this.blackAmazons[i].show();  
            }
        }
    }

    getPieceAt(x, y) {
        for (let i = 0; i < this.whiteAmazons.length; i++) {
            if (this.whiteAmazons[i].boardPosition.x == x && this.whiteAmazons[i].boardPosition.y == y) {
                    return this.whiteAmazons[i];
            }
        }
        for (let i = 0; i < this.blackAmazons.length; i++) {
            if (this.blackAmazons[i].boardPosition.x == x && this.blackAmazons[i].boardPosition.y == y) {
                return this.blackAmazons[i];
            }
        }
        for (let i = 0; i < this.arrows.length; i++){
            if (this.arrows[i].boardPosition.x == x && this.arrows[i].boardPosition.y == y) {
                return this.arrows[i];
            }
        }
        return null;
    }

    pushArrow(arrow){
        this.arrows.push(arrow);
    }

    isGameOver () {
        // Check if players have moves left, else they lost
        let contw = 0;
        let contb = 0;
        for (let i = 0; i < this.whiteAmazons.length; i++){
            if (this.whiteAmazons[i].haveAMove()){
                contw += 1;
            }
            if (this.blackAmazons[i].haveAMove()){
                contb += 1;
            }
        }
        let res = createVector(contw, contb);
        return res;
    }
}