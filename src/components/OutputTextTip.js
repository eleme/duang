def((Tip) => {

  return class extends Tip {
    init() {
      if (!('$value' in this)) this.value = void 0;
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      this.$value = value;
      if (typeof value === 'string') value = { text: value };
      let { text = this.text, tip = this.tip } = Object(value);
      super.value = { data: text, tip };
    }
    get styleSheet() {
      return `
        :scope {
          &[data-hastip=true] {
            text-decoration: underline;
            text-decoration-style: dotted;
          }
        }
      `;
    }
  };

});
