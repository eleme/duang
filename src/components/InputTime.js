def(() => {

  const format = value => {
    let now = new Date();
    switch (value) {
      case 'now': return now.valueOf();
      default: return value || '';
    }
  };

  class TimePickerWithDuang extends TimePicker {
    beforeParse(params) {
      if (!('value' in params)) params.value = params.defaultValue;
      super.beforeParse(params);
    }
    init() {
      if (!this.$hasValue) this.value = void 0;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      let date = new Date(format(value));
      super.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
