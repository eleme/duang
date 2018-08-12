def((ErrorDisplay) => class extends Jinkela {
  init() {
    this.text = '正在拼命加载 ...';
  }
  set error(error) {
    if (!error) return;
    this.element.innerHTML = '';
    new ErrorDisplay({ error, noIcon: true }).to(this);
  }
  hide() {
    this.element.style.display = 'none';
  }
  get template() {
    return `
      <div>
        <p ref="p"><meta ref="text" /></p>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        p {
          text-align: center;
          font-size: 16px;
          padding: 3em;
          color: inherit;
          white-space: pre;
          margin: 0 1em;
          border-radius: 4px;
        }
        > iframe {
          display: none;
          width: 100%;
        }
      }
    `;
  }
});
