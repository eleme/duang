def((Output) => class extends Jinkela {
  init() {
    let nav = depot.config.nav;
    if (!(nav instanceof Array)) nav = [ { component: 'User' } ];
    nav.forEach(item => {
      Output.createAny(item).to(this);
    });
  }
  get styleSheet() {
    return `
      :scope {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-end;
        background: #20A0FF;
        color: #fff;
        > * {
          margin-right: 2em;
        }
      }
    `;
  }
});
