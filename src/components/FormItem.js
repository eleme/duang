def((Item, Input, Output) => {

  return class extends Item {

    get template() {
      return `
        <div>
          <span ref="text" class="text"></span>
          <span ref="ctrl"></span>
          <span ref="desc" class="desc"></span>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          > .text { opacity: .6; }
          > .desc { opacity: .6; }
        }
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
        if (typeof this.title === 'string') {
          new Output({ component: 'HTML', value: this.title }).to(this.text);
        } else if (typeof this.title === 'object') {
          new Output(this.title).to(this.text);
        }
      } else {
        this.text.style.display = 'none';
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
