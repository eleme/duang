def((Output) => class extends Jinkela {
  static popup(...args) {
    return new Promise(resolve => {
      let ins = new this(...args);
      dialog.popup(ins);
      dialog.once('dialogcancel', () => resolve(ins.result));
    });
  }
  init() {
    this.title = this.title || this.defaultTitle;
    Output.createAny(this.text || this.defaultText).to(this.content);
  }
  get template() {
    return `
      <table>
        <tr>
          <td>${this.iconTemplate}</td>
          <td ref="content"></td>
        </tr>
      </table>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        margin: 36px 48px;
        overflow: hidden;
        text-align: left;
        height: 100px;
        border-collapse: collapse;
        font-size: 20px;
        line-height: 1.5;
        font-weight: 500;
        color: #575757;
        td { vertical-align: middle; }
        svg {
          display: inline-block;
          margin-right: 24px;
        }
      }
    `;
  }
});
