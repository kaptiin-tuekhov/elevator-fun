/// <reference path="../../typings/tsd.d.ts" />

import {Elevator} from "../elevator/elevator";
import * as fs from "fs";
export function bankGen(elevatorQty: number, elevatorCpcty: number) {
  let elevatorBank: Elevator[] = [new Elevator(elevatorCpcty)];
  for (let index = 1; index < elevatorQty; index++) {
    const newElevator: Elevator = new Elevator(elevatorCpcty);
    elevatorBank[index - 1].nextElevator = newElevator;
    elevatorBank[index] = newElevator;
  }
  return elevatorBank;
}

export function queueRunner(queue: number[], elevatorBank: Elevator[], output: fs.WriteStream) {
  queue.forEach((passengerDestination, passengerId) => {
    elevatorBank[0].addPassenger(passengerId, passengerDestination, output);
  });
}