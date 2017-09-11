def((ErrorDisplay) => class extends Jinkela {
  init() {
    new ErrorDisplay({ error: this.error }).to(this);
  }
  static popup(...args) {
    dialog.popup(new this(...args));
  }
  get title() { return '错误'; }
});
