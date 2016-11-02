def((FrameHeadLogo, FrameHeadUser) => class extends Jinkela {
  init() {
    new FrameHeadLogo().renderTo(this);
    new FrameHeadUser().renderTo(this);
  }
  get styleSheet() {
    let height = 48;
    return `
      :scope {
        background: #20A0FF;
        color: #fff;
        height: ${height}px;
        line-height: ${height}px;
        z-index: 2;
      }
    `;
  }
});
