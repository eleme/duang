def((Output) => {

  class Panel extends Jinkela {
    popup(content, x, y) {
      this.element.innerHTML = content;
      this.element.style.top = y + 'px';
      this.element.style.left = x + 'px';
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
          margin-top: -6px;
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
    init() {
      this.element.addEventListener('mouseenter', this.enter);
      this.element.addEventListener('mouseleave', this.leave);
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (value === null || value === void 0) value = {};
      let { data, tip } = typeof value === 'object' ? value : { data: value };
      this.tip = tip;
      this.element.dataset['hastip'] = !!tip;
      while (this.element.firstChild) this.element.firstChild.remove();
      if (data === void 0) data = '';
      Output.createAny(data).to(this.element);
    }
    get panel() {
      let value = new Panel();
      Object.defineProperty(this, 'panel', { configurable: true, value });
      return value;
    }
    get enter() {
      let value = () => {
        document.addEventListener('mousemove', this.move);
        document.body.addEventListener('scroll', this.updatePanelPosition, true);
      };
      Object.defineProperty(this, 'enter', { configurable: true, value });
      return value;
    }
    get updatePanelPosition() {
      let value = () => {
        let rect = this.element.getBoundingClientRect();
        this.panel.popup(this.tip, rect.left + rect.width / 2, rect.top);
      };
      Object.defineProperty(this, 'updatePanelPosition', { configurable: true, value });
      return value;
    }
    get move() {
      let value = (event) => {
        if (event.target === this.element || this.element.contains(event.target)) {
          this.updatePanelPosition();
        } else {
          this.leave(event);
        }
      };
      Object.defineProperty(this, 'move', { configurable: true, value });
      return value;
    }
    get leave() {
      let value = () => {
        document.removeEventListener('mousemove', this.move);
        this.panel.element.remove();
        document.body.removeEventListener('scroll', this.updatePanelPosition, true);
      };
      Object.defineProperty(this, 'leave', { configurable: true, value });
      return value;
    }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          cursor: default;
        }
      `;
    }
  };

});
