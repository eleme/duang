def((FrameAsideMenuItem) => class extends Jinkela {
  init() {
    let { key } = new UParams();
    FrameAsideMenuItem.cast(config, { currentKey: key }).renderTo(this);
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
