def((Input) => {

  class StaticKey extends Jinkela {
    set keyFieldALign(value) { this.element.style.textAlign = value; }
    set keyFieldWidth(value) { this.element.style.width = value; }
    get template() { return '<span>{value}</span>'; }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          text-align: right;
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { valueInput, readonly, keyFieldAlign, keyFieldWidth, staticKey } = this;
      if (staticKey) {
        this.keyInputObject = new StaticKey({ value: '', keyFieldAlign, keyFieldWidth }).to(this);
      } else {
        this.keyInputObject = new Input({ component: 'String', args: { width: 120, readonly } }).to(this);
      }
      if (!valueInput || typeof valueInput !== 'object') valueInput = { component: 'String', args: { width: 200 } };
      valueInput = Object.assign({}, valueInput);
      valueInput.args = Object.assign({ readonly }, valueInput.args);
      this.valueInputObject = new Input(valueInput).to(this);
    }
    get value() {
      return {
        [this.keyFieldName || 'key']: this.keyInputObject.value,
        [this.valueFieldName || 'value']: this.valueInputObject.value
      };
    }
    set value(pair) {
      pair = Object(pair);
      this.keyInputObject.value = pair[this.keyFieldName || 'key'];
      this.valueInputObject.value = pair[this.valueFieldName || 'value'];
    }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          white-space: nowrap;
          > * {
            &:first-child { margin-right: .5em; }
            display: inline-block;
          }
        }
      `;
    }
  };

});
