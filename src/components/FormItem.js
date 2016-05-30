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
    return new Input(this, { scheme: this.scheme });
  }
  get styleSheet() {
    return `
      :scope {
        td {
          padding: .5em;
        }
        > :first-child {
          width: 1px;
          white-space: nowrap;
          text-align: right;
          vertical-align: top;
          &:not(:empty):after {
            content: ': ';
          }
        }
      }
    `;
  }
});
