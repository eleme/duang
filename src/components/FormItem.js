def((Item, Input) => class extends Item {
  set value(value) { this.input.value = value; }
  get value() { return this.input.value; }
  get template() {
    return `
      <tr>
        <td>{title}</td>
        <td><meta ref="ctrl"></td>
      </tr>
    `;
  }
  init() {
    this.input = this.ctrl = this.createInput();
  }
  createInput() {
    return new Input(this);
  }
  get styleSheet() {
    return `
      :scope {
        td {
          padding: .5em;
        }
        > :nth-child(1) {
          text-align: right;
          &:not(:empty):after {
            content: ': ';
          }
        }
      }
    `;
  }
});
