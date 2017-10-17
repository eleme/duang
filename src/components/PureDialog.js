def((ErrorDialog) => class extends Jinkela {
  static showImage(args) {
    let panel;
    let img = new Image();
    img.src = args.url;
    let handler = () => dialog.cancel();
    img.addEventListener('load', () => {
      panel = new this({ children: [ img ], handler }, args);
      dialog.popup(panel, { minWidth: '0' });
      dialog.once('transitionend', () => (panel.element.style.cursor = 'zoom-out'));
    });
    img.addEventListener('error', () => ErrorDialog.popup({ error: new Error('图片加载失败') }));
  }
  get styleSheet() {
    return `
      :scope {
        margin-top: -50px;
        position: relative;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),
                          linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        z-index: 1;
        > img {
          display: block;
          margin: auto;
          max-height: 70vh;
          max-width: 80vw;
        }
      }
    `;
  }
  get template() {
    return `
      <div on-click="{handler}"><meta ref="children" /></div>
    `;
  }
});
