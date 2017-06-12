def(() => {

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

  class DatePickerWithDuang extends DatePicker {
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
    return new DatePickerWithDuang(...args);
  };

});
