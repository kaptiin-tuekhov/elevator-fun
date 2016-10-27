# Prescriptive Data Code Test

## Getting Started

1.
    ```
    npm install
    ```

2.
    ```
    npm run compile
    ```

## Usage

1. Place input files in root directory.
   Files sent with test already included.

2. To run:
    ```
    node dist/mainctrl/mainctrl [inputFileName] [quantity of elevators (M)] [capacity of elevators (Q)]
    ```
    Example:
    ```
    node dist/mainctrl/mainctrl input1.txt 4 10
    ```


3. File called ```output.txt``` will be written in route directory

## Tests

Jasmine framework included. ```npm test``` to run. Specs are in src alongside what they are testing