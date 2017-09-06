def((OutputHTML, Item) => {

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

  class ListItem extends Item {
    onClick() {
      this.element.dispatchEvent(new CustomEvent('select', {
        bubbles: true,
        detail: this
      }));
    }
    init() {
      new OutputHTML(this).to(this);
    }
    get template() {
      return '<li></li>';
    }
  }

  return class extends Jinkela {

    selectItem(event) {
      let list = this.value;
      let index = list.indexOf(event.detail.value);
      if (~index) list.splice(index, 1);
      this.value = list.concat(event.detail.value);
      event.stopPropagation();
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
      if (this.emptyTip) this.list.dataset.tip = this.emptyTip;
      if (this.readonly) this.element.classList.add('disabled');
      this.element.addEventListener('select', this.selectItem.bind(this));
      this.element.addEventListener('remove', this.removeItem.bind(this));
      if (!this.$hasValue) this.value = void 0;
    }

    inputHandler() {
      if (this.readonly) return;
      let { resolvedKey } = depot;
      return api([resolvedKey, this.api], { query: { q: this.input.value } }).then(raw => {
        if (!(raw instanceof Array)) throw new Error(`返回必须是数组，然而却是 ${raw}`);
        this.list.innerHTML = '';
        if (!raw.length) {
          if (this.emptyTip) {
            this.element.setAttribute('popup', '');
          } else {
            this.element.removeAttribute('popup');
          }
        } else {
          raw.forEach(item => new ListItem(item).to(this.list));
          this.element.setAttribute('popup', '');
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

    move(step) {
      if (!step) return;
      let $current = this.list.querySelector('.active');
      if ($current) {
        $current.classList.remove('active');
        if (step > 0) {
          while (step--) {
            $current = $current.nextElementSibling
              ? $current.nextElementSibling
              : this.list.firstElementChild;
          }
        } else {
          while (step++) {
            $current = $current.previousElementSibling
              ? $current.previousElementSibling
              : this.list.lastElementChild;
          }
        }
      }
      if (!$current) $current = this.list.firstElementChild;
      $current.classList.add('active');
      this.ensureVisible();
    }

    enter() {
      let active = this.list.querySelector('.active');
      if (active) active.click();
    }

    onKeydown(e) {
      switch (e.keyCode) {
        case 40: return this.move(1);
        case 38: return this.move(-1);
        case 13: return this.enter();
        case 8:
          if (e.target.value === '') this.value = this.value.slice(0, -1);
      }
    }

    blur() {
      let $current = this.list.querySelector('active');
      if ($current) $current.classList.remove('active');
      this.inputHandler.cancel();
      this.element.removeAttribute('popup');
    }

    ensureVisible() {
      let $current = this.list.querySelector('.active');
      if ($current) {
        let viewTop = this.list.scrollTop;
        let viewHeight = this.list.getBoundingClientRect().height;
        let viewBottom = viewHeight + viewTop;
        let itemTop = $current.offsetTop;
        let itemHeight = $current.getBoundingClientRect().height;
        let itemBottom = itemTop + itemHeight;
        if (itemTop < viewTop) this.list.scrollTop = itemTop;
        if (itemBottom > viewBottom) this.list.scrollTop = itemTop - viewHeight + itemHeight;
      }
    }

    // TODO: ul 弹层挂到 body 上，防止被 overflow hidden
    get template() {
      return `
        <div on-keydown="{onKeydown}">
          <ul ref="tags">
            <meta ref="inputSlot" />
          </ul>
          <div>
            <ul ref="list"></ul>
          </div>
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
          line-height: 36px;
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
          > div {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            top: 100%;
            right: -1px;
            left: -1px;
            transform: translateY(-3px);
            z-index: 99;
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
