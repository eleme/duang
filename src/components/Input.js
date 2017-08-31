def((XPut) => class extends XPut {
  get hint() { return 'Input'; }
  get defaultComponent() { return 'String'; }
  buildComponent() {
    let { args = {}, depot } = this;
    return req(this.componentName).then(Component => {
      this.result = new Component(args, { depot }).to(this.element);
    });
  }
});
