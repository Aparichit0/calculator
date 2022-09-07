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
  equals: (newTotal) => {
    if (!newTotal) return total; //if arguments are empty finish last operation & exit
    return (total = Number.parseFloat(newTotal));
  },
};

//decimal operations
function decimalAdjust(firstNum, secondNum) {
  //adjust decimals to integers of same level
  let fractionOf = 10 ** decimalIntensity(firstNum);
  if (decimalIntensity(firstNum) < decimalIntensity(secondNum)) {
    fractionOf = 10 ** decimalIntensity(secondNum);
  }
  return {
    first: Math.round((firstNum *= fractionOf)),
    second: Math.round((secondNum *= fractionOf)),
    pow: fractionOf,
  };
}

// return decimal information
function decimalIntensity(num) {
  if (!isDecimal(num)) return 0; //every integer have 0 digits of meaningful value after decimal
  const decimalIndex = `${num}`.indexOf(".");
  const decimalLength = `${num}`.length - 1; //length counts from 1
  const fractionIntensity = decimalLength - decimalIndex; //count of digits after "."
  return fractionIntensity;
}

// numPad key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach((e) => e.addEventListener("click", keyHandle));

//numPad keys handling logic
function keyHandle(key) {
  const keyValue = key.target.value;
  playTypingSound(key);
  if (numString.includes(".") && keyValue == ".") return; //ignore multiple decimal clicks

  //decimal and digit keys
  if (key.target.type == "button") {
    numString += keyValue;
    updateDisplay(`${numString}`);
    return;
  }

  //operator keys
  if (key.target.type == "submit") {
    const operator = key.target.id;
    if (total == "0" && numString == "") {
      return; //block operator keys, until no value is entered
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

function addNewNum() {
  if (numString == "." || numString == "-") numString = "0";
  const newNum = Number.parseFloat(numString);
  numString = ""; //reset
  numArray.push(newNum);
  return;
}

function calcResult() {
  const nextNum = numArray.shift();
  if (total === "0") return (total = nextNum); //treat first number as total
  prevOperator = operatorArray.shift(); //previously saved operator in queue
  if (nextNum === 0 || nextNum) {
    //if nextNum is either 0 or not empty
    return operate[prevOperator](nextNum);
  }
  return; //else change operator & exit
}

//special keys mapping with DOM
//clear(reset) key
const clear = document.querySelector(".specialKeys>#clear");
clear.addEventListener(
  "click",
  (reset = () => {
    playTypingSound(1);
    //wait for playing sound before reloading
    setTimeout(() => document.location.reload(), 225);
  })
);

//negation (change positive/negative) key
const negation = document.querySelector("#negation");
negation.addEventListener(
  "click",
  (negate = () => {
    if (!numString && !subDisplay.innerText && total != 0) {
      numString = `${total}`; // handle values after submission
    }
    if (!numString || numString == 0) return; //exit if no value or value is 0
    if (numString == "-") numString = null; //minus sign without a value is considered empty
    numString = `${numString * -1}`; //negation of value
    updateDisplay(`${numString}`);
  })
);

//backspace key
const backspace = document.querySelector("#backspace");
backspace.addEventListener(
  "click",
  (deleteLast = () => {
    playTypingSound(1);
    if (mainDisplay.innerText) {
      //runs when main display has content
      if (numString == "") numString = `${total}`;
      numString = numString.substring(0, numString.length - 1); //delete last character
      updateDisplay(`${numString}`);
      return;
    }
    if (subDisplay.innerText && mainDisplay.innerText == "") {
      //runs when only subDisplay has content
      operatorArray.pop(); //remove operator
      operatorArray.push("equals"); //add dummy operator that does nothing
      updateDisplay(`${total}`, "");
      return;
    }
  })
);

// displayText
const subDisplay = document.querySelector("#display>.sub");
const mainDisplay = document.querySelector("#display>.main");
function updateDisplay(mainText, subText) {
  if (isNaN(total)) {
    subDisplay.innerText = "Syntax";
    mainDisplay.innerText = "Error";
    return;
  }
  if (
    subDisplay.innerText &&
    subText != "" &&
    (`${mainText}` < 0 || `${mainText}`.startsWith("-"))
  ) {
    mainText = `(${mainText})`; //show "()" for negative values
  }
  if (mainText != null) {
    mainDisplay.innerText = mainText;
  }
  if (subText != null) {
    subDisplay.innerText = subText;
    mainDisplay.innerText = mainText;
  }
}

//Keyboard Support
document.addEventListener("keydown", keyPress);
function keyPress(e) {
  const key = document.querySelector(`.keys button[data-key="${e.key}"]`);
  if (e.key == "Delete") return reset(); //clear all key
  if (e.key == "Backspace") return deleteLast(); //delete key
  k = { target: key }; // to avoid refactoring (click events requires "target", but keydown doesn't)
  if (e.code == "Enter") {
    //use "Enter" key instead for "="
    const enterKey = document.querySelector("#equals");
    k = { target: enterKey };
  }
  keyHandle(k); //handle all numPad keys
}

//button typing sound
const audio = document.querySelector("#btnSound");
function playTypingSound(key) {
  if (!key) return; // don't playing for out of scope keys
  audio.currentTime = 0; //reset playback on every click
  audio.play();
}
