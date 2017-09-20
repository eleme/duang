def((XPut) => class extends XPut {
  static createAny(what) {
    switch (typeof what) {
      case 'object':
        return new this(what);
      case 'string':
      default:
        return new this({ component: 'HTML', args: { html: String(what) } });
    }
  }
  get hint() { return 'Output'; }
  get defaultComponent() { return 'HTML'; }
  buildComponent() {
    let { args = {}, depot, value } = this;
    return req(this.componentName).then(Component => {
      this.result = new Component(args, { value, depot }).to(this.element);
    });
  }
});
