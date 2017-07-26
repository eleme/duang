def((Item, Input, Output) => {

  return class extends Item {

    get template() {
      return `
        <div>
          <span ref="text" class="text"></span>
          <span ref="ctrl"></span>
          <span ref="desc"></span>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          > .text { opacity: .6; }
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
        this.text.textContent = this.title;
      } else {
        this.text.style.display = 'none';
        // 伪 td 不支持 col-span，于是创建一个真实的 td 来替代伪 td
        let td = document.createElement('td');
        td.colSpan = 2;
        while (this.ctrl.firstChild) td.appendChild(this.ctrl.firstChild);
        this.element.insertBefore(td, this.ctrl);
        this.ctrl.remove();
        this.ctrl = td;
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
