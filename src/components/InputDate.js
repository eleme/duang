def(() => {

  class DatePickerWithDuang extends DatePicker {
    get styleSheet() {
      return `
        :scope {
          input { height: 28px; }
        }
      `;
    }
  }

  return function(...args) {
    return new DatePickerWithDuang(...args);
  };

});
