def((SubGroupMap) => class extends Jinkela {

  init() {
    let { depot, inputs, readonly, mode = 'table' } = this;
    let group = inputs || [];
    if (group.length) {
      let list = new SubGroupMap({ group, depot, readonly, mode });
      this.list = this.list ? list.renderWith(this.list) : list.to(this);
    } else {
      if (this.list) this.element.removeChild(this.list.element);
      this.list = null;
    }
    if (this.columns > 1) {
      this.element.dataset.columns = this.columns;
      this.element.style.columns = this.columns;
    }
    if (!this.$hasValue) this.value = void 0;
    if (this.style) Object.assign(this.element.style, this.style);
  }

  get value() {
    return Object.assign({}, this.list ? this.list.value : {});
  }

  set value(value = this.defaultValue) {
    this.$hasValue = true;
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
