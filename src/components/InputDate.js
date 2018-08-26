def((DatePicker) => {

  const format = value => {
    let now = new Date();
    switch (value) {
      case 'today': return now.valueOf();
      case 'nextDay': return now.setDate(now.getDate() + 1);
      case 'lastDay': return now.setDate(now.getDate() - 1);
      case 'nextWeek': return now.setDate(now.getDate() + 7);
      case 'lastWeek': return now.setDate(now.getDate() - 7);
      case 'nextMonth': return now.setMonth(now.getMonth() + 1);
      case 'lastMonth': return now.setMonth(now.getMonth() - 1);
      case 'nextYear': return now.setYear(now.getFullYear() + 1);
      case 'lastYear': return now.setYear(now.getFullYear() - 1);
      default: return value || '';
    }
  };

  class DatePickerWithDuang extends Jinkela {
    beforeParse(params) {
      if (!('value' in params)) params.value = params.defaultValue;
      this.dp = new DatePicker(params);
    }
    init() {
      this.dp.to(this);
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
      if (this.mode === 'UNIX_TIMESTAMP' && typeof value === 'number') { value *= 1000; }
      this.dp.value = format(value);
    }
    get value() {
      let date = this.dp.value;
      if (this.mode === 'UNIX_TIMESTAMP') {
        return Math.round(date / 1000);
      } else {
        return date;
      }
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
    return new DatePickerWithDuang(...args);
  };

});
