def((Input, Item, Button, ButtonHollow) => class extends Item {
  init() {
    this.input = new Input(this, { onReady: () => this.ready() }).to(this);
    new Button({ text: depot.getConst('筛选'), onClick: () => this.apply() }).to(this);
    this.element.setAttribute('data-filter-component', this.component);
    this.element.setAttribute('data-floating', !!this.floating);
    this.element.addEventListener('keydown', event => this.keydown(event));
    if ('title' in this) this.element.setAttribute('data-filter-title', this.title);
  }
  get value() { return this.input.value; }
  set value(value) { this.input.value = value; }
  get $promise() { return this.input.$promise; }
  keydown({ keyCode, target }) {
    if (target.tagName !== 'TEXTAREA' && keyCode === 13) this.apply();
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
    new ButtonHollow({ text: depot.getConst('清除'), onClick: () => this.clear() }).to(this);
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
  get tagName() { return `div`; }
  get styleSheet() {
    return `
      :scope {
        &:first-child { margin-top: 0; }
        display: block;
        margin-top: 1em;
        white-space: nowrap;
        &[data-floating=true] {
          float: left;
          margin-right: 1em;
          & + * {
            margin-top: 0;
          }
        }
        &::before {
          content: attr(data-filter-title);
          display: inline-block;
          width: 120px;
        }
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
