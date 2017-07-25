def(() => class extends Jinkela {

  init() {
    let { params } = this.depot || depot;
    this.element.src = params.href;
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
