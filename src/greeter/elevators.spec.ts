/// <reference path="../../typings/tsd.d.ts" />

import {Elevator} from "./elevators";

describe("Elevator", () => {
    // Arrange
    let elevator = new Elevator(4);
        it("has a maximum capacity", () => {
            // Act
            let maxCapacity = elevator.passengers.length;
            // Assert
            expect(maxCapacity).toEqual(4);
        });
        it("accepts passengers", () => {

        });
});