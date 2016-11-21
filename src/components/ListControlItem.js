def((Button) => class extends Button {
  init() {
    this.text = this.title;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  goAction() {
    let { module, key, params, _blank, target, title, depot } = this;
    let { scheme, where } = depot;
    params = JSON.stringify(refactor(params, { params: depot.params, scheme, where }));
    let uParams = new UParams({ module, key, params });
    if (_blank) target = '_blank';
    switch (target) {
      case '_blank':
        return open(location.href.replace(/(#.*)?$/, '#' + uParams));
      case 'dialog':
        return req('MainWith' + String(module || 'default').replace(/./, $0 => $0.toUpperCase())).then(Main => {
          let main = new Main({ depot: depot.fork(uParams), title });
          return Promise.resolve(main.$promise).then(() => dialog.popup(main));
        }, error => {
          console.log(error); // eslint-disable-line
        });
      default:
        return location.hash = '#' + uParams;
    }
  }
  createAction() {
    let { depot } = this;
    this.module = 'editor';
    this.key = depot.key;
    this.params = this.params || depot.params;
    this.goAction();
  }
  openAction() {
    let { depot } = this;
    let { queryParams, resolvedKey } = depot;
    let url = api.resolvePath([ resolvedKey, this.href ]);
    open(`${url}?${queryParams}`);
  }
  defaultAction() {
    let { depot } = this;
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
        min-width: 64px;
        min-height: 32px;
        &:last-child {
          margin-left: 0;
        }
      }
    `;
  }
});
