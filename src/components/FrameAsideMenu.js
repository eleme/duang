def((FrameAsideMenuItem) => class extends Jinkela {
  init() {
    let { key } = new UParams();
    let { schemes } = config;
    let { permissions = [] } = session;
    schemes = schemes.filter(scheme => {
      if (~String(scheme.key).indexOf(':')) return false;
      if (!scheme.require) return true;
      return scheme.require.some((dep => ~permissions.indexOf(dep)));
    });
    FrameAsideMenuItem.cast(schemes, { currentKey: key }).renderTo(this);
  }
  get template() { return `<ul></ul>`; }
  get styleSheet() {
    return `
      :scope {
        list-style: none;
        padding: 0;
      }
    `;
  }
});
