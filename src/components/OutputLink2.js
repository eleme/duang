def(() => class extends Jinkela {
  onClick(e) {
    e.stopPropagation();
    var { module, key, params = {}, where = {}, title, target, href, value } = this;
    var { module, key, target, params, where, href, title } = Object.assign({ module, target, key, params, where, href, title }, value); // eslint-disable-line no-redeclare
    if (href) {
      open(href, target || '_self');
    } else {
      return depot.go({ args: { module, key, params }, target, title });
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
        &:hover {
          color: #1D8CE0;
        }
      }
    `;
  }
});
