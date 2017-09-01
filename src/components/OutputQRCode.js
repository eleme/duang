define([ 'https://shadow.elemecdn.com/gh/davidshimjs/qrcodejs@04f46c6a/qrcode.min.js' ], () => {

  class QRCodePanel extends Jinkela {
    init() {
      let { QRCode } = window;
      void new QRCode(this.element, {
        text: this.value === void 0 ? this.defaultValue : this.value,
        width: 1000,
        height: 1000,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      });
    }
    get styleSheet() {
      return `
        :scope {
          background: #fff;
          position: relative;
          margin-top: -50px;
          z-index: 1;
          overflow: hidden;
          text-align: center;
          box-sizing: border-box;
          padding: 10px;
          height: calc(100% - 20px);
          img {
            margin: auto;
            height: inherit;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get panel() {
      let value = new QRCodePanel(this);
      Object.defineProperty(this, 'panel', { configurable: true, value });
      return value;
    }
    click() {
      dialog.popup(this.panel);
    }
    get template() {
      return `
        <div on-click="{click}">
          <svg xmlns="http://wwww3org/2000/svg" viewBox="0 0 1024 1024"><path d="M62 484l423 0L486 60 62 60 62 484zM168 166l211 0 0 211L168 378 168 166zM539 60l0 423 423 0L962 60 539 60zM856 378 644 378 644 166l211 0L856 378zM221 325l105 0L327 219 221 219 221 325zM62 960l423 0L486 536 62 536 62 960zM168 642l211 0 0 211L168 854 168 642zM803 219 697 219l0 105 105 0L803 219zM539 960l105 0L644 854 539 854 539 960zM644 642l0 211 105 0L750 642 644 642zM856 854 750 854 750 960l211 0L962 748 856 748 856 854zM856 642l105 0L962 536 856 536 856 642zM539 536l0 105 105 0L644 536 539 536zM221 801l105 0L327 695 221 695 221 801z" /></svg>
        </div>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          width: 24px;
          height: 24px;
          > svg {
            fill: currentColor;
            width: 100%;
            height: 100%;
            display: inline-block;
          }
          cursor: pointer;
        }
      `;
    }
  };

});
