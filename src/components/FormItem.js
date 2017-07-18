def((Item, Input, Output) => {

  return class extends Item {

    get template() {
      return `
        <div>
          <span ref="text"></span>
          <span ref="ctrl"></span>
          <span ref="desc"></span>
        </div>
      `;
    }

    set value(value) {
      if (!this.input) return setTimeout(() => (this.value = value));
      this.input.value = value;
    }

    get value() {
      return this.input.value;
    }

    init() {
      this.ctrl.depot = this.depot;
      if (this.hidden) this.element.style.display = 'none';
      this.input = this.createInput().to(this.ctrl);
      this.$promise = this.input.$promise;
      if ('title' in this) {
        this.text.textContent = this.title;
      } else {
        this.element.removeChild(this.text);
        this.element.firstElementChild.colSpan = 2;
      }
      if (typeof this.description === 'string') {
        new Output({ component: 'HTML', value: this.description }).to(this.desc);
      } else if (typeof this.description === 'object') {
        new Output(this.description).to(this.desc);
      }
    }
    createInput() {
      return new Input(this);
    }

  };

});
