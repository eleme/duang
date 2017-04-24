const debounce = (func, delay, isImmediate) => { // eslint-disable-line no-unused-vars
  let timeout;
  let result;
  const later = (context, args) => {
    return setTimeout(() => {
      timeout = null;
      result = func.apply(context, args);
    }, delay);
  };
  const debounced = function(...args) {
    let context = this;
    if (timeout) clearTimeout(timeout);
    if (isImmediate) {
      let callNow = !timeout;
      if (callNow) {
        result = func.apply(context, ...args);
        timeout = setTimeout(() => (timeout = null), delay);
      } else {
        timeout = later(context, ...args);
      }
    } else {
      timeout = later(context, ...args);
    }
    return result;
  };
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
};

