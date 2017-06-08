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
      let { readonly, staticKey, keyField, keyFieldAlign, keyFieldWidth, valueField } = this;
      if (staticKey) {
        this.keyInputObject = new StaticKey({ value: '', keyFieldAlign, keyFieldWidth }).to(this);
      } else {
        if (!keyField || typeof keyField !== 'object') keyField = { component: 'String', args: { width: 120 } };
        keyField = Object.assign({}, keyField);
        keyField.args = Object.assign({ readonly }, keyField.args);
        this.keyInputObject = new Input(keyField).to(this);
      }
      if (!valueField || typeof valueField !== 'object') valueField = { component: 'String', args: { width: 200 } };
      valueField = Object.assign({}, valueField);
      valueField.args = Object.assign({ readonly }, valueField.args);
      this.valueInputObject = new Input(valueField).to(this);
      if (!this.$hasValue) this.value = void 0;
    }
    get value() {
      return {
        [this.keyFieldName || 'key']: this.keyInputObject.value,
        [this.valueFieldName || 'value']: this.valueInputObject.value
      };
    }
    set value(pair = this.defaultValue) {
      this.$hasValue = true;
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
