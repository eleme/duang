def((Item, TableCell) => class extends Item {
  get template() { return `<tr></tr>`; }
  init() {
    TableCell.cast(this.fields || []).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        border: solid #e4e4e4;
        border-width: 1px 0;
        line-height: 24px;
      }
    `;
  }
});
