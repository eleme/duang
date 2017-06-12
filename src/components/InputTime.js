def(() => {

  const format = value => {
    let now = new Date();
    switch (value) {
      case 'now': return now.valueOf();
      default: return value || '';
    }
  };

  class TimePickerWithDuang extends TimePicker {
    init() {
      if (!this.$hasValue) this.value = void 0;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      super.value = format(value);
    }
    get value() {
      return super.value;
    }
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
