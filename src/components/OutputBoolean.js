def(() => class extends Jinkela {
  init() {
    this.element.setAttribute('data-value', !!this.value);
    let text = this.text ? this.text[!!this.value] : !!this.value;
    this.element.setAttribute('data-text', text);
  }
  get styleSheet() {
    return `
      :scope {
        font-family: monospace;
        color: #fff;
        &::before { content: attr(data-text); }
        text-align: center;
        line-height: 1.4;
        font-size: 12px;
        padding: 3px 5px;
        width: 42px;
        &[data-value=true] {
          background: #13CE66;
        }
        &[data-value=false] {
          background: #F7BA2A;
        }
      }
    `;
  }
});
