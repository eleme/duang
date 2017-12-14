def((FormItem) => class extends FormItem {

  get styleSheet() {
    return `
      :scope {
        white-space: nowrap;
        display: flex;
        > .text { margin-right: 1em; }
        > .desc { margin-left: 1em; }
        > span {
          vertical-align: top;
          line-height: 28px;
          width: auto;
          display: inline-block;
          align-items: center;
        }
      }
    `;
  }

});
