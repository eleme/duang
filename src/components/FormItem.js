def((Item, Input, Output) => {

  return class extends Item {

    get template() {
      return `
        <div>
          <span ref="text" class="text"></span>
          <span ref="ctrl" class="ctrl"></span>
          <span ref="desc" class="desc"></span>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
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
      let { depot } = this;
      this.ctrl.depot = depot;
      if (this.hidden) this.element.style.display = 'none';
      this.input = this.createInput().to(this.ctrl);
      this.$promise = this.input.$promise;
      if ('title' in this) {
        Output.createAny(this.title, { depot }).to(this.text);
      } else {
        this.text.style.display = 'none';
      }
      if ('description' in this) {
        Output.createAny(this.description, { depot }).to(this.desc);
      } else {
        this.desc.style.display = 'none';
      }
    }
    createInput() {
      let { component, args, depot } = this;
      return new Input({ component, args, depot });
    }

  };

});
