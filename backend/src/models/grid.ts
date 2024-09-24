export interface Cell {
    alive: boolean;
}

export class Grid {
    grid: Cell[][];
    private cells: number;
    private seizing: { x: number; y: number };

    constructor() {
        this.initializeGrid=this.initializeGrid.bind(this);
    }
    create() {
        this.grid = this.initializeGrid();
    }
    setSizing(x: number, y: number) {
        this.seizing={
            x,
            y
        }
    }

    private initializeGrid(): Cell[][] {
        console.log(this)
        return Array.from({ length: this.seizing.y }, () =>
            Array.from({ length: this.seizing.x }, () => {
                   return ({ alive: Math.random() > 0.5 })
            })
        );
    }

    public updateCell(x: number, y: number, alive: boolean) {

        if (x >= 0 && x < this.seizing.x && y >= 0 && y < this.seizing.y) {
            this.grid[y][x].alive = alive;
        }
    }

    public getGrid() {
        return this.grid;
    }
}
