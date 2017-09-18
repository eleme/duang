def(() => {

  const UNIQ = 'error_display_' + Array.from({ length: 16 }, () => (36 * Math.random() | 0).toString(36)).join('');

  class NormalMessage extends Jinkela {
    init() {
      this.content.innerHTML = this.message;
    }
    get template() {
      return `
        <div>
          <div class="icon" if-not="{noIcon}"></div>
          <div ref="content" class="content"></div>
        </div>
      `;
    }
    get styleSheet() {
      return `
        @keyframes ${UNIQ}_a {
          from { opacity: 0; transform: scaleY(0); }
          to { opacity: 1; transform: scaleY(1); }
        }
        @keyframes ${UNIQ}_b {
          from { opacity: 0; width: 37px; }
          50% { width: 57px; }
          to { opacity: 1; width: 47px; }
        }
        :scope {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 80px;
          > .icon {
            animation: ${UNIQ}_a 300ms ease forwards;
            border: 4px solid #f27474;
            width: 80px;
            height: 80px;
            border-radius: 100%;
            position: relative;
            margin: 2em;
            &::before, &::after {
              content: '';
              animation: ${UNIQ}_b 300ms ease forwards;
              animation-delay: 200ms;
              position: absolute;
              opacity: 0;
              height: 5px;
              width: 37px;
              margin: auto;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: #f27474;
              border-radius: 2px;
              transform-origin: center;
            }
            &::before { transform: rotate(-45deg); }
            &::after { transform: rotate(45deg); }
          }
          > .content {
            text-align: left;
            font-size: 16px;
            white-space: pre;
            margin: 0 2em;
            border-radius: 4px;
            flex: 1;
          }
        }
      `;
    }
  }

  class FrameMessage extends Jinkela {
    get tagName() { return 'iframe'; }
    init() {
      let url = URL.createObjectURL(new Blob([ this.message ], { type: 'text/html' }));
      this.element.frameBorder = '0';
      this.element.src = url;
      this.element.style.display = 'none';
      this.element.addEventListener('load', () => {
        this.element.style.display = 'block';
        this.element.style.height = this.element.contentDocument.documentElement.scrollHeight + 'px';
      });
    }
    get styleSheet() {
      return `
        :scope {
          width: 100%;
          display: none;
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { error, noIcon } = this;
      if (typeof error === 'object') {
        console.error(error);
        let message = error.message || error.name || JSON.stringify(error);
        new NormalMessage({ message, noIcon }).to(this);
      } else if (typeof error === 'string') {
        new FrameMessage({ message: error }).to(this);
      }
    }
    get styleSheet() {
      return `
        :scope {
          width: 100%;
        }
      `;
    }
  };

});
