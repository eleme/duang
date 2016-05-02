def((Item) => class extends Item {
  get template() { return `<span></span>`; }
  init() {
    let { component = 'String' } = this;
    req('Input' + component).then(Component => {
      this.component = new Component(this.args).renderTo(this);
      if (typeof this.onReady === 'function') this.onReady();
    }, error => {
      this.element.textContent = `Unknown component "${this.component}"`;
    });
  }
  get value() { return this.component.value; }
  set value(value) { this.component.value = value; }
});
