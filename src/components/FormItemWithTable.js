def((FormItem) => class extends FormItem {

  init() {
    if (this.text.style.display === 'none') {
      // 伪 td 不支持 col-span，于是创建一个真实的 td 来替代伪 td
      let td = document.createElement('td');
      td.colSpan = 2;
      while (this.ctrl.firstChild) td.appendChild(this.ctrl.firstChild); // this.ctrl 里面的所有子元素移动到 td 里面
      this.element.insertBefore(td, this.ctrl);
      this.ctrl.remove();
      this.ctrl = td;
    }
  }

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
