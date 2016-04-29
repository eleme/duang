def((Item) => class extends Item {
  init() {
    if (!this.href) this.href = 'JavaScript:';
  }
  get template() { return `<li><a href="{href}">{text}</a></li>`; }
  get styleSheet() {
    return `
      :scope {
        > a { display: block; }
      }
    `;
  }
});
