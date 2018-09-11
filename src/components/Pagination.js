def((ButtonHollow, SvgIcon, Input) => {

  class Svg1024 extends SvgIcon {
    get viewBox() { return '0 0 1024 1024'; }
    get styleSheet() {
      return `
        :scope {
          width: 14px;
          height: 14px;
          display: inline-block;
          vertical-align: middle;
        }
      `;
    }
  }

  class LeftArrowIcon extends Svg1024 { get data() { return 'M684 1008l-446-466 0 0c-12-12-12-38 0-57l446-472c12-12 38-12 51 0L786 63c12 12 12 38 0 57L416 510l370 389c12 12 12 38 0 57l-51 57C722 1027 697 1027 684 1008L684 1008 684 1008M684 1008 684 1008z'; } }
  class RightArrowIcon extends Svg1024 { get data() { return 'M339 15l446 466 0 0c12 12 12 38 0 57l-446 472c-12 12-38 12-51 0L237 960c-12-12-12-38 0-57L607 513 237 123C218 104 218 85 237 66l51-57C301-3 326-3 339 15L339 15 339 15M339 15 339 15z'; } }

  class LastPageIcon extends Svg1024 { get data() { return 'M163.7 952c-14 0-28.1-5.3-38.8-16-21.5-21.4-21.6-56.2-0.2-77.7L459.8 521.4 145.4 163.3c-20-22.8-17.8-57.6 5.1-77.6 22.8-20.1 57.6-17.8 77.6 5.1l348.3 396.7c19.1 21.7 18.1 54.6-2.3 75.1L202.7 935.8C191.9 946.6 177.8 952 163.7 952z M488.9 952c-14 0-28.1-5.3-38.8-16-21.6-21.4-21.6-56.2-0.2-77.7l335.1-336.8L470.7 163.3c-20.1-22.8-17.8-57.6 5.1-77.6 22.8-20.1 57.6-17.8 77.6 5.1l348.3 396.7c19.1 21.7 18.1 54.6-2.3 75.1L527.9 935.8C517.2 946.6 503 952 488.9 952z'; } }
  class FirstPageIcon extends Svg1024 { get data() { return 'M821.3 935.8 449.9 562.5c-20.4-20.5-21.4-53.3-2.3-75.1l348.3-396.7c20-22.8 54.8-25.1 77.6-5.1 22.8 20.1 25.1 54.8 5.1 77.6L564.2 521.4l335.1 336.8c21.4 21.5 21.3 56.3-0.2 77.7-10.7 10.7-24.7 16-38.8 16C846.2 952 832.1 946.6 821.3 935.8z M496.1 935.8 124.7 562.5c-20.4-20.5-21.4-53.3-2.3-75.1l348.3-396.7c20-22.8 54.8-25.1 77.6-5.1 22.8 20.1 25.1 54.8 5.1 77.6L238.9 521.4l335.1 336.8c21.4 21.5 21.3 56.3-0.2 77.7-10.7 10.7-24.7 16-38.8 16C521 952 506.8 946.6 496.1 935.8z'; } }
  class EllipsisIcon extends Svg1024 { get data() { return 'M110.98112 510.74048m-110.98112 0a21.676 21.676 0 1 0 221.96224 0 21.676 21.676 0 1 0-221.96224 0Z M512.93184 510.74048m-110.98112 0a21.676 21.676 0 1 0 221.96224 0 21.676 21.676 0 1 0-221.96224 0Z M914.87744 510.74048m-110.98112 0a21.676 21.676 0 1 0 221.96224 0 21.676 21.676 0 1 0-221.96224 0Z'; } }

  class PageItem extends Jinkela {
    init() {
      this.active = this.value === this.currentIndex;
    }
    click() {
      this.depot.update({ page: this.value });
    }
    get template() { return '<a href="javascript:" on-click="{click}"></a>' ; }
    set active(value) { this.element.classList[value ? 'add' : 'remove']('active'); }
    get active() { return this.element.classList.contains('active'); }
    get styleSheet() {
      return `
        :scope {
          line-height: 28px;
          vertical-align: middle;
          display: inline-block;
          margin: 0 .5em;
          cursor: pointer;
          fill: #97a8be;
          color: #97a8be;
          cursor: pointer;
          &.active {
            cursor: default;
            fill: #eee;
            color: #eee;
          }
        }
      `;
    }
  }

  class Ellipsis extends PageItem {
    init() {
      new EllipsisIcon().to(this);
      new this.Background().to(this);
    }
    get styleSheet() {
      return `
        :scope {
          svg:last-child { display: none; }
          &:hover {
            svg:first-child { display: none; }
            svg:last-child { display: inline-block; }
          }
        }
      `;
    }
  }

  class FirstPage extends Ellipsis { get Background() { return FirstPageIcon; } }

  class LastPage extends Ellipsis { get Background() { return LastPageIcon; } }

  class PrevPage extends PageItem { init() { new LeftArrowIcon().to(this); } }

  class NextPage extends PageItem { init() { new RightArrowIcon().to(this); } }

  class NthPage extends PageItem {
    init() { this.element.textContent = this.value; }
    get styleSheet() {
      return `
        :scope {
          text-align: center;
          min-width: 22px;
          height: 22px;
          line-height: 22px;
          border-radius: 2px;
          margin: 0;
          padding: 0 8px;
          box-sizing: border-box;
          color: #48576a;
          font-size: 12px;
          &.active {
            color: #fff;
            background: #20a0ff;
          }
        }
      `;
    }
  }

  class Select extends Input {
    get component() { return 'Select'; }
    beforeParse({ depot }) {
      let { pageSize } = depot.scheme;
      if (pageSize instanceof Array) {
        this.value = depot.pageSize;
        this.args = {
          options: pageSize.map(value => ({ text: `每页 ${value} 条`, value }))
        };
        this.element.style.display = 'inline-block';
      }
    }
    get styleSheet() {
      return `
        :scope {
          display: none;
          select {
            min-width: auto;
          }
        }
      `;
    }
    init() {
      this.element.addEventListener('change', () => {
        this.depot.update({ pageSize: this.value });
      });
    }
  }

  class Count extends Jinkela {
    get template() {
      return `
        <span if="{count}">
          共 <span>{count}</span> 条
        </span>
      `;
    }
    get styleSheet() {
      return `
        :scope {
          margin-right: 8px;
        }
      `;
    }
  }

  return class extends Jinkela {
    get template() {
      return `
        <div if="{visible}"></div>
      `;
    }
    init() {
      let { list, count, depot } = this;
      let { pageSize, scheme } = depot;
      let { countable } = scheme;
      count *= 1;
      new Count({ count, depot }).to(this);
      new Select({ depot }).to(this);
      let near = countable || 3;
      if (!(list instanceof Array)) list = [];
      let currentIndex = depot.page || 1;
      let items = [];
      const { max, min, ceil } = Math;
      let pageCount = count === count ? ceil(count / pageSize) : currentIndex + (list.length === pageSize);
      if (pageCount < 1) pageCount = 1;
      if (currentIndex > pageCount) depot.update({ page: pageCount });
      let [ first, last ] = [ 1, pageCount ];
      let [ from, to ] = [ max(currentIndex - near, first + 1), min(currentIndex + near, last - 1) ];
      let [ ellipsisLeft, ellipsisRight ] = [ from - first > 1, last - to > 1 ];
      if (ellipsisLeft) from++;
      if (ellipsisRight) to--;
      items.push(new PrevPage({ depot, value: max(first, currentIndex - 1), currentIndex }));
      items.push(new NthPage({ depot, value: 1, currentIndex }));
      if (ellipsisLeft) items.push(new FirstPage({ depot, value: first, currentIndex }));
      for (let index = from; index <= to; index++) items.push(new NthPage({ depot, value: index, currentIndex }));
      if (ellipsisRight) items.push(new LastPage({ depot, value: pageCount, currentIndex }));
      if (first !== last) items.push(new NthPage({ depot, value: pageCount, currentIndex }));
      items.push(new NextPage({ depot, value: min(currentIndex + 1, last), currentIndex }));
      items.forEach(item => item.to(this));
      this.visible = pageSize;
    }
    get pageSize() { return this.depot.scheme.pageSize; }
    get styleSheet() {
      return `
        :scope {
          text-align: right;
          margin: 1em;
        }
      `;
    }
  };

});
