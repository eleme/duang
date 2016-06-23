def((Button) => class extends Jinkela {
  init() {
    let page = this.page = +depot.uParams.page || 1;
    let canPrev = page > 1;
    let canNext = this.list.length === depot.scheme.pageSize;
    if (!canPrev && !canNext) return this.element.style.display = 'none';
    if (canPrev) new Button({ text: 'Prev', onClick: () => this.prev() }).renderTo(this);
    new Jinkela({ init() { this.element.textContent = page; } }).renderTo(this);
    if (canNext) new Button({ text: 'Next', onClick: () => this.next() }).renderTo(this);
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
        text-align: right;
        margin: 1em;
        > * {
          display: inline-block;
          margin-left: 1em;
        }
      }
    `;
  }
});
