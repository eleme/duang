def((FrameAside) => class extends Jinkela {
  init() {
    new FrameAside().to(this);
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
        &::before {
          content: '';
          display: inline-block;
          height: 50%;
          width: 0px;
        }
        > a {
          border: 1px solid #fff;
          padding: 7px 9px;
          border-radius: 28px;
          line-height: 1;
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
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
