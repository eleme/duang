def(() => {

  class Panel extends Jinkela {
    popup(content, event) {
      this.element.innerHTML = content;
      this.element.style.top = event.clientY + 'px';
      this.element.style.left = event.clientX + 'px';
      if (content) this.to(document.body);
    }
    get styleSheet() {
      return `
        :scope {
          position: absolute;
          color: #fff;
          background: #000;
          border-radius: 5px;
          padding: .5em .5em;
          margin-top: -12px;
          transform: translate(-50%, -100%);
          &::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -10px;
            border: 5px solid transparent;
            border-top: 5px solid #000;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (this.$value === value) return;
      this.$value = value;
      this.render();
    }
    beforeParse() {
      this.enter = this.enter.bind(this);
      this.leave = this.leave.bind(this);
      this.move = this.move.bind(this);
    }
    init() {
      this.render();
      this.value = this.value;
    }
    render() {
      let { value } = this;
      let { text, tip } = typeof value === 'object' ? value : { text: value };
      this.tip = tip;
      this.element.dataset['hastip'] = !!tip;
      this.element.textContent = text || '';
      this.element.addEventListener('mouseenter', this.enter);
      this.element.addEventListener('mouseleave', this.leave);
    }
    get panel() {
      let value = new Panel();
      Object.defineProperty(this, 'panel', { configurable: true, value });
      return value;
    }
    enter(event) {
      document.addEventListener('mousemove', this.move);
    }
    move(event) {
      if (event.target === this.element || this.element.contains(event.target)) {
        this.panel.popup(this.tip, event);
      } else {
        this.leave(event);
      }
    }
    leave() {
      document.removeEventListener('mousemove', this.move);
      this.panel.element.remove();
    }
    get styleSheet() {
      return `
        :scope {
          &[data-hastip=true] {
            text-decoration: underline;
            text-decoration-style: dotted;
          }
          cursor: default;
        }
      `;
    }
  };

});
