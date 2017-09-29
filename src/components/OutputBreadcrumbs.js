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
    get styleSheet() {
      return `
        :scope {
        }
      `;
    }
  };

  return class extends Jinkela {
    init() {
      let { scheme } = this.depot || window.depot;
      if (!scheme.title) return;
      let { separator } = this;
      if (!separator) separator = '/';
      let path = scheme.title.split(/\s*-\s*/g).filter(Boolean).forEach(text => {
        new Separator({ text: separator }).to(this);
        new Step({ text }).to(this);
      });
      Step.from(path).to(this);
    }
    get styleSheet() {
      return `
        :scope {
          display: flex;
          line-height: 20px;
          > :first-child { display: none; }
        }
      `;
    }
  };

});
