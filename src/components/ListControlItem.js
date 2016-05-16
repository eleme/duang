def((Button) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    switch (this.type) {
      case 'create':
        let { key } = new UParams();
        location.hash = new UParams({ module: 'editor', key });
        break;
      case 'custom':
      default:
        api([ this.scheme.key, this.api ], { method: 'POST' }).then(result => {
          init();
        });
    }
  }
  get styleSheet() {
    return `
      :scope {
        display: inline-block;
        margin-right: 1em;
        &:last-child {
          margin-left: 0;
        }
      }
    `;
  }
});
