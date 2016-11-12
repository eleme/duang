def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  init() {
    let { depot } = this;
    let group = this.inputs || [];
    if (group.length) {
      let list = new SubGroupMap({ group, depot });
      this.list = this.list ? list.renderWith(this.list) : list.to(this);
    } else {
      if (this.list) this.element.removeChild(this.list.element);
      this.list = null;
    }
    if (this.columns > 1) {
      this.element.dataset.columns = this.columns;
      this.element.style.columns = this.columns;
    }
  }
  get value() {
    return Object.assign({}, this.list ? this.list.value : {});
  }
  set value(value) {
    if (value === void 0) return;
    if (this.list) this.list.value = value;
  }
  get styleSheet() {
    return `
      :scope {
        &[data-columns] > table {
          break-inside: initial;
          margin-top: -1em;
        }
      }
    `;
  }
});
