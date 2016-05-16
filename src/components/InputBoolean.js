def(() => class extends Jinkela {
  get value() { return this.$value; }
  set value(value) {
    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch (error) {
        setTimeout(() => { throw error; });
      }
    }
    this.element.dataset.value = this.$value = !!value;
  }
  init() {
    Object.defineProperty(this.element, 'value', {
      get: () => this.value,
      set: value => this.value = value
    });
    this.value = !!this.$value;
    this.element.addEventListener('click', () => this.value = !this.$value);
  }
  get styleSheet() {
    return `
      :scope {
        width: 80px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        display: inline-block;
        cursor: pointer;
        &:before {
          content: attr(data-value);
          display: inline-block;
          text-align: center;
          color: #fff;
          width: 60px;
          height: 24px;
          border-radius: 12px;
          background: #999;
          transition: transform 200ms ease;
          padding: 1px;
          margin: -1px;
        }
        &[data-value=true]:before {
          content: 'true';
          background: rgb(91, 189, 114);
          transform: translateX(20px);
        }
      }
    `;
  }
});
