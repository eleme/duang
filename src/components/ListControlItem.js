def((Button) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  goAction() {
    let { module, key, params, _blank } = this;
    let { scheme, where } = depot;
    params = JSON.stringify(refactor(params, { params: depot.params, scheme, where }));
    let hash = '#' + new UParams({ module, key, params });
    _blank ? open(location.href.replace(/(#.*)?$/, hash)) : location.hash = hash;
  }
  createAction() {
    let { key, params = '{}' } = depot.uParams;
    location.hash = new UParams({ module: 'editor', key, params });
  }
  openAction() {
    let { queryParams } = depot;
    let url = api.resolvePath([ depot.scheme.key, this.href ]);
    open(`${url}?${queryParams}`);
  }
  defaultAction() {
    let path = [ depot.scheme.key ];
    if ('api' in this) path.push(this.api);
    api(path.join('/'), { method: this.method || 'POST' }).then(result => {
      depot.refresh();
    }, error => {
      alert(error.message);
    });
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
