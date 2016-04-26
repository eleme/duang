def((Item) => class extends Item {
  get value() { return this.ctrl.value; }
  get template() {
    return `
      <tr>
        <td>{title}</td>
        <td><meta ref="ctrl"></td>
      </tr>
    `;
  }
  init() {
    switch (this.type) {
      case 'price':
        this.ctrl = document.createElement('input');
        break;
      default:
        this.ctrl = document.createElement('input');
        break;
    }
  }
  get styleSheet() {
    return `
      :scope {
        > :nth-child(1) {
          text-align: right;
        }
      }
    `;
  }
});
