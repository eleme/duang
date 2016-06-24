def((Input, Item, Button) => class extends Item {
  init() {
    this.input = this.ctrl = new Input(this, { onReady: () => this.ready() });
    new Button({ text: depot.getConst('Apply'), onClick: () => this.apply() }).renderTo(this);
    this.element.setAttribute('data-filter-component', this.component);
    if ('title' in this) this.element.setAttribute('data-filter-title', this.title + '：');
  }
  get template() {
    return `<label><meta ref="ctrl" /></label>`;
  }
  get styleSheet() {
    return `
      :scope {
        &::before { content: attr(data-filter-title); }
        display: block;
        margin-bottom: 1em;
        white-space: nowrap;
        > * {
          display: inline-block;
          vertical-align: middle;
        }
        > button {
          margin-left: 1em;
        }
      }
    `;
  }
  ready() {
    let { where } = depot;
    let value = this.value = where[this.key];
    if (value !== void 0) {
      new Button({ text: depot.getConst('Clear'), onClick: () => this.clear(), color: '#ccc' }).renderTo(this);
    }
  }
  apply() {
    let { uParams, where } = depot;
    where[this.key] = this.value;
    uParams.where = JSON.stringify(where);
    location.hash = new UParams(uParams);
  }
  clear() {
    let { uParams, where } = depot;
    delete where[this.key];
    uParams.where = JSON.stringify(where);
    location.hash = new UParams(uParams);
  }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
});
