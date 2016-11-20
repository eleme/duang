def((FrameUser) => class extends Jinkela {
  init() {
    new FrameUser().to(this);
  }
  get styleSheet() {
    return `
      :scope {
        height: 50px;
        line-height: 50px;
        display: flex;
        background: #20A0FF;
        color: #fff;
      }
    `;
  }
});
