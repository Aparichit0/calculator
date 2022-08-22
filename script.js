let currentVal = 0; //initial value

// handle basic mathematical operations
const operate = {
  add: (nextVal) => (currentVal += nextVal),
  subtract: (nextVal) => (currentVal -= nextVal),
  multiply: (nextVal) => (currentVal *= nextVal),
  divide: (nextVal) => (currentVal /= nextVal),
};

// key mapping with DOM
const numpad = document.querySelectorAll(".numpad> *> button");
numpad.forEach(e => e.addEventListener("click", keyHandle));

function keyHandle(key) {
  if (key.target.type == "button") {
    console.log(key.target.value);
  }
  if (key.target.type == "submit") {
    console.log(key.target.id);
  }
}
