def(() => {
  return function(...args) {
    return new DatePicker(...args, { starting: new Date().getFullYear() - 8 });
  };
});
