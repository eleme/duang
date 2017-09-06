def((ErrorDisplay) => class extends Jinkela {
  get ErrorDisplay() { return ErrorDisplay; }
  static popup(...args) {
    dialog.popup(new this(...args));
  }
  get title() { return '错误'; }
  get template() {
    return `<div><jkl-error-display error="{error}"></jkl-error-display></div>`;
  }
});
