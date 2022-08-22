let currentVal = 0; //initial value

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

  if (key.target.type == "button") {
    console.log(keyValue);
  }
  if (key.target.type == "submit") {
    console.log(keyValue);
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
