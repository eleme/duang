def((FormItem) => class extends FormItem {

  get styleSheet() {
    return `
      :scope {
        display: table-row;
        break-inside: avoid-column;
        > span {
          display: table-cell;
          vertical-align: top;
          line-height: 28px;
          text-align: left;
        }
        > span:first-child {
          width: 80px;
          white-space: nowrap;
        }
      }
    `;
  }

});
