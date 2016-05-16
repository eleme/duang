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
        border-radius: 5px;
        line-height: 1.25;
        font-size: 12px;
        padding: 3px 5px;
        width: 42px;
        &[data-value=true] {
          background: rgb(91, 189, 114); 
        }
        &[data-value=false] {
          background: rgb(204, 52, 0);
        }
      }
    `;
  }
});
