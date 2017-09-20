def((Input, Output) => {
  return class extends Jinkela {
    init() {
      let { component = 'String', args = {}, before, after } = this;
      if (before) {
        Output.createAny(before).to(this);
        this.element.classList.add('has-before');
      }
      this.input = new Input({ component, args }).to(this);
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
