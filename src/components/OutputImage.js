def((PureDialog) => class extends Jinkela {

  get src() { return this.value || this.defaultValue; }

  init() {
    if (this.src) {
      let img = new Image();
      img.src = this.src;
      img.addEventListener('click', event => {
        event.preventDefault();
        PureDialog.showImage({ url: this.src });
      });
      img.addEventListener('load', () => {
        this.element.href = this.src;
        this.element.appendChild(img);
      });
      img.addEventListener('error', () => {
        this.element.textContent = '加载失败';
      });
    }
  }

  get template() {
    return `
      <a on-click="{click}" href="javascript:"></a>
    `;
  }

  get styleSheet() {
    return `
      :scope {
        display: inline-block;
        cursor: default;
        > img {
          cursor: zoom-in;
          display: block;
          max-width: 32px;
          max-height: 32px;
        }
      }
    `;
  }

});
