// exports.addOp = function(var1, var2){
//   const number1 = isNaN ? 0: var1; // Quick validation for valid numbers
//   const number2 = isNaN ? 0: var2; // Quick validation for valid numbers
//   return number1 + number2; // Return the result of the operation
// };
exports.addOp = function(var1, var2){
  const number1 = isNaN(var1) ? 0: var1; // Quick validation for valid numbers
  const number2 = isNaN(var2) ? 0: var2; // Quick validation for valid numbers
  return number1 + number2; // Return the result of the operation
};
