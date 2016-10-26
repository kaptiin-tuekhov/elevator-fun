/// <reference path="../../typings/tsd.d.ts" />

// import fs = require("fs");

// export function demandDensityReader(inputFilePath:string) {
//     fs.readFile(inputFilePath, 'utf8', (err, data) => {
//         if (err) {
//             console.log(err)
//         }
//         data.
//     })
// }
export /**
 * elevator
 */
class Elevator {
    passengers: number[];
    destinationFloor: number;
    constructor(maxCapacity: number) {
        this.passengers = new Array(maxCapacity);
    }
    addPassenger(passenger: number[]) :
}