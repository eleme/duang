def((Button) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  goAction() {
    let { module, key, params, _blank, target, title } = this;
    let { scheme, where } = depot;
    params = JSON.stringify(refactor(params, { params: depot.params, scheme, where }));
    let uParams = new UParams({ module, key, params });
    if (_blank) target = '_blank';
    switch (target) {
      case '_blank':
        return open(location.href.replace(/(#.*)?$/, '#' + uParams));
      case 'dialog':
        return require([ 'modules/' + (module || 'default') + '.js' ], Module => {
          let { Main } = Module.prototype;
          dialog.popup(new Main({ depot: depot.fork(uParams), title }));
        });
      default:
        return location.hash = '#' + uParams;
    }
  }
  createAction() {
    this.module = 'editor';
    this.key = depot.key;
    this.params = this.params || depot.params;
    this.goAction();
  }
  openAction() {
    let { queryParams, resolvedKey } = depot;
    let url = api.resolvePath([ resolvedKey, this.href ]);
    open(`${url}?${queryParams}`);
  }
  defaultAction() {
    let path = [ depot.resolvedKey ];
    if ('api' in this) path.push(this.api);
    api(path, { method: this.method || 'POST' }).then(result => {
      depot.refresh();
    }, error => {
      alert(error.message);
    });
  }
  get styleSheet() {
    return `
      :scope {
        display: inline-block;
        margin-left: 1em;
        &:last-child {
          margin-left: 0;
        }
      }
    `;
  }
});
