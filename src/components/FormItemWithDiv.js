def((FormItem) => class extends FormItem {

  get styleSheet() {
    return `
      :scope {
        white-space: nowrap;
        display: flex;
        > .ctrl {
          margin: 0 1em;
        }
        > span {
          width: auto;
          display: inline-block;
          align-items: center;
        }
      }
    `;
  }

});
