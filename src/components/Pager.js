def((Button) => class extends Jinkela {
  get Button() { return Button; }
  get template() {
    return `
      <div>
        <jkl-button if="{canPrev}" onclick="{prev}">上一页</jkl-button>
        <span>{currentPage}</span>
        <jkl-button if="{canNext}" onclick="{next}">下一页</jkl-button>
      </div>
    `;
  }
  set data(list) {
    if (!list) return;
    let page = this.page = +depot.uParams.page || 1;
    this.canPrev = page > 1;
    this.canNext = list.length === depot.scheme.pageSize;
    if (!this.canPrev && !this.canNext) return this.element.style.visibility = 'hidden';
    this.currentPage = page;
  }
  set pagesize(size) {
    this.pageSize = size;
    this.element.style.display = size ? 'block' : 'none';
  }
  next() {
    let params = new UParams();
    params.page |= 0;
    if (params.page < 1) params.page = 1;
    params.page++;
    location.hash = '#' + params;
  }
  prev() {
    let params = new UParams();
    params.page |= 0;
    params.page--;
    if (params.page < 1) params.page = 1;
    location.hash = '#' + params;
  }
  get styleSheet() {
    return `
      :scope {
        display: none;
        text-align: right;
        margin: 1em;
        > span {
          border: 1px solid #20a0ff;
          background: #20a0ff;
          color: #fff;
          border-radius: 4px;
          line-height: 26px;
          vertical-align: middle;
          display: inline-block;
          padding: 0 .6em;
          margin: 0 -.6em;
        }
      }
    `;
  }
});
