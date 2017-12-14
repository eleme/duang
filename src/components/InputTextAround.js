def((Input, Output) => {

  return class extends Jinkela {

    beforeParse(params) {
      let { component = 'String', args = {} } = params;
      this.component = component;
      this.args = args;
    }

    get input() {
      let { component, args, readonly } = this;
      args = Object.assign({ readonly }, args);
      let value = new Input({ component, args });
      Object.defineProperty(this, 'input', { configurable: true, value });
      return value;
    }

    get value() { return this.input.value; }
    set value(value) { this.input.value = value; }

    init() {
      let { before, after } = this;
      if (this.readonly) this.element.setAttribute('readonly', 'readonly');
      if (before) {
        Output.createAny(before).to(this);
        this.element.classList.add('has-before');
      }
      this.input.to(this);
      this.input.element.classList.add('input');
      if (after) {
        Output.createAny(after).to(this);
        this.element.classList.add('has-after');
      }
    }

    get styleSheet() {
      return `
        :scope {
          display: flex;
          > :not(.input) {
            box-sizing: border-box;
            border: 1px solid #C0CCDA;
            border-radius: 5px;
            padding: 0 .5em;
            height: 28px;
            font-size: 12px;
            line-height: 28px;
          }
          &[readonly] > :not(.input) {
            background-color: #eff2f7;
            border-color: #d3dce6;
            color: #bbb;
            cursor: not-allowed;
          }
          &.has-before {
            > .input input {
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
            }
            > :first-child {
              border-right: 0;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
          }
          &.has-after {
            .input input {
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
            > :last-child {
              border-left: 0;
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
            }
          }
        }
      `;
    }

  };
});
