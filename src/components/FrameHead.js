def((FrameHeadLogo, FrameHeadUser) => class extends Jinkela {
  init() {
    new FrameHeadLogo().renderTo(this);
    new FrameHeadUser().renderTo(this);
  }
  get styleSheet() {
    let height = 36;
    return `
      :scope {
        background: #222;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        color: #fff;
        height: ${height}px;
        line-height: ${height}px;
        z-index: 2;
      }
    `;
  }
});
