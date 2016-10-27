/// <reference path="../../typings/tsd.d.ts" />
import * as fs from "fs";
import {Elevator} from "./elevator";
describe("Elevator", () => {
    let elevator = new Elevator(4);
    let output = fs.createWriteStream("./output.txt");
        it("has a maximum capacity", () => {
            // Act
            let maxCapacity = elevator.maxCapacity;
            // Assert
            expect(maxCapacity).toEqual(4);
        });
        it("can add passengers", () => {
            elevator.addPassenger(1, 5, output);
            expect(elevator.passengers).toEqual([1]);
            expect(elevator.destinationFloor).toBe(5);
        });
        it("adds additional passengers", () => {
            elevator.addPassenger(2, 3, output);
            expect(elevator.passengers).toEqual([1, 2]);
            expect(elevator.destinationFloor).toBe(5);
            expect(elevator.passengerQty).toBe(2);
        });
        it("can pass passengers to the next elevator to save time", () => {
            let elevator2 = new Elevator(4);
            elevator.nextElevator = elevator2;
            elevator.addPassenger(3, 6, output);
            expect(elevator.passengers).toEqual([1, 2]);
            expect(elevator.destinationFloor).toBe(5);
            expect(elevator.passengerQty).toBe(2);
            expect(elevator2.passengers).toEqual([3]);
            expect(elevator2.destinationFloor).toBe(6);
            expect(elevator2.passengerQty).toBe(1);
        });
        it("serves passengers when full, writes output", (done) => {
            elevator.addPassenger(3, 4, output);
            elevator.addPassenger(4, 4, output);
            output.end("finished", () => {
                fs.readFile("./output.txt", (err: NodeJS.ErrnoException, data: Buffer) => {
                    if (err) console.error(err);
                    expect(data.toString()).toContain("Finished serving passengers");
                    done();
                });
            });
            expect(elevator.passengerQty).toBe(0);
        });
});