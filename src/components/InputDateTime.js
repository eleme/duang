def(() => {

  class DateTimePicker extends Jinkela {
    init() {
      this.dp = new DatePicker().to(this);
      this.tp = new TimePicker().to(this);
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
    set value(value) {
      if (typeof value === 'string') value = new Date(value);
      if (!(value instanceof Date)) return;
      this.dp.value = value;
      this.tp = [ value.getHours(), value.getMinutes(), value.getSeconds() ].join(':');
    }
  }

  return function(...args) {
    return new DateTimePicker(...args);
  };

});
