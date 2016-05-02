def((Item, Input) => class extends Item {
  set value(value) {
    if (this.ctrl.tagName === 'META') return setTimeout(() => this.value = value, 16);
    this.ctrl.value = value;
  }
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
    this.ctrl = new Input(this);
  }
  get styleSheet() {
    return `
      :scope {
        td {
          padding: .5em;
        }
        > :nth-child(1) {
          text-align: right;
          &:after {
            content: ': ';
          }
        }
      }
    `;
  }
});
