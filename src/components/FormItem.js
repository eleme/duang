def((Item, Input) => {

  return class extends Item {
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
      this.ctrl.depot = this.depot;
      this.input = this.createInput().to(this.ctrl);
      this.$promise = this.input.$promise;
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
          break-inside: avoid-column;
          td {
            vertical-align: top;
            line-height: 28px;
          }
          > td:first-child:not([colspan]) {
            width: 80px;
            white-space: nowrap;
          }
        }
      `;
    }
  };

});
