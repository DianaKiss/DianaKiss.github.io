'use strict';

let numArraySum = 0;
let numArrayAvg = 0;

export function numberAdder(numArray) {

  for(let i = 0; i < numArray.length; i++) {
    numArraySum = numArraySum + numArray[i];
    return numArraySum
  }

  numArrayAvg = numArraySum / (numArray.length + 1);
}
