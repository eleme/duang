def(() => class extends Jinkela {

  set depot(value) {
    let { uParams, where, params, scheme } = value || window.depot;
    uParams = Object.assign({}, uParams, { where, params });
    this.detail = JSON.stringify({ uParams, scheme }, null, 2);;
  }

  toggle() {
    this.showDetail = !this.showDetail;
    this.update();
  }

  update() {
    if (this.showDetail) {
      this.toggleText = '[隐藏详情]';
      this.pre.style.height = this.pre.scrollHeight + 'px';
      this.pre.style.opacity = 1;
    } else {
      this.toggleText = '[查看详情]';
      this.pre.style.height = 0;
      this.pre.style.opacity = 0;
    }
  }

  init() {
    this.update();
  }

  get template() {
    return `
      <div>
        <h2>
          <span>{message}</span>
          <button on-click="{toggle}">{toggleText}</button>
        </h2>
        <div style="height: 1px; background: #e0e6ed;"></div>
        <pre ref="pre">{detail}</pre>
      </div>
    `;
  }

  get styleSheet() {
    return `
      :scope {
        text-align: left;
        font-size: 16px;
        padding: .5em 2em;
        > h2 {
          display: flex;
          align-items: center;
          &::before {
            display: block;
            width: 1em;
            height: 1em;
            background: url('https://shadow.elemecdn.com/iconfont/icons/3961876/fills/%23F56C6C');
            background-size: cover;
            content: '';
            margin-right: .5em;
          }
          > button {
            border: 0;
            padding: 0;
            background: none;
            color: #409eff;
            cursor: pointer;
            margin-left: 2em;
            outline: none;
          }
        }
        > pre {
          margin: 1em 0;
          overflow: hidden;
          transition: height 200ms linear, opacity 200ms linear;
        }
      }
    `;
  }

});
