def((Item, Input) => class extends Item {
  set value(value) {
    if (!this.input) return setTimeout(() => this.value = value);
    this.input.value = value;
  }
  get value() {
    return this.input.value;
  }
  get template() {
    return `
      <tr>
        <td ref="text"></td>
        <td ref="ctrl"></td>
      </tr>
    `;
  }
  init() {
    this.element.dataset.component = this.component;
    this.ctrl.depot = this.depot;
    this.input = this.createInput().renderTo(this.ctrl);
    if ('title' in this) {
      this.text.textContent = this.title;
    } else {
      this.element.removeChild(this.text);
      this.element.firstElementChild.colSpan = 2;
    }
  }
  createInput() {
    return new Input(this);
  }
  get styleSheet() {
    return `
      :scope {
        > * {
          padding: .5em;
        }
        &[data-component="GroupingSelect"] > :first-child {
          line-height: 18px;
          vertical-align: top;
        }
        > td:first-child:not([colspan]) {
          width: 80px;
          white-space: nowrap;
          vertical-align: top;
          color: #475669;
        }
      }
    `;
  }
});
