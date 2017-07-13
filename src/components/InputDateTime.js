def(() => {

  class DateTimePicker extends Jinkela {
    init() {
      this.dp = new DatePicker().to(this);
      this.tp = new TimePicker().to(this);
      if (!this.$hasValue) this.value = void 0;
      if (this.readonly) {
        this.element.classList.add('readonly');
        this.element.addEventListener('focus', event => {
          event.preventDefault();
          event.stopPropagation();
        }, true);
      }
    }
    get styleSheet() {
      return `
        :scope {
          position: relative;
          > span {
            > input {
              height: 28px;
              width: 106px;
            }
            &:first-child {
              margin-right: 14px;
            }
            > div {
              width: 222px;
              left: -119px;
            }
          }
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
    get value() {
      let [ hours, minutes, seconds ] = this.tp.value.match(/\d+/g);
      let date = this.dp.value;
      if (hours) date.setHours(hours);
      if (minutes) date.setMinutes(minutes);
      if (seconds) date.setSeconds(seconds);
      return date;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      if (typeof value === 'string' || typeof value === 'number') value = new Date(value);
      if (!(value instanceof Date)) return;
      this.dp.value = value;
      this.tp.value = [ value.getHours(), value.getMinutes(), value.getSeconds() ].join(':');
    }
  }

  return function(...args) {
    return new DateTimePicker(...args);
  };

});
