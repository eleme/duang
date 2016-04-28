def((Button) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        text-align: right;
        margin: 1em;
      }
    `;
  }
  init() {
    new Button({ text: 'Create', onClick: () => this.click() }).renderTo(this);
  }
  click() {
    let { key } = new UParams();
    location.hash = new UParams({ module: 'editor', key });
  }
});
