def((InputString, OutputHTML, Item) => {

  class ListItem extends Item {

    onClick() {
      this.element.dispatchEvent(new CustomEvent('item:select', {
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

    get InputString() { return InputString; }

    selectItem(event) {
      this.value = event.detail.value;
      this.input.element.blur();
    }

    beforeParse(params) {
      this.inputHandler = debounce(this.inputHandler, 300, true);
      this.width = params.width = params.width || 300;

      this.input = new InputString(params);
      this.input.element.addEventListener('keydown', event => (event.shouldNotSubmit = true));
      this.input.element.addEventListener('focus', event => this.inputHandler(event));
      this.input.element.addEventListener('blur', event => this.blur(event));
      this.input.element.addEventListener('input', event => this.inputHandler(event));
    }

    init() {
      this.element.insertBefore(this.input.element, this.element.firstChild);
      if (this.width !== void 0) this.element.style.width = this.width;
      if (this.emptyTip) this.list.dataset.tip = this.emptyTip;
      this.element.addEventListener('item:select', this.selectItem.bind(this));
      if (!this.$hasValue) this.value = void 0;
    }

    inputHandler() {
      if (this.readonly) return;
      let { resolvedKey } = depot;
      return api([resolvedKey, this.api], { query: { q: this.value } }).then(raw => {
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

    get value() { return this.input.value; }
    set value(value = this.defaultValue) {
      if (typeof value !== 'string') value = '';
      this.$hasValue = true;
      this.$value = value;
      if (this.input) this.input.value = value;
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
          > div {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
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
              font-size: 12px;
              li {
                padding: .2em .5em;
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
