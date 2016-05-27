def((FrameAsideMenuItem) => class extends Jinkela {
  init() {
    let { key } = new UParams();
    let { schemes } = config;
    if (session.permissions) {
      schemes = schemes.filter(scheme => {
        if (!scheme.require) return true;
        return scheme.require.some((dep => ~session.permissions.indexOf(dep)));
      });
    }
    FrameAsideMenuItem.cast(schemes, { currentKey: key }).renderTo(this);
  }
  get A() {
    return (function*A () {});
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
