'use strict';

let test = require('tape');
let numberAdder = require('./numberAdder');

test('test if numberAdder sums the nums from an array', t => {
  let newArray = [1, 2, 3];
  const actual = numberAdder(newArray);
  const expected = 6;

  t.equal(actual, expected);
  t.end();

});