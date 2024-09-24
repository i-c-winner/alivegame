export interface Cell {
    alive: boolean;
}

export class Grid {
    grid: Cell[][];
    private cells: number;

    constructor(public width: number, public height: number) {
        this.grid = this.initializeGrid();
        this.cells=0
    }

    private initializeGrid(): Cell[][] {

        return Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, () => {
                   return ({ alive: Math.random() > 0.5 })
            })
        );
    }

    public updateCell(x: number, y: number, alive: boolean) {

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.grid[y][x].alive = alive;
        }
    }

    public getGrid() {
        return this.grid;
    }
}
