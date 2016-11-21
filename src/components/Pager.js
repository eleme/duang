def((ButtonHollow) => class extends Jinkela {
  get Button() { return ButtonHollow; }
  get template() {
    return `
      <div>
        <jkl-button disabled="{disablePrev}" onclick="{prev}">&lt;</jkl-button>
        <span>{currentPage}</span>
        <jkl-button disabled="{disableNext}" onclick="{next}">&gt;</jkl-button>
      </div>
    `;
  }
  set data(list) {
    if (!(list instanceof Array)) list = [];
    let depot = this.depot;
    let page = this.page = +depot.uParams.page || 1;
    this.disablePrev = page <= 1;
    this.disableNext = list.length < depot.scheme.pageSize;
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
          line-height: 28px;
          vertical-align: middle;
          display: inline-block;
          margin: 0 .5em;
        }
      }
    `;
  }
});
