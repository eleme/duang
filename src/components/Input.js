def((XPut) => class extends XPut {
  get hint() { return 'Input'; }
  get defaultComponent() { return 'String'; }
  async buildComponent() {
    let { args = {}, depot } = this;
    let Component = await req(this.componentName);
    this.result = new Component(args, { depot }).to(this.element);
  }
});
