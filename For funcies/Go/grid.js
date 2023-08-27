class Grid {
    constructor(rows, cols = rows, w = width, h = height, x = 0, y = 0) {
        this.grid = []
        this.data = {
            rows: rows,
            cols: cols,
            x: x,
            y: y,
            w: w,
            h: h
        }
        // Standard element for a position in grid
        this.GridElement = class GridElement {
            constructor(x,y,px, py) {
                this.x = x
                this.y = y
                this.px = px
                this.py = py
                this.occupied = false
            }
        }
        // All debugging tools
        this.debug = {
            point: (x,y) => {
                switch (typeof x) {
                    case "number":
                        let coords = this.pos(x,y)
                        rd.debug.createSimpleObject(coords.px,coords.py,10)
                        break;
                    case "object":
                        rd.debug.createSimpleObject(x.px,x.py,10)
                        break;
                }
            },
        }
    }
    // Initialize grid
    createGrid() {
        for (let row = 0; row < this.data.rows; row++) {
            this.grid[row] = []
            for (let col = 0; col < this.data.cols; col++) {
                const pos = {x: this.data.w/this.data.rows*row+this.data.x, y: this.data.h/this.data.cols*col+this.data.y}
                this.grid[row][col] = new this.GridElement(row,col,pos.x,pos.y)
            }   
        }
    }
    // Get pixelposition from grid position
    pos(x, y) {
        return this.grid[x] && this.grid[y] ? this.grid[x][y]: console.error('No such grid position') 
    }
    drawlines() {
        this.grid.forEach(row => {
            rd.add('grid', () => line(row[0].px, row[0].py, row[row.length-1].px, row[row.length-1].py))
        });
        let firstCol = this.grid[0];
        let lastCol = this.grid[this.grid.length-1];
        for(let i=0; i < this.grid[0].length; i++) {
            rd.add('grid', () => line(firstCol[i].px, firstCol[i].py,lastCol[i].px,lastCol[i].py))
        }
    }

    // Nearest position in grid

    getAllPos() {
        let returnArr = this.grid[0];
        for (let i = 1; i < this.grid.length; i++) {
            const col = this.grid[i];
            returnArr = concat(returnArr, col)
        }
        return returnArr 
    }
    nearestPos(pos) {
        return this.getAllPos().reduce((a,b) => dist(pos.x,pos.y,a.px,a.py) < dist(pos.x,pos.y,b.px,b.py) ? a : b)
    }
}