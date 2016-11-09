const dialog = new class extends Jinkela {
  init() {
    document.body ? this.render() : addEventListener('DOMContentLoaded', this.render.bind(this));
    this.dl.addEventListener('click', event => event.dontCancel = true);
    this.element.addEventListener('click', event => event.dontCancel || this.cancel());
    this.close.addEventListener('click', event => this.cancel());
    this.stack = [];
  }
  render() { this.to(document.body); }
  popup(content) {
    if (content && this.content) this.stack.push(this.content);
    while (!content && this.stack.length) content = this.stack.pop();
    if (content) {
      this.content = content;
      this.title.innerHTML = content.title || '&nbsp;';
      this.dd.innerHTML = '';
      content.to(this.dd);
      this.element.className = 'active';
    } else {
      this.content = null;
      this.element.className = '';
    }
  }
  get cancel() { return () => this.popup(); }
  get template() {
    return `
      <div>
        <dl ref="dl">
          <dt>
            <h5><span ref="title"></span></h5>
            <a href="JavaScript:" ref="close">
              <svg width="16" height="16" stroke="#4c4c4c">
                <line x1="0" y1="0" x2="16" y2="16" />
                <line x1="0" y1="16" x2="16" y2="0" />
              </svg>
            </a>
          </dt>
          <dd ref="dd"></dd>
        </dl>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        position: fixed;
        z-index: 999;
        color: #666;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: visibility 200ms ease, opacity 200ms ease;
        visibility: hidden;
        opacity: 0;
        background: rgba(0,0,0,0.8);
        &.active {
          visibility: visible;
          opacity: 1;
          dl { transform: translateX(-50%) translateY(-60%); }
        }
        > dl {
          box-sizing: border-box;
          min-width: 514px;
          padding: 0;
          margin: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transition: transform 200ms ease;
          transform: translateX(-50%) translateY(-80%) scale(0.8);
          background: #fff;
          display: inline-block;
          > dt {
            overflow: hidden;
            line-height: 48px;
            padding: 0px 1em;
            display: block;
            font-size: 13px;
            position: relative;
            h5 {
              float: left;
              margin: 0;
              font-size: 15px;
              font-weight: bold;
              color: #1F2D3D;
              line-height: inherit;
            }
            a {
              position: absolute;
              margin: auto;
              width: 16px;
              height: 16px;
              top: 0;
              bottom: 0;
              right: 1em;
              color: #99A9BF;
              text-decoration: none;
            }
            svg {
              stroke: #99A9BF;
              display: block;
            }
          }
          > dd {
            margin: 0;
            div > div {
              text-align: right;

              button {
                margin: 0 0 0 1em;
              }
            }
          }
        }
      }
    `;
  }
};
