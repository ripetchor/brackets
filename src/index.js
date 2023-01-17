module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;

  const pairs = Object.fromEntries(bracketsConfig);
  const reversePairs = {};
  const stack = [];

  for (const [left, right] of Object.entries(pairs)) {
    reversePairs[right] = left;
  }

  for (const bracket of str) {
    const lastInStack = stack[stack.length - 1];
    if (pairs[bracket]) {
      if (stack.length > 0 && lastInStack === pairs[bracket]) {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    } else if (stack.length > 0 && lastInStack === reversePairs[bracket]) {
      stack.pop();
    }
  }

  return stack.length === 0;
};
