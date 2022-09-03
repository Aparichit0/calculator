let total = "0"; //string is used to avoid later conflicts
let numString = "";
const numArray = [];
const operatorArray = [];

const isDecimal = (num) => !Number.isInteger(num); //Integer is not decimal

// handle basic mathematical operations
const operate = {
  add: (nextVal) => {
    adjust = decimalAdjust(total, nextVal);
    total = adjust.first + adjust.second;
    return (total /= adjust.pow);
  },
  subtract: (nextVal) => {
    adjust = decimalAdjust(total, nextVal);
    total = adjust.first - adjust.second;
    return (total /= adjust.pow);
  },
  multiply: (nextVal) => {
    adjust = decimalAdjust(total, nextVal);
    total = adjust.first * adjust.second;
    return (total /= adjust.pow ** 2); //fraction magnitudes also multiplied
  },
  divide: (nextVal) => {
    adjust = decimalAdjust(total, nextVal);
    total = adjust.first / adjust.second;
    return total; //fraction magnitudes are canceled
  },
  equals: () => total,
};

function decimalAdjust(firstNum, secondNum) {
  //adjust decimals to integers of same level
  let fractionOf = 10 ** decimalIntensity(firstNum);
  if (decimalIntensity(firstNum) < decimalIntensity(secondNum)) {
    fractionOf = 10 ** decimalIntensity(secondNum);
  }
  return {
    first: Math.floor((firstNum *= fractionOf)),
    second: Math.floor((secondNum *= fractionOf)),
    pow: fractionOf,
  };
}

// key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach((e) => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  const keyValue = key.target.value;
  if (numString.includes(".") && keyValue == ".") return; //ignore multiple decimal clicks

  if (key.target.type == "button") {
    numString += keyValue;
    updateDisplay(`${numString}`);
    return;
  }
  if (key.target.type == "submit") {
    const operator = key.target.id;
    if (total == "0" && numString == "" && operator == "subtract") {
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
      updateDisplay(`${total}`, "");
      return;
    }
    updateDisplay(null, `${total}${key.target.value}`);
    return;
  }
  return;
}

//delete key
const deleteKey = document.querySelector("#delete");
deleteKey.addEventListener("click", () => {
  if (!(mainDisplay.innerText == null || mainDisplay.innerText == "")) {
    //runs when main display has content
    if (numString == "") numString = `${total}`;
    numString = numString.substring(0, numString.length - 1); //delete last character
    if (subDisplay.innerText == "") {
      //runs when subDisplay is empty, but main has content
      total = Number.parseFloat(numString);
      numString = ""; //reset
      updateDisplay(`${total}`);
      return;
    }
    updateDisplay(`${numString}`);
    return;
  }
  if (subDisplay.innerText != "" && mainDisplay.innerText == "") {
    //runs when only subDisplay has content
    operatorArray.pop(); //remove operator
    operatorArray.push("equals"); //add dummy operator that does nothing
    updateDisplay(`${total}`, "");
    return;
  }
});

// displayText
const subDisplay = document.querySelector("#display>.sub");
const mainDisplay = document.querySelector("#display>.main");
function updateDisplay(mainText, subText) {
  if (isNaN(total) || !isFinite(total)) {
    subDisplay.innerText = "Syntax";
    mainDisplay.innerText = "Error";
  }
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
  if (!isDecimal(num)) return 0; //every integer have 0 digits of meaningful value after decimal
  const decimalIndex = `${num}`.indexOf(".");
  const decimalLength = `${num}`.length - 1; //length counts from 1
  const fractionIntensity = decimalLength - decimalIndex; //count of digits after "."
  return fractionIntensity;
}

//clear/reset key
const clear = document.querySelector(".specialKeys>#clear");
clear.addEventListener("click", () => {
  document.location.reload();
});
