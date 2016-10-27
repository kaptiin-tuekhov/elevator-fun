/// <reference path="../../typings/tsd.d.ts" />

import * as fs from "fs";
import {bankGen, queueRunner} from "../queue-manager/queue-manager";

function mainCtrl(inputFile: string, elevatorQty: number, elevatorCpcty: number) {
  let elevatorBank = bankGen(elevatorQty, elevatorCpcty);
  let inputStream = fs.createReadStream(inputFile);
  let outputStream = fs.createWriteStream("./output.txt");
  inputStream.on("data", (chunk: Buffer) => {
    let queue = chunk.toString().split(",").map((order) => {
      return +order;
    });
    queueRunner(queue, elevatorBank, outputStream);
  });
  inputStream.on("end", () => {
    let totalTime = 0;
    elevatorBank.forEach(elevator => {
      if (elevator.passengerQty > 0) elevator.logger(outputStream);
      totalTime = elevator.time > totalTime ? elevator.time : totalTime;
    });
    outputStream.write(`total time: ${totalTime / 60} minutes`);
    outputStream.end();
  });
};

console.log(process.argv[2]);
mainCtrl(process.argv[2], +process.argv[3], +process.argv[4])