/// <reference path="../../typings/tsd.d.ts" />
import * as fs from "fs";
export
/**
 * elevator
 */
class Elevator {
    passengers: number[];
    destinationFloor: number;
    passengerQty: number;
    time: number;
    private _nextElevator: Elevator;
    constructor(public maxCapacity: number) {
        this.time = 0;
    }
    public set nextElevator(nextElevator: Elevator) {
        this._nextElevator = nextElevator;
    }
    public get nextElevator() {
        return this._nextElevator;
    }
    addPassenger(passengerId: number, passengerDestination: number, outputStream: fs.WriteStream) {
        if (!this.passengers || !this.passengers.length) {
            this.passengers = [passengerId];
            this.destinationFloor = passengerDestination;
            this.passengerQty = 1;
        } else {
            if (passengerDestination > this.destinationFloor &&
                this.nextElevator) {
                this.nextElevator.addPassenger(passengerId, passengerDestination, outputStream);
            } else {
                this.passengerQty = this.passengers.push(passengerId);
                if (passengerDestination > this.destinationFloor) {
                    this.destinationFloor = passengerDestination;
                }
            }
        }
        if (this.passengerQty === this.maxCapacity) {
            this.logger(outputStream);
        }
    }
    logger(outputStream: fs.WriteStream) {
        this.time += 3 * this.destinationFloor;
        outputStream.write(`Finished serving passengers ${this.passengers.join(", ")} after ${this.time} seconds \n`);
        this.passengers = [];
        this.passengerQty = 0;
    }
}