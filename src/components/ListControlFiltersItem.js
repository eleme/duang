def((Input, Item, Button) => class extends Item {
  get template() {
    return `<label><span>{title}</span>：<meta ref="ctrl" /></label>`;
  }
  get styleSheet() {
    return `
      :scope {
        display: block;
        margin-bottom: 1em;
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
  init() {
    this.input = this.ctrl = new Input(this, { onReady: () => this.ready() });
    new Button({ text: 'Apply', onClick: () => this.apply() }).renderTo(this);
  }
  ready() {
    let { where } = depot;
    let value = this.value = where[this.key];
    if (value !== void 0) {
      new Button({ text: 'Clear', onClick: () => this.clear(), color: '#ccc' }).renderTo(this);
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
