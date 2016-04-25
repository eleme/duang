def((FrameAsideMenuItem) => class extends Jinkela {
  init() {
    co(function*(){
      let response = yield fetch('/config.json');
      let result = yield response.json();
      return result.map(({ key, title }) => ({ href: '#' + new UParams({ module: 'list', key }), text: title }));
    }).then(list => {
      FrameAsideMenuItem.cast(list).renderTo(this);
    });
  }
  get A() {
    return (function*A () {});
  }
  get template() { return `<ul></ul>`; }
  get styleSheet() {
    return `
      :scope {
        list-style: none;
        margin: 1em;
        padding: 0;
      }
    `;
  }
});
