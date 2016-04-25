def((Item) => class extends Item {
  get template() {
    return `<button></button>`;
  }
  click() {
    if (this.element.classList.contains('busy')) return;
    if (typeof this.onClick !== 'function') return;
    this.element.classList.add('busy');
    let that = this.onClick(event);
    if (that && that.then) {
      what.catch(() => {}).then(() => {
        this.element.classList.remove('busy');
      });
    } else {
      this.element.classList.remove('busy');
    }
  }
  init() {
    this.element.textContent = this.text;
    this.element.addEventListener('click', event => this.click(event));
  }
  get styleSheet() {
    return `
      :scope {
        border: 0;
        border-radius: 5px;
        background: #1e89e0;
        padding: .25em .5em;
        cursor: pointer;
        color: #fff;
        &:hover {
          opacity: 0.8;
        }
        &:focus {
          outline: none;
        }
      }
    `;
  }
});
