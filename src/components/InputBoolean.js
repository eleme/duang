def(() => class extends Jinkela {

  get value() { return this.$value; }

  set value(value = this.defaultValue) {
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
      set: value => (this.value = value)
    });
    this.value = this.value;
    if (this.readonly) {
      if (this.readonly) this.element.setAttribute('readonly', 'readonly');
    } else {
      this.element.addEventListener('click', () => (this.value = !this.$value));
    }
    let { text = {} } = this;
    this.element.setAttribute('data-text-true', text.true || '开');
    this.element.setAttribute('data-text-false', text.false || '关');
    if (this.fontSize) this.element.style.fontSize = this.fontSize + 'px';
  }

  get styleSheet() {
    return `
      :scope {
        width: 80px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        border: 1px solid #D3DCE6;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        display: inline-block;
        cursor: pointer;
        text-align: left;
        &[readonly] {
          cursor: not-allowed;
          filter: saturate(0);
        }
        &:before {
          content: attr(data-text-false);
          display: inline-block;
          text-align: center;
          color: #fff;
          width: 60px;
          height: 24px;
          border-radius: 12px;
          background: #D3DCE6;
          transition: transform 200ms ease;
          padding: 1px;
          margin: -1px;
        }
        &[data-value=true]:before {
          content: attr(data-text-true);
          background: #58B7FF;
          transform: translateX(20px);
        }
      }
    `;
  }

});
