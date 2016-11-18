def(() => class extends Jinkela {
  init() {
    this.element.textContent = '正在拼命加载 ...';
  }
  set error(error) {
    if (!error) return;
    this.element.style.color = '#ff4949';
    this.element.innerHTML = error.message || error.name || JSON.stringify(error);
  }
  set data(list) {
    if (!(list instanceof Array)) list = [];
    if (list.length) {
      this.element.style.display = 'none';
    } else {
      this.element.textContent = '没有数据';
    }
  }
  get styleSheet() {
    return `
      :scope {
        text-align: center;
        font-size: 16px;
        padding: 3em;
        color: inherit;
        opacity: .65;
        white-space: pre;
        margin: 0 1em;
        border-radius: 4px;
      }
    `;
  }
});
