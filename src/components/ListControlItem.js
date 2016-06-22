def((Button, Scheme) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    let path = [ this.scheme.key ];
    switch (this.method) {
      case 'create': // Discarded
        let { key } = new UParams();
        location.hash = new UParams({ module: 'editor', key });
        break;
      case 'open':
        let { queryParams } = new Scheme();
        let url = api.resolvePath([ this.scheme.key, this.href ]);
        open(`${url}?${queryParams}`);
        break;
      default:
        if ('api' in this) path.push(this.api);
        api(path.join('/'), { method: this.method || 'POST' }).then(result => {
          init();
        }, error => {
          alert(error.message);
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
