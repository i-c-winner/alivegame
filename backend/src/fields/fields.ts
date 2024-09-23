const dimension = 200
type TSmell = number
type TField = {
    position: {
        x: number,
        y: number
    },
    smell: TSmell,
    bornCell: boolean,
    canteen: boolean,
}
type TFields = TField[][]
type TCreatingFields = () => void

interface IWorld {
    fields: TFields,
    creatingFields: TCreatingFields,
    getFields: () => TFields,
    createBornCell: () => void,
    createCanteenCell: (z: number) => void,
    getRandom: () => number,
    doesHaveAnt: (x: number, y: number)=> boolean,
    changeSmell: (x: number, y: number, smell: TSmell)=>void
}


const world: IWorld = {
    fields: [] as TField[][],
    creatingFields: function () {
        for (let i = 0; i < dimension; i++) {
            const row = []
            for (let j = 0; j < dimension; j++) {
                row.push({
                    position: {
                        x: i,
                        y: j
                    },
                    smell: 0.15,
                    bornCell: false,
                    canteen: false,

                })
            }
            this.fields.push(row)
        }
    },
    getFields: function () {
        return this.fields
    },
    createBornCell: function () {
        const x = this.getRandom()
        const y = this.getRandom()
        for (let i=-1;i<2;i++) {
                this.fields[x][y].bornCell = true
        }
        this.fields[x][y].bornCell = true
    },
    createCanteenCell: function (z) {
        for (let j = 0; j < z; j++) {
            const x = this.getRandom();
            const y = this.getRandom()

            for (let i=-1;i<2;i++) {
                    this.fields[x][y].canteen = true
            }
        }
    },
    getRandom: function () {
        return Math.floor(Math.random() * (dimension - 20 + 1)) + 10
    },
    doesHaveAnt: function (x,y) {
        return this.fields[x][y].smell===0.8
    },
    changeSmell: function (x,y, smell) {
        this.fields[x][y].smell=smell
    }


}
module.exports = {myworld: world}