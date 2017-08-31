def((XPut) => class extends XPut {
  get hint() { return 'Output'; }
  get defaultComponent() { return 'HTML'; }
  buildComponent() {
    let { args = {}, depot, value } = this;
    return req(this.componentName).then(Component => {
      this.result = new Component(args, { value, depot }).to(this.element);
    });
  }
});
