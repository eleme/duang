const condition = (conditions, fieldMap) => { // eslint-disable-line no-unused-vars
  if (!(conditions instanceof Array)) return true;
  const parseExpression = (expr, fieldMap) => {
    if (expr[0] === '$') return JSONPath(expr, fieldMap)[0];
    try {
      return JSON.parse(expr);
    } catch (e) {
      return expr;
    }
  };
  return conditions.every(condition => {
    let matches = condition.match(/\S+/g);
    if (!matches) return false;
    let operator = matches[1];
    let left = parseExpression(matches[0], fieldMap);
    if (operator === '~') {
      return new RegExp(matches[2]).test(left);
    }
    let right = parseExpression(matches[2], fieldMap);
    switch (operator) {
      case void 0: return !!left;
      case '=': return left == right; // eslint-disable-line
      case '!=': return left != right; // eslint-disable-line
      case '<': return left < right;
      case '<=': return left <= right;
      case '>': return left > right;
      case '>=': return left >= right;
      default:
        throw new Error(`未知的操作符: ${operator}`);
    }
  });
};

