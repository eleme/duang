def((Item) => class extends Item {
  init() {
    if (this.children && this.children.length) this.text = this.children[0].data;
  }
  set text(value) {
    this.element.setAttribute('text', value || '一个神奇的按钮');
  }
  get tag() { return 'button'; }
  get tagName() { return this.tag; }
  set disabled(value) {
    if (value) {
      this.element.setAttribute('disabled', 'disabled');
    } else {
      this.element.removeAttribute('disabled');
    }
  }
  get disabled() {
    return this.element.hasAttribute('disabled');
  }
  get busy() {
    return this.element.classList.contains('busy');
  }
  set busy(value) {
    if (value) {
      this.element.classList.add('busy');
    } else {
      this.element.classList.remove('busy');
    }
  }
  get styleSheet() {
    return `
      :scope {
        border: 0;
        border-radius: 4px;
        padding: 7px 9px;
        font-size: 12px;
        font-family: inherit;
        border: 1px solid;
        background-color: #20a0ff;
        border-color: #20a0ff;
        line-height: 1;
        cursor: pointer;
        color: #fff;
        position: relative;
        text-align: center;
        &:hover { opacity: .8; }
        &:before {
          content: attr(text);
        }
        &:after {
          position: absolute;
          left: .8em;
          right: .8em;
          top: .4em;
          bottom: .4em;
        }
        &.busy {
          cursor: wait;
          opacity: .5;
        }
        &.busy:before {
          visibility: hidden;
        }
        &.busy:after {
          content: '';
          animation: button-busy 1000ms infinite;
        }
        &:focus { outline: none; }
        &[disabled] {
          color: #c0ccda;
          cursor: not-allowed;
          background-image: none;
          background-color: #eff2f7;
          border-color: #d3dce6;
          &:hover { opacity: 1; }
        }
      }
      @keyframes button-busy {
        0% { content: '·'; }
        25% { content: '··'; }
        50% { content: '···'; }
        75% { content: '····'; }
        100% { content: '·'; }
      }
    `;
  }
});
