def((Item) => class extends Item {
  init() {
    this.element.style.backgroundColor = this.color || '#20A0FF';
  }
  get tag() { return 'button'; }
  get template() {
    return `<${this.tag} text="{text}"></${this.tag}>`;
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
        border-radius: 1px;
        padding: .4em .8em;
        font-size: 12px;
        cursor: pointer;
        color: #fff;
        position: relative;
        text-align: center;
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
        &.busy:before {
          visibility: hidden;
        }
        &.busy:after {
          content: '';
          animation: button-busy 1000ms infinite;
        }
        &:hover {
          opacity: 0.8;
        }
        &:focus {
          outline: none;
        }
      }
      @keyframes button-busy {
        0% {
          content: '·';
        }
        25% {
          content: '··';
        }
        50% {
          content: '···';
        }
        75% {
          content: '····';
        }
        100% {
          content: '·';
        }
      }
    `;
  }
});
