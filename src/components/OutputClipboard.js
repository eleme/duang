def((ClickTip) => class extends Jinkela {
  get value() { return this.$value; }
  set value(value = this.defaultValue) {
    if (this.$value === value) return;
    this.$value = value;
    this.render();
  }
  init() {
    this.element.style.maxWidth = this.maxWidth || 420;
    this.element.addEventListener('click', event => this.click(event));
    this.render();
    this.value = this.value;
  }
  click(event) {
    // 创建选区并执行复制
    let first = this.element.firstChild;
    let last = this.element.lastChild;
    let range = document.createRange();
    range.setStart(first, 0);
    range.setEnd(last, last.data.length);
    let selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('Copy');
    ClickTip.show(event, { text: '已复制' });
  }
  render() {
    if (this.html) {
      this.element.innerHTML = String(this.html).replace(/\{(.*?)\}/g, ($0, key) => {
        let base = this.value instanceof Object ? this.value : this;
        return key.split('.').reduce((base, name) => Object(base)[name], base);
      }).replace(/<script>([\s\S]*?)<\/script>/g, ($0, code) => {
        return new Function(`return (${code})`)();
      });
    } else {
      this.element.innerHTML = this.value;
    }
  }
  get styleSheet() {
    return `
      :scope {
        overflow: hidden;
        cursor: pointer;
        word-break: break-all;
        display: inline-block;
        &:hover {
          text-decoration: underline;
          text-decoration-style: dotted;
        }
      }
    `;
  }
});
