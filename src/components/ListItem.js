def((Item) => class extends Item {
  get template() { return '<li><a href="JavaScript:">{text}</a></li>'; }
  get styleSheet() {
    return `
      :scope {
        > a { display: block; }
      }
    `;
  }
});
