def(() => class extends Jinkela {
  onClick(e) {
    e.stopPropagation();
    let { module, key, params = {}, where = {}, title, target, href, value = {} } = this;
    if ('module' in value) module = value.module;
    if ('target' in value) target = value.target;
    if ('key' in value) key = value.key;
    if ('params' in value) params = value.params;
    if ('where' in value) where = value.where;
    if ('href' in value) href = value.href;
    if ('title' in value) title = value.title;
    if (href) {
      open(href, target || '_self');
    } else {
      return depot.go({ args: { module, key, params, where }, target, title });
    }
  }
  get template() {
    return `
      <a on-click="{onClick}" href="javascript:">{title}</a>
    `;
  }
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
