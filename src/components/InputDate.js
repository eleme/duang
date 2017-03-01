def(() => {

  let dateFormat = defaultValue => {
    let now = new Date();
    switch (defaultValue) {
      case 'today': return now.valueOf();
      case 'nextDay': return now.setDate(now.getDate() + 1);
      case 'lastDay': return now.setDate(now.getDate() - 1);
      case 'nextWeek': return now.setDate(now.getDate() + 7);
      case 'lastWeek': return now.setDate(now.getDate() - 7);
      case 'nextMonth': return now.setMonth(now.getMonth() + 1);
      case 'lastMonth': return now.setMonth(now.getMonth() - 1);
      case 'nextYear': return now.setYear(now.getFullYear() + 1);
      case 'lastYear': return now.setYear(now.getFullYear() - 1);
      default: return defaultValue || '';
    }
  };

  class DatePickerWithDuang extends DatePicker {
    init() { this.value = dateFormat(this.defaultValue); }
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
