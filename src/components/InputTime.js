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
      value = format(value);
      let date = new Date(value);
      if (+date === +date) {
        super.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      } else {
        super.value = (String(value).match(/\d+/g) || []).concat([ 0, 0, 0 ]).slice(0, 3);
      }
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
