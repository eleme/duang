def((MainWithDefaultItem) => class extends Jinkela {
  init() {
    while (this.element.firstChild) this.element.firstChild.remove();
    let { key, session } = depot;
    let { schemes } = config;
    let { permissions = [] } = session;
    schemes = schemes.filter(scheme => {
      if (/(?:^|\/):/.test(scheme.key)) return false;
      if (scheme.hidden) return false;
      if (!scheme.require) return true;
      return scheme.require.some((dep => ~permissions.indexOf(dep)));
    });
    MainWithDefaultItem.cast(schemes, { currentKey: key }).to(this);
  }
  get template() { return `<div></div>`; }
  get styleSheet() {
    return `
      :scope {
        list-style: none;
        padding: 0;
      }
    `;
  }
});
