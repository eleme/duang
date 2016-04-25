def((ListItem) => class extends ListItem {
  get styleSheet() {
    return `
      :scope {
        margin-left: .5em;
        display: inline-block;
      }
    `;
  }
});
