def(() => {

  class TimePickerWithDuang extends TimePicker {
    get styleSheet() {
      return `
        :scope {
          input { height: 28px; }
        }
      `;
    }
  }

  return function(...args) {
    return new TimePickerWithDuang(...args);
  };

});
