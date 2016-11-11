def(() => class extends Jinkela {
  static popup(...args) { dialog.popup(new this(...args)); }
  init() {
    this.title = this.title || this.defaultTitle;
    this.text = this.text || this.defaultText;
  }
  get template() {
    return `
      <table>
        <tr>
          <td>${this.iconTemplate}</td>
          <td>{text}</td>
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
