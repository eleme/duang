def((Item, Input) => class extends Item {
  set value(value) { this.input.value = value; }
  get value() { return this.input.value; }
  get template() {
    return `
      <tr>
        <td></td>
        <td ref="ctrl"></td>
      </tr>
    `;
  }
  init() {
    this.element.dataset.component = this.component;
    this.input = this.createInput().renderTo(this.ctrl);
    if ('title' in this) {
      this.element.firstElementChild.textContent = this.title;
    } else {
      this.element.removeChild(this.element.firstElementChild);
      this.element.firstElementChild.colSpan = 2;
    }
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
        &[data-component="GroupingSelect"] > :first-child {
          line-height: 18px;
          vertical-align: top;
        }
        > :first-child:not([colspan]) {
          width: 1px;
          white-space: nowrap;
          text-align: right;
          &:not(:empty):after {
            content: ': ';
          }
        }
      }
    `;
  }
});
