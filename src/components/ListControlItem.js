def((Button) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    let path = [ depot.scheme.key ];
    switch (this.method) {
      case 'create':
        let { key, params = '{}' } = depot.uParams;
        location.hash = new UParams({ module: 'editor', key, params });
        break;
      case 'open':
        let { queryParams } = depot;
        let url = api.resolvePath([ depot.scheme.key, this.href ]);
        open(`${url}?${queryParams}`);
        break;
      default:
        if ('api' in this) path.push(this.api);
        api(path.join('/'), { method: this.method || 'POST' }).then(result => {
          depot.refresh();
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
