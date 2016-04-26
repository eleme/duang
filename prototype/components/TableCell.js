def((Item, TableRowActions) => class extends Item {
  get template() { return `<td><meta ref="meta" /></td>`; }
  init() {
    if (this.align) this.element.align = this.align;
    if ('value' in this) {
      let { value } = this;
      switch (this.type) {
        case 'datetime':
          value = new Date(value * 1000).toLocaleString('zh-CN', { hour12: false });
          value = new Text(value);
          break;
        case 'thumb':
          let img = new Image();
          img.width = 32;
          img.src = value;
          value = img;
          break;
        case 'actions':
          value = new TableRowActions({ data: value, scheme: this.scheme, id: this.id });
          break;
        case 'price':
          value = new Text('￥' + value);
          break;
        default:
          value = new Text(value || '');
      }
      this.meta = value;
    } else {
      this.meta = new Text(this.title);
    }
  }
  get styleSheet() {
    return `
      :scope {
        border: solid #e4e4e4;
        border-width: 1px 0;
      }
    `;
  }
});
