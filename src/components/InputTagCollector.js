def((OutputHTML) => {

  const PANEL_CLASS_NAME = 'jinkela_tag_collector_' + Array.from({ length: 16 }, () => (36 * Math.random() | 0).toString(36)).join('');

  class ForestSelectedItem extends Jinkela {
    init() {
      this.element.jinkela = this;
    }
    dispatchRemoveEvent() {
      let event = new CustomEvent('remove', { bubbles: true, detail: this });
      this.element.dispatchEvent(event);
    }
    get template() {
      return `
        <span>
          <span>{text}</span>
          <svg on-click="{dispatchRemoveEvent}" viewBox="0 0 18 18">
            <path d="M 4 4 L 14 14 M 4 14 L 14 4 Z" />
          </svg>
        </span>
      `;
    }
    get styleSheet() {
      return `
        @keyframes ${PANEL_CLASS_NAME}_show {
          from { transform: scale(0.01); }
          to { transform: scale(1); }
        }
        :scope {
          box-sizing: border-box;
          border: 1px solid transparent;
          background-color: rgba(32,160,255,.1);
          border-color: rgba(32,160,255,.2);
          color: #20a0ff;
          stroke: currentColor;
          border-radius: 4px;
          padding: 5px;
          height: 24px;
          line-height: 24px;
          font-size: 12px;
          justify-content: center;
          margin: 2px 3px;
          align-items: center;
          display: inline-flex;
          -webkit-box-pack: center;
          -webkit-box-align: center;
          animation: 200ms ease ${PANEL_CLASS_NAME}_show;
          > svg {
            width: 12px;
            height: 12px;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 100%;
            margin-left: 4px;
            &:hover {
              background: currentColor;
              border-color: #fff;
              stroke: #fff;
            }
          }
        }
        .disabled :scope {
          filter: saturate(0);
          animation: unset;
          > svg { display: none; }
        }
      `;
    }
  }

  class ListItem extends Jinkela {
    click() {
      this.element.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: this }));
    }
    init() {
      new OutputHTML(this).to(this);
    }
    get template() {
      return '<li on-click="{click}"></li>';
    }
  }

  class SuggestionList extends Jinkela {
    show(anchor) {
      this.anchor = anchor;
      document.body.appendChild(this.element);
      let rect = anchor.getBoundingClientRect();
      this.element.style.width = rect.width;
      this.element.style.left = rect.left;
      this.element.style.top = rect.top + rect.height;
    }
    hide() {
      this.element.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], { duration: 300 }).addEventListener('finish', () => {
        this.element.remove();
      });
    }
    clean() {
      this.ul.innerHTML = '';
    }
    append(jinkela) {
      jinkela.to(this.ul);
    }
    move(step) {
      if (!step) return;
      let $current = this.active;
      if ($current) {
        $current.classList.remove('active');
        if (step > 0) {
          while (step--) {
            $current = $current.nextElementSibling
              ? $current.nextElementSibling
              : this.first;
          }
        } else {
          while (step++) {
            $current = $current.previousElementSibling
              ? $current.previousElementSibling
              : this.last;
          }
        }
      }
      if (!$current) $current = this.first;
      $current.classList.add('active');
      this.ensureVisible();
    }
    ensureVisible() {
      let $current = this.active;
      if ($current) {
        let viewTop = this.element.scrollTop;
        let viewHeight = this.element.getBoundingClientRect().height;
        let viewBottom = viewHeight + viewTop;
        let itemTop = $current.offsetTop;
        let itemHeight = $current.getBoundingClientRect().height;
        let itemBottom = itemTop + itemHeight;
        if (itemTop < viewTop) this.element.scrollTop = itemTop;
        if (itemBottom > viewBottom) this.element.scrollTop = itemTop - viewHeight + itemHeight;
      }
    }
    enter() {
      let active = this.active;
      if (active) active.click();
    }
    set tip(value) { this.ul.dataset.tip = value; }
    get active() { return this.element.querySelector('.active'); }
    get first() { return this.ul.firstElementChild; }
    get last() { return this.ul.lastElementChild; }
    get template() { return '<div on-select="{selectHandler}"><ul ref="ul"></ul></div>'; }
    get styleSheet() {
      return `
        :scope {
          line-height: 24px;
          box-sizing: border-box;
          position: absolute;
          transform: translateY(-3px);
          z-index: 9999;
          background: #fff;
          border: 1px solid #20a0ff;
          border-top: none;
          border-radius: 0 0 5px 5px;
          transition: border-color ease .15s, opacity .15s ease, visibility .15s ease;
          max-height: 200px;
          overflow: scroll;
          > ul {
            margin: 0;
            padding: 0;
            li {
              padding: .4em .5em;
              cursor: pointer;
              list-style: none;
              &:hover {
                background-color: rgba(25,137,250,.08);
              }
              &.active {
                background-color: rgba(25,137,250,.08);
              }
            }
            &:empty::before {
              content: attr(data-tip);
              display: block;
              opacity: .5;
              text-align: center;
              padding: .5em;
            }
          }
        }
      `;
    }
  }

  return class extends Jinkela {

    selectItem(value) {
      let list = this.value;
      let index = list.indexOf(value);
      if (~index) list.splice(index, 1);
      this.value = list.concat(value);
    }

    removeItem(event) {
      let list = this.value;
      let index = list.indexOf(event.detail.value);
      if (~index) list.splice(index, 1);
      this.value = list;
      event.stopPropagation();
    }

    beforeParse(params) {
      this.inputHandler = debounce(this.inputHandler, 300, true);
      this.width = params.width = params.width || 300;

      this.input = document.createElement('input');
      this.input.placeholder = params.placeholder || '';
      this.input.type = 'text';
      this.input.addEventListener('focus', event => this.inputHandler(event));
      this.input.addEventListener('blur', event => this.blur(event));
      this.input.addEventListener('input', event => this.inputHandler(event));
    }

    init() {
      this.inputSlot = this.input;
      if (this.width !== void 0) this.element.style.width = this.width;
      if (this.emptyTip) this.list.tip = this.emptyTip;
      if (this.readonly) this.element.classList.add('disabled');
      this.element.addEventListener('remove', this.removeItem.bind(this));
      if (!this.$hasValue) this.value = void 0;
    }

    inputHandler() {
      if (this.readonly) return;
      let { resolvedKey } = depot;
      return api([resolvedKey, this.api], { query: { q: this.input.value, value: this.value } }).then(raw => {
        if (!(raw instanceof Array)) throw new Error(`返回必须是数组，然而却是 ${raw}`);
        this.list.clean();
        if (!raw.length) {
          if (this.emptyTip) {
            this.element.setAttribute('popup', '');
            this.list.show(this.element);
          } else {
            this.element.removeAttribute('popup');
            this.list.hide();
          }
        } else {
          raw.forEach(item => this.list.append(new ListItem(item)));
          this.element.setAttribute('popup', '');
          this.list.show(this.element);
        }
      });
    }

    get value() { return this.$value || []; }
    set value(value = this.defaultValue) {
      if (!(value instanceof Array)) value = [];
      this.$hasValue = true;
      this.$value = value;
      this.update();
      if (this.input) this.input.value = '';
    }

    update() {
      let { value } = this;
      let index = 0;
      let element = this.input;
      let remove = [];
      while ((element = element.nextElementSibling)) {
        let { jinkela } = element;
        if (jinkela.value === value[index]) {
          index++;
        } else {
          remove.push(element);
        }
      }
      remove.forEach(jinkela => jinkela.remove());
      ForestSelectedItem.from(value.slice(index).map(value => ({ text: value, value }))).to(this.tags);
    }

    onKeydown(e) {
      switch (e.keyCode) {
        case 40: return this.list.move(1);
        case 38: return this.list.move(-1);
        case 13: return this.list.enter();
        case 8:
          if (e.target.value === '') this.value = this.value.slice(0, -1);
      }
    }

    blur() {
      let $current = this.list.active;
      if ($current) $current.classList.remove('active');
      this.inputHandler.cancel();
      this.element.removeAttribute('popup');
      this.list.hide();
    }

    get list() {
      let value = new SuggestionList({ selectHandler: event => this.selectItem(event.detail.value) });
      Object.defineProperty(this, 'list', { configurable: true, value });
      return value;
    }

    get template() {
      return `
        <div on-keydown="{onKeydown}">
          <ul ref="tags">
            <meta ref="inputSlot" />
          </ul>
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          position: relative;
          &:hover { border-color: #8492a6; }
          &.disabled {
            background-color: #eff2f7;
            border-color: #d3dce6;
            color: #bbb;
            cursor: not-allowed;
            > ul > input { display: none; }
          }
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          vertical-align: middle;
          box-sizing: border-box;
          width: 300px;
          min-height: 36px;
          font-size: 12px;
          line-height: 28px;
          border: 1px solid #C0CCDA;
          border-radius: 5px;
          padding: 3px;
          > ul {
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            list-style: none;
            margin: 0;
            padding: 0;
            > input {
              order: 1;
              min-width: 40px;
              resize: none;
              outline: none;
              border: 0;
              margin: 0;
              flex: 1;
              height: 24px;
              margin: 2px 3px;
            }
          }
          &[popup] {
            border-color: #20a0ff;
            > div {
              visibility: visible;
              opacity: 1;
            }
            > input {
              border-bottom: none;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
        }
      `;
    }
  };

});
