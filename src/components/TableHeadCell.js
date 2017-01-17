def((Output, Item) => class extends Item {
  init() {
    let { uParams } = depot;
    let { width, nowrap } = this;
    if (width) this.element.style.width = width + 'px';
    if (nowrap) this.element.style.whiteSpace = 'nowrap';
    if (uParams.orderBy) {
      let { orderBy } = uParams;
      let isDesc = (orderBy[0] === '-');
      let key = isDesc ? orderBy.slice(1) : orderBy;
      if (key === this.key) {
        this.sortIcon.setAttribute('orderBy', isDesc ? 'desc' : 'asc');
      }
    }
  }
  sort() {
    let orderBy = this.sortIcon.getAttribute('orderBy') === 'desc' ? '' : '-';
    this.element.dispatchEvent(new CustomEvent('sort', {
      bubbles: true,
      detail: orderBy + this.key
    }));
  }
  get template() {
    return `
      <td>
        <span>{title}</span>
        <div if="{sortable}" on-click="{sort}" ref="sortIcon" class="caret-wrapper">
          <i class="sort-caret ascend"></i>
          <i class="sort-caret descend"></i>
        </div>
      </td>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        padding: 0 18px;
        line-height: 24px;
        height: 40px;
        white-space: nowrap;
        font-weight: bold;
        color: #1f2d3d;
        > .caret-wrapper {
          margin-left: 5px;
          width: 16px;
          height: 34px;
          position: relative;
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          z-index: 1;
          > .sort-caret {
            position: absolute;
            left: 3px;
            content: '';
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;

            &.ascend {
              border-bottom: 5px solid #97a8be;
              top: 11px;
            }
            &.descend {
              border-top: 5px solid #97a8be;
              bottom: 11px;
            }
          }
          &[orderBy=asc] {
            > .ascend { border-bottom-color: #48576a; }
          }
          &[orderBy=desc] {
            > .descend { border-top-color: #48576a; }
          }
        }
      }
    `;
  }
});
