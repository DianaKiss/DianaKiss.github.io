'use strict';

let numArraySum = 0;
let numArrayAvg = 0;

let myArray = [1,2,3];

function numberAdder(numArray) {

  for(let i = 0; i < numArray.length; i++) {
    numArraySum = numArraySum + numArray[i];
  }
  numArrayAvg = numArraySum / (numArray.length + 1);
  console.log(numArraySum);
  console.log(numArrayAvg);

}

// console.log(numberAdder(myArray));

(numberAdder(myArray));

