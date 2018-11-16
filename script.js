'use strict';

let numberAdder = require('./numberAdder');

document.querySelector('.numberAdder').addEventListener('submit', (e) => {
  e.preventDefault();
  const elements = e.target.elements;

  console.log(elements.countNumber.value);

  let countNumber = elements.countNumber.value;
  let defineNumbersForm = document.createElement('div')

  // return countNumber;

  document.querySelector('article').appendChild(defineNumbersForm);
  defineNumbersForm.setAttribute('class', 'defineNumbersForm');
  defineNumbersForm.innerHTML = `<form class="defineNumbers">
  <label>
    <p>Please enter ${countNumber} numbers one-by-one here!</p>
    <input type="number" name="countNumber" id="countNumber"> 
  </label>
  <button>Submit</button>
</form>`;
});

// let numbersFromForm = [];

// numberAdder(numbersFromForm);






