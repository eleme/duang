def((SubGroupMap) => class extends Jinkela {

  init() {
    let { depot = window.depot, inputs, readonly, mode } = this;

    // 渲染 inputs（不可动态设置）
    let group = inputs || [];
    if (group.length) {
      this.sub = new SubGroupMap({ group, depot, readonly, mode }).to(this);
    } else {
      this.sub = null;
    }

    // 支持多列
    if (this.columns > 1) {
      this.element.dataset.columns = this.columns;
      this.element.style.columns = this.columns;
    }

    // 初始赋值
    this.value = this.$value;

    // 特殊样式
    if (this.style) Object.assign(this.element.style, this.style);
  }

  get value() {
    return Object.assign({}, this.sub && this.sub.value || this.$value || {});
  }

  set value(value = this.defaultValue || {}) {
    // 已经初始化就直接赋值，如果尚未初始化就记录下来
    if (this.sub) {
      this.sub.value = value;
    } else {
      this.$value = value;
    }
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
