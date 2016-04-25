def((ListItem) => class extends ListItem {
  get styleSheet() {
    return `
      :scope {
        line-height: 2;
        list-style: disc inside;
      }
    `;
  }
});
