def((FrameAside) => class extends Jinkela {
  init() {
    new FrameAside().renderTo(this);
  }
  get template() {
    return `
      <div>
        <a href="JavaScript:">开始</a>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
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
