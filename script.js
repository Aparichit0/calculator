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
  equals: () => total,
};

// key mapping with DOM
const numPad = document.querySelectorAll(".numPad> *> button");
numPad.forEach((e) => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  const keyValue = key.target.value;
  updateDisplay(keyValue);

  if (key.target.type == "button") {
    numString += keyValue;
    updateDisplay(`${numString}`);
  };
  if (key.target.type == "submit") {
    addNewNum();
    operatorArray.push(key.target.id); //save operator for next operation
    calcResult();
    if(key.target.id == "equals"){
      //display result on main display on clicking equals
      return updateDisplay(`${total}${key.target.value}`, "");
    }
    updateDisplay(null, `${total}${key.target.value}`);
  }
}

// displayText
const subDisplay = document.querySelector("#display>.sub");
const mainDisplay = document.querySelector("#display>.main");
function updateDisplay(mainText, subText) {
  if (mainText != null){
    mainDisplay.innerText = mainText;
  }
  if (subText != null){
    subDisplay.innerText = subText;
    mainDisplay.innerText = mainText;
  }
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