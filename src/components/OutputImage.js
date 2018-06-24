def((PureDialog) => {

  let cache = {};

  return class extends Jinkela {

    get src() { return this.value || this.defaultValue; }

    load() {
      // 如果缓存可用则同步取缓存（异常直接 throw）
      let { noCache, src } = this;
      if (!noCache && src in cache) {
        let what = cache[src];
        if (what instanceof Error) throw what;
        return what.cloneNode();
      }
      // 正常的异步加载流程
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.addEventListener('load', () => {
          cache[src] = img;
          resolve(img.cloneNode());
        });
        img.addEventListener('error', () => {
          let exception = new Error('加载失败');
          cache[src] = exception;
          reject(exception);
        });
      });
    }

    init() {
      if (!this.src) return;
      try {
        FastResolve.fastResolve(this.load(), img => {
          if (this.maxWidth) img.style.setProperty('max-width', this.maxWidth);
          if (this.maxHeight) img.style.setProperty('max-height', this.maxHeight);
          img.addEventListener('click', event => {
            event.preventDefault();
            PureDialog.showImage({ url: this.src });
          });
          this.element.href = this.src;
          this.element.appendChild(img);
        }, error => {
          this.errorHandler(error);
        });
      } catch (error) {
        this.errorHandler(error);
      }
    }

    errorHandler() {
      this.element.textContent = '加载失败';
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

  };

});
