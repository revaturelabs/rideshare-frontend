export class Batch {

    batchNumber: number;
    batchLocation: string;

    constructor(x:string, y:string) {
        this.batchNumber = Number(x);
        this.batchLocation = y;
    }

}