def((Output, Item, TableRowActions) => class extends Item {
  get tagName() { return `td`; }
  get $promise() {
    let resolve, reject;
    let value = new Promise((...args) => [ resolve, reject ] = args);
    value.resolve = resolve;
    value.reject = reject;
    Object.defineProperty(this, '$promise', { value, configurable: true });
    return value;
  }
  init() {
    let { width, nowrap, value, component, args, actions, scheme, fieldMap, depot } = this;
    if (width) this.element.style.width = width + 'px';
    if (nowrap) this.element.style.whiteSpace = 'nowrap';
    switch (true) {
      case !!component:
        let output = new Output({ component, args, value, fieldMap }).to(this);
        return output.$promise.then(() => this.$promise.resolve(this));
      case !!actions:
        new TableRowActions({ depot, actions, scheme, fieldMap }).to(this);
        return this.$promise.resolve(this);
      default:
        this.element.innerHTML = value;
        this.$promise.resolve(this);
    }
  }
  get styleSheet() {
    return `
      :scope {
        border: solid #e0e6ed;
        border-width: 1px 0;
        padding: 0 18px;
        line-height: 24px;
        height: 40px;
      }
    `;
  }
});
