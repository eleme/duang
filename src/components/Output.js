def((XPut) => class extends XPut {
  get hint() { return 'Output'; }
  get defaultComponent() { return 'HTML'; }
  async buildComponent() {
    let { args = {}, depot, value } = this;
    let Component = await req(this.componentName);
    this.result = new Component(args, { value, depot }).to(this.element);
  }
});
