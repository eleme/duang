def((ListItem, Confirm) => class extends ListItem {
  init() {
    this.text = this.title || this.method;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  goAction() {
    let { module, key, params, _blank, target, title, where, depot } = this;
    params = JSON.stringify(refactor(params || {}, this.fieldMap));
    where = JSON.stringify(refactor(where || {}, this.fieldMap));
    let uParams = new UParams({ module, key, params, where });
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
  editAction() {
    let { depot } = this;
    this.module = 'editor';
    this.params = Object.assign({ '@id': '$.id' }, depot.params);
    this.key = depot.key;
    this.goAction();
  }
  defaultAction() {
    let { depot } = this;
    let path = [ depot.resolvedKey, this.fieldMap.id ];
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
        margin-right: .5em;
        display: inline-block;
        color: #20A0FF;
        font-size: 12px;
        &:hover {
          color: #1D8CE0;
        }
      }
    `;
  }
});
