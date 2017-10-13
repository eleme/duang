def((Tip) => {

  return class extends Tip {
    init() {
      if (!('$value' in this)) this.value = void 0;
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (!value) value = this;
      this.$value = value;
      super.value = { data: value.text, tip: value.tip };
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
