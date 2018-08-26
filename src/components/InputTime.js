def((TimePicker) => {

  const format = value => {
    let now = new Date();
    switch (value) {
      case 'now': return now.valueOf();
      default: return value || '';
    }
  };

  class TimePickerWithDuang extends Jinkela {
    beforeParse(params) {
      if (!('value' in params)) params.value = params.defaultValue;
      this.tp = new TimePicker(params);
    }
    init() {
      this.tp.to(this);
      if (!this.$hasValue) this.value = void 0;
      if (this.readonly) {
        this.element.classList.add('readonly');
        this.element.addEventListener('mousedown', event => {
          event.preventDefault();
          event.stopPropagation();
        }, true);
      }
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      value = format(value);
      let date = new Date(value);
      if (+date === +date) {
        this.tp.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      } else {
        this.tp.value = (String(value).match(/\d+/g) || []).concat([ 0, 0, 0 ]).slice(0, 3);
      }
    }
    get value() {
      return this.tp.value;
    }
    get styleSheet() {
      return `
        :scope {
          input { height: 28px; }
          &.readonly {
            input {
              background-color: #eff2f7;
              border-color: #d3dce6;
              color: #bbb;
              cursor: not-allowed;
            }
          }
        }
      `;
    }
  }

  return function(...args) {
    return new TimePickerWithDuang(...args);
  };

});
