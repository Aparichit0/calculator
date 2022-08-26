let currentVal = 0; //initial value
let numString = "";
let numArray = [];
// handle basic mathematical operations
const operate = {
  add: (nextVal) => (currentVal += nextVal),
  subtract: (nextVal) => (currentVal -= nextVal),
  multiply: (nextVal) => (currentVal *= nextVal),
  divide: (nextVal) => (currentVal /= nextVal),
};

// key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach(e => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  if (key.target.id == "equals") return; //skip temporarily 

  let keyValue = key.target.value;
  updateDisplay(keyValue);

  if (key.target.type == "button") numString += keyValue;
  if (key.target.type == "submit") {
    addNextNum();
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

function addNextNum() {
  const nextNum = Number.parseInt(numString);
  numString = ""; //reset
  numArray.push(nextNum);
}