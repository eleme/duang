def((Input, Item, Button) => class extends Item {
  init() {
    this.input = new Input(this, { onReady: () => this.ready() }).renderTo(this);
    new Button({ text: depot.getConst('Apply'), onClick: () => this.apply() }).renderTo(this);
    this.element.setAttribute('data-filter-component', this.component);
    if ('title' in this) this.element.setAttribute('data-filter-title', this.title + '：');
  }
  ready() {
    let { where } = depot;
    let { key, squash } = this;
    if (!(key in where)) return;
    if (squash === 'direct') {
      this.value = Object.assign({ '': where[key] }, where)
    } else {
      this.value = where[key];
    }
    this.defaultValue = this.value;
    new Button({ text: depot.getConst('Clear'), onClick: () => this.clear(), color: '#ccc' }).renderTo(this);
  }
  apply() {
    let { uParams, where } = depot;
    let { defaultValue, value, key, squash } = this;
    if (squash === 'direct') {
      if (defaultValue) Object.keys(defaultValue).forEach(key => delete where[key]);
      where[key] = value[''];
      delete value[''];
      Object.assign(where, value);
    } else {
      where[key] = value;
    }
    uParams.where = JSON.stringify(where);
    location.hash = new UParams(uParams);
  }
  clear() {
    let { uParams, where } = depot;
    let { defaultValue, key, squash } = this;
    if (squash === 'direct') {
      delete where[key];
      Object.keys(defaultValue).forEach(key => delete where[key]);
    } else {
      delete where[key];
    }
    uParams.where = JSON.stringify(where);
    location.hash = new UParams(uParams);
  }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
  get tagName() { return `label`; }
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
});
