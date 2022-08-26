let total = 0; //initial value
let numString = "";
const numArray = [];
const operatorArray = [];
// handle basic mathematical operations
const operate = {
  add: (nextVal) => (total += nextVal),
  subtract: (nextVal) => (total -= nextVal),
  multiply: (nextVal) => (total *= nextVal),
  divide: (nextVal) => (total /= nextVal),
};

// key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach((e) => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  if (key.target.id == "equals") return; //skip temporarily 

  const keyValue = key.target.value;
  updateDisplay(keyValue);

  if (key.target.type == "button") numString += keyValue;
  if (key.target.type == "submit") {
    addNewNum();
    operatorArray.push(key.target.id); //save operator for next operation
    calcResult();
  }
}

// displayText
const display = document.querySelector("#display");
function updateDisplay(text){
  if (display.innerText == "0"){
    display.innerText = text;
    return;
  }
  display.innerText += text;
}

function addNewNum() {
  const newNum = Number.parseInt(numString);
  numString = ""; //reset
  numArray.push(newNum);
}

function calcResult() {
  const nextNum = numArray.shift();
  if (total == 0) return (total = nextNum);
  prevOperator = operatorArray.shift(); //previously saved operator in queue
  return operate[prevOperator](nextNum);
}