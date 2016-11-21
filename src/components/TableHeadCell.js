def((Output, Item) => class extends Item {
  get tagName() { return 'td'; }
  init() {
    let { width, nowrap } = this;
    if (width) this.element.style.width = width + 'px';
    if (nowrap) this.element.style.whiteSpace = 'nowrap';
    this.element.innerHTML = this.title;
  }
  get styleSheet() {
    return `
      :scope {
        padding: 0 18px;
        line-height: 24px;
        height: 40px;
        white-space: nowrap;
        font-weight: bold;
        color: #1f2d3d;
      }
    `;
  }
});
