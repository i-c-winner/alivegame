import {Grid} from "../models/grid";

export class AutomatonService {
    grid: Grid;

    constructor(width: number, height: number) {
        this.grid = new Grid(width, height);
    }

    reset() {
        this.grid = new Grid(this.grid.width, this.grid.height);
    }

    public applyRules() {
        const newGrid = new Grid(this.grid.width, this.grid.height);

        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
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
            if (nx >= 0 && nx < this.grid.width && ny >= 0 && ny < this.grid.height) {
                count += this.grid.grid[ny][nx].alive ? 1 : 0;
            }
            return count;
        }, 0);
    }

    public getGrid() {
        return this.grid.getGrid();
    }
}
