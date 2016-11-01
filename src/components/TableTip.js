def(() => class extends Jinkela {
  init() {
    this.element.textContent = '正在加载...';
  }
  render(result) {
    if (result && result instanceof Array) {
      if (result.length) {
        this.element.style.display = 'none';
      } else {
        this.element.textContent = '没有数据';
      }
    } else {
      this.element.textContent = result.message || result;
    }
  }
  get styleSheet() {
    return `
      :scope {
        text-align: center;
        font-size: 18px;
        padding: 1em;
        color: #aaa;
      }
    `;
  }
});
