/// <reference path="../../typings/tsd.d.ts" />

import {bankGen} from "./queue-manager";
import {Elevator} from "../elevator/elevator";
import { queueRunner } from "./queue-manager";
import * as fs from "fs";
describe("bankGen", () => {
  it("makes a bank of elevators", () => {
    let testBank = bankGen(3, 3);
    expect(testBank.length).toBe(3);
  });
  it("links those elevators together", () => {
    let testBank = bankGen(3, 3);
    expect(testBank[0].nextElevator instanceof Elevator).toBeTruthy("falsy!");
  });
});

describe("queueRunner", () => {
  it("adds each passenger in the queue to the elevator bank", (done) => {
    let testBank = bankGen(1, 4);
    let output = fs.createWriteStream("./output.txt");
    queueRunner([1, 2, 3, 4, 5, 6, 7, 8], testBank, output);
    output.end("finished", () => {
                fs.readFile("./output.txt", (err: NodeJS.ErrnoException, data: Buffer) => {
                    if (err) console.error(err);
                    expect(data.toString()).toContain("Finished serving passengers");
                    done();
                });
            });
  });
});