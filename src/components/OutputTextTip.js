def((Tip) => {

  return class extends Tip {
    init() {
      if (this.underline === false) this.element.style.textDecoration = 'none';
      if (!('$value' in this)) this.value = void 0;
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      this.$value = value;
      if (typeof value !== 'object') value = { text: value };
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
