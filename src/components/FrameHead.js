def((FrameHeadLogo, FrameHeadUser, FrameHeaderMenu) => class extends Jinkela {
  init() {
    new FrameHeadLogo().renderTo(this);
    new FrameHeaderMenu().renderTo(this);
    new FrameHeadUser().renderTo(this);
  }
  get styleSheet() {
    let height = 48;
    return `
      :scope {
        display: flex;
        background: #20A0FF;
        color: #fff;
        height: ${height}px;
        line-height: ${height}px;
        z-index: 2;
      }
    `;
  }
});
