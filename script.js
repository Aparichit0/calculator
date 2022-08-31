let total = "0"; //string is used to avoid later conflicts
let numString = "";
const numArray = [];
const operatorArray = [];

const isDecimal = (num) => !Number.isInteger(num); //Integer is not decimal

// handle basic mathematical operations
const operate = {
  add: (nextVal) => (total += nextVal),
  subtract: (nextVal) => (total -= nextVal),
  multiply: (nextVal) => (total *= nextVal),
  divide: (nextVal) => (total /= nextVal),
  equals: () => total,
};

// key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach((e) => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  const keyValue = key.target.value;

  if (key.target.type == "button") {
    numString += keyValue;
    updateDisplay(`${numString}`);
    return;
  }
  if (key.target.type == "submit") {
    const operator = key.target.id;
    if (total === "0" && operator == "subtract") {
      //accept negative value for first number
      numString += "-";
      updateDisplay(`${numString}`);
      return;
    }
    addNewNum();
    operatorArray.push(operator); //save operator for next operation
    calcResult();
    if (operator == "equals") {
      //results on main display
      updateDisplay(`${total}${key.target.value}`, "");
      return;
    }
    updateDisplay(null, `${total}${key.target.value}`);
    return;
  }
  return;
}

// displayText
const subDisplay = document.querySelector("#display>.sub");
const mainDisplay = document.querySelector("#display>.main");
function updateDisplay(mainText, subText) {
  if (mainText != null) {
    mainDisplay.innerText = mainText;
  }
  if (subText != null) {
    subDisplay.innerText = subText;
    mainDisplay.innerText = mainText;
  }
}

function addNewNum() {
  const newNum = Number.parseFloat(numString);
  numString = ""; //reset
  numArray.push(newNum);
}

function calcResult() {
  const nextNum = numArray.shift();
  if (total === "0") return (total = nextNum); //treat first number as total
  prevOperator = operatorArray.shift(); //previously saved operator in queue
  if (!nextNum) return; //if newNum doesn't exist, change prevOperator
  return operate[prevOperator](nextNum);
}

// return decimal information
function decimalIntensity(num) {
  if (!isDecimal(num)) return; //exit if not decimal
  const decimalIndex = `${num}`.indexOf(".");
  const decimalLength = `${num}`.length - 1; //length counts from 1
  const fractionIntensity = decimalLength - decimalIndex; //count of digits after "."
  return fractionIntensity;
}