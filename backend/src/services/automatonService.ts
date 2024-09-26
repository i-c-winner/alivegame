import {Grid} from "../models/grid";

export class AutomatonService {
    grid: Grid;
    private seizing: { x: number; y: number };

    constructor() {
        this.applyRules=this.applyRules.bind(this);
    }

    create() {
        this.grid = new Grid() ;
        this.grid.setSizing(this.seizing.x, this.seizing.y);
        this.grid.create()
    }
    setSeizing(x: number, y: number) {
        this.seizing={
            x,
            y
        }
    }

    public applyRules() {
        const newGrid = new Grid();
        newGrid.setSizing(this.seizing.x, this.seizing.y)
        newGrid.create()
        for (let y = 0; y < this.seizing.y; y++) {
            for (let x = 0; x < this.seizing.x; x++) {
                const aliveNeighbors = this.countAliveNeighbors(x, y);
                const cell = this.grid.grid[y][x];

                if (cell.alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    newGrid.updateCell(x, y, false);
                } else if (!cell.alive && aliveNeighbors === 3) {
                    newGrid.updateCell(x, y, true);
                } else {
                    newGrid.updateCell(x, y, cell.alive);
                }
            }
        }

        this.grid = newGrid;
    }

    private countAliveNeighbors(x: number, y: number): number {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        return directions.reduce((count, [dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < this.seizing.x && ny >= 0 && ny < this.seizing.y) {
                count += this.grid.grid[ny][nx].alive ? 1 : 0;
            }
            return count;
        }, 0);
    }

    public getGrid() {
        return this.grid.getGrid();
    }
}
