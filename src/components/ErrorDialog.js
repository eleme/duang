def((ErrorDisplay) => class extends Jinkela {
  init() {
    new ErrorDisplay({ error: this.error }).to(this);
  }
  static popup(...args) {
    dialog.popup(new this(...args));
  }
  beforeParse(params) {
    params.title = params.title || params.error && params.error.title || '错误';
  }
});
