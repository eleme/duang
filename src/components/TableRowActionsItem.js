def((ListItem, Confirm) => class extends ListItem {
  init() {
    this.text = this.title || this.method;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(result => result && this.exec()) : this.exec();
  }
  get exec() { return this[this.method + 'Action'] || this.defaultAction; }
  goAction() {
    let { module, key, params, _blank } = this;
    params = refactor(params, this.fieldMap);
    params = JSON.stringify(refactor(params, this.fieldMap));
    let hash = '#' + new UParams({ module, key, params });
    _blank ? open(location.href.replace(/(#.*)?$/, hash)) : location.hash = hash;
  }
  editAction() {
    let { _blank } = this;
    this.module = 'editor';
    this.params = Object.assign({ '@id': '$.id' }, depot.params);
    this.key = depot.key;
    this.goAction();
  }
  defaultAction() {
    let path = [ depot.scheme.key, this.fieldMap.id ];
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
        margin-left: .5em;
        display: inline-block;
      }
    `;
  }
});
