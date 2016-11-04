def((FrameAside) => class extends Jinkela {
  init() {
    new FrameAside().renderTo(this);
  }
  get template() {
    return `
      <div>
        <a href="JavaScript:">主菜单</a>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        > a {
          border: 1px solid #fff;
          padding: .5em 1em;
          border-radius: 40px;
        }
        &:hover {
          > div {
            max-height: 1000px;
            visibility: visible;
          }
        }
        color: #fff;
        position: relative;
      }
    `;
  }
});
