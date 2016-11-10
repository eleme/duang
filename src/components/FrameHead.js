def((FrameHeadLogo, FrameHeadUser, FrameHeadMenu) => class extends Jinkela {
  init() {
    new FrameHeadLogo().to(this);
    new FrameHeadMenu().to(this);
    new FrameHeadUser().to(this);
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
