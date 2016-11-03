def((FrameAsideMenu) => class extends Jinkela {
  init() {
    new FrameAsideMenu().renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        border: 1px solid #EFF2F7;
        opacity: .9;
        position: absolute;
        background: #fff;
        width: 200px;
        z-index: 1;
        top: 90%;
        left: 0;
        max-height: 0;
        overflow: hidden;
        box-shadow: 0 0 6px 0px #999;
        visibility: hidden;
        border-radius: 3px;
        transition: max-height 300ms ease, visibility 300ms ease;
      }
    `;
  }
});
