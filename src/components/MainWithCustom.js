def(() => class extends Jinkela {

  init() {
    Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
    this.element.src = this.depot.params.href;
  }

  get template() {
    return `
      <iframe frameborder="0"></iframe>
    `;
  }

  get styleSheet() {
    return `
      :scope {
        width: 100%;
        height: 100%;
      }
    `;
  }

});
