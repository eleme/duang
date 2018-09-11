def(() => class extends Jinkela {
  onClick(e) {
    e.stopPropagation();
    let { module, key, params = {}, where = {}, title, _blank, target } = this;
    params = JSON.stringify(refactor(params, this.value));
    where = JSON.stringify(refactor(where, this.value));
    let uParams = new URLSearchParams({ module, key, params, where });
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
        location.hash = '#' + uParams;
        return;
    }
  }
  get template() {
    return `
      <a on-click="{onClick}" href="Javascript:;">{title}</a>
    `;
  }
  set value(value) {
    this.$value = value;
    if (value) this.title = value.title || value;
  }
  get value() { return this.$value; }
  get styleSheet() {
    return `
      :scope {
        color: #20A0FF;
        font-size: 12px;
        &:hover {
          color: #1D8CE0;
        }
      }
    `;
  }
});
