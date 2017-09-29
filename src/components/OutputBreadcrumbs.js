def(() => {

  class Separator extends Jinkela {
    init() {
      this.element.textContent = this.text;
    }
    get styleSheet() {
      return `
        :scope {
          margin: 0 .5em;
          color: #bfcbd9;
        }
      `;
    }
  };

  class Step extends Jinkela {
    init() {
      this.element.textContent = this.text;
    }
  };

  return class extends Jinkela {
    init() {
      this.element.classList.add('breadcrumbs');
      let { scheme } = this.depot || window.depot;
      if (!scheme.title) return;
      let { separator } = this;
      if (!separator) separator = '/';
      scheme.title.split(/\s*-\s*/g).filter(Boolean).forEach(text => {
        new Separator({ text: separator }).to(this);
        new Step({ text }).to(this);
      });
    }
    get styleSheet() {
      return `
        :scope {
          display: flex;
          > :first-child { display: none; }
          > :last-child { color: #20a0ff; }
        }
      `;
    }
  };

});
