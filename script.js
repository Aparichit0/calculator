let currentVal = 0; //initial value

// handle basic mathematical operations
const operate = {
  add: nextVal => currentVal += nextVal,
  substract: nextVal => currentVal -= nextVal,
  multiply: nextVal => currentVal *= nextVal,
  divide: nextVal => currentVal /= nextVal,
}