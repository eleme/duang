def((FormItem) => class extends FormItem {

  get styleSheet() {
    return `
      :scope {
        white-space: nowrap;
        > span {
          width: auto;
          display: inline-block;
          vertical-align: middle;
        }
      }
    `;
  }

});
