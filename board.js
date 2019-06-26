class Board {
    constructor() {
        this.whiteAmazons = [];
        this.blackAmazons = [];
        this.setupPieces();
    }

    setupPieces() {
        // White pieces (played by human)
        this.whiteAmazons.push(new Amazon(3, 0, true));
        this.whiteAmazons.push(new Amazon(2, 5, true));

        // Black pieces (played by a computer)
        this.blackAmazons.push(new Amazon(0, 2, false));
        this.blackAmazons.push(new Amazon(5, 3, false));

        console.log("Pieces are set!")
    }

    showGrid () {
        for (var i = 0; i < 6; i ++){
            for (var j = 0; j < 6; j++){
                if ((i + j) % 2 == 1){
                    fill(0);
                } else {
                    fill(240);
                }
                noStroke();
                rect(i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }

    showPieces () {
        for (let i = 0; i < 2; i++){
            this.whiteAmazons[i].show();
            this.blackAmazons[i].show();
        }
    }
}