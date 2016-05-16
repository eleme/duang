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
        }
        > button {
          margin-left: 1em;
        }
      }
    `;
  }
  init() {
    this.input = this.ctrl = new Input(this, { onReady: () => this.ready(), scheme: this.scheme });
    new Button({ text: 'Apply', onClick: () => this.apply() }).renderTo(this);
  }
  ready() {
    let where = this.getWhereByParams();
    let value = this.value = where[this.key];
    if (value !== void 0) {
      new Button({ text: 'Clear', onClick: () => this.clear(), color: '#ccc' }).renderTo(this);
    }
  }
  getWhereByParams(params) {
    let { where } = params || new UParams();
    try {
      return JSON.parse(where);
    } catch(error) {
      return {};
    }
  }
  apply() {
    let params = new UParams();
    let where = this.getWhereByParams(params);
    where[this.key] = this.value;
    params.where = JSON.stringify(where);
    location.hash = new UParams(params);
  }
  clear() {
    let params = new UParams();
    let where = this.getWhereByParams(params);
    delete where[this.key];
    params.where = JSON.stringify(where);
    location.hash = new UParams(params);
  }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
});
