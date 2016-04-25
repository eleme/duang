def((Item) => class extends Item {
  get template() { return `<li><a href="{href}">{text}</a></li>`; }
  get styleSheet() {
    return `
      :scope {
        > a { display: block; }
        transition: background 200ms ease;
        &.active {
          background: #ccc;
        }
        &:hover {
          background: #d4d4d4;
        }
      }
    `;
  }
});
