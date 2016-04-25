def((ListItem) => class extends ListItem {
  init() {
    if (this.currentKey === this.key) this.element.classList.add('active');
    this.href = '#' + new UParams({ module: 'list', key: this.key });
    this.text = this.title;
  }
  get styleSheet() {
    return `
      :scope {
        line-height: 2;
        list-style: disc inside;
        padding: 0 1em;
      }
    `;
  }
});
